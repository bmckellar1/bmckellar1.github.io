"""Create browser-ready copies of selected project media; preserve all originals.

Install conversion tools locally with:
  python -m pip install --target .dist/media-tools pillow-heif imageio-ffmpeg
Then run:
  python tools/prepare-media.py
"""
from pathlib import Path
import argparse
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.dist' / 'media-tools'))
from PIL import Image, ImageOps, ImageDraw
from pillow_heif import register_heif_opener
import imageio_ffmpeg

register_heif_opener()
SOURCE = ROOT / 'src' / 'photos'
OUTPUT = ROOT / 'public' / 'media'
PREVIEW = ROOT / '.dist' / 'media-preview'
OUTPUT.mkdir(parents=True, exist_ok=True)
PREVIEW.mkdir(parents=True, exist_ok=True)
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

PHOTOS = {
    'profile-picture-v2': 'misc/Profile_pic_v2.png',
    'capsule-deployed-v2': 'Capsule/capsule_deployed.HEIC',
    'capsule-packaged': 'Capsule/capsule_packaged.png',
    'capsule-diagram': 'Capsule/capsule_use_diagram.png',
    'turbine-glamour': 'Tesla_turbine/ChatGPT Image Sep 14, 2026, 10_14_02 PM.png',
    'mechatronics-robot': 'mechatronics/Mechatronics_robot.HEIC',
    'mechatronics-pcb': 'mechatronics/Mechatronics_custom_pcb.HEIC',
}
VIDEOS = {
    'baloo-lifting': 'Baloo/Baloo_Lifting.MOV',
    'turbine-machining': 'Tesla_turbine/Tesla_Turbine_4_axis.MOV',
    'turbine-demo': 'Tesla_turbine/Tesla_Turbine_demo.MOV',
    'turbine-idling': 'Tesla_turbine/Tesla_turbine_idleing.MOV',
}

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--only', nargs='+', choices=[*PHOTOS, *VIDEOS], help='Process only these named assets.')
parser.add_argument('--force', action='store_true', help='Regenerate selected assets even when web copies exist.')
options = parser.parse_args()
if options.only:
    PHOTOS = {name: path for name, path in PHOTOS.items() if name in options.only}
    VIDEOS = {name: path for name, path in VIDEOS.items() if name in options.only}

def needs_update(source, destination):
    return options.force or not destination.exists() or source.stat().st_mtime > destination.stat().st_mtime

def run(args):
    result = subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', *args], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)

def web_image(source, dest, size=1800):
    with Image.open(source) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        photo.thumbnail((size, size), Image.Resampling.LANCZOS)
        photo.save(dest, 'WEBP', quality=88, method=6)

contact = []
metadata = {}
for name, path in PHOTOS.items():
    destination = OUTPUT / f'{name}.webp'
    if needs_update(SOURCE / path, destination):
        web_image(SOURCE / path, destination)
    contact.append((name, destination))
    with Image.open(destination) as photo:
        metadata[name] = {'size': photo.size, 'bytes': destination.stat().st_size}
    print(f'Photo ready: {name}', flush=True)

for name, path in VIDEOS.items():
    source = SOURCE / path
    probe = subprocess.run([FFMPEG, '-hide_banner', '-i', str(source)], capture_output=True, text=True).stderr
    (PREVIEW / f'{name}-metadata.txt').write_text(probe, encoding='utf-8')
    match = re.search(r'Duration: (\d+):(\d+):([\d.]+)', probe)
    duration = int(match[1]) * 3600 + int(match[2]) * 60 + float(match[3]) if match else 5
    metadata[name] = {'duration': duration, 'originalBytes': source.stat().st_size}
    tone = 'zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,' if 'bt2020' in probe else ''
    scale = "scale=w='min(1280,iw)':h='min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2"
    for index, position in enumerate([min(1, duration / 4), duration * .5, duration * .8]):
        still = PREVIEW / f'{name}-{index}.jpg'
        run(['-ss', str(position), '-i', str(source), '-frames:v', '1', '-vf', tone + scale, '-q:v', '2', str(still)])
        contact.append((f'{name} / {position:.1f}s', still))
        if index == 1:
            web_image(still, OUTPUT / f'{name}.webp', 1280)
    destination = OUTPUT / f'{name}.mp4'
    if needs_update(source, destination):
        run(['-i', str(source), '-map', '0:v:0', '-map', '0:a?', '-vf', tone + scale,
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '25', '-pix_fmt', 'yuv420p',
             '-r', '30', '-threads', '2', '-c:a', 'aac', '-b:a', '128k', '-map_metadata', '-1', '-movflags', '+faststart', str(destination)])
    metadata[name]['webBytes'] = destination.stat().st_size
    print(f'Video ready: {name} ({duration:.1f}s)', flush=True)

columns, cell_w, cell_h = 3, 480, 390
sheet = Image.new('RGB', (columns * cell_w, ((len(contact) + columns - 1) // columns) * cell_h), '#f5f2ea')
draw = ImageDraw.Draw(sheet)
for index, (label, file) in enumerate(contact):
    x, y = (index % columns) * cell_w, (index // columns) * cell_h
    with Image.open(file) as im:
        im = ImageOps.contain(im.convert('RGB'), (cell_w - 24, cell_h - 48))
        sheet.paste(im, (x + (cell_w - im.width) // 2, y + 30 + (cell_h - 48 - im.height) // 2))
    draw.text((x + 12, y + 10), label, fill='#30291f')
sheet.save(PREVIEW / 'contact-sheet.jpg', quality=90)
(PREVIEW / 'metadata.json').write_text(json.dumps(metadata, indent=2), encoding='utf-8')
print('Contact sheet and media metadata saved to .dist/media-preview/', flush=True)
