# Brad McKellar — Mechanical Engineering Portfolio

A React + Vite portfolio in cream, brown, white, and beige. Surfaces use solid colors without wood grain or textures. The home page introduces Brad and links to four dedicated project stories:

- `/projects/baloo/`
- `/projects/capsule/`
- `/projects/tesla-turbine/`
- `/projects/mechatronics/`

Each project has its own URL, images, chapter navigation, and a next-project link. Baloo and Tesla Turbine also include playable demonstrations. Videos load when requested and do not autoplay.

## Run

```sh
npm install
npm run dev
```

Open the URL Vite prints. To build and preview:

```sh
npm run build
npm run preview
```

The build automatically creates a real `index.html` for each project directory, so direct links and refreshes work on a static host that serves directory index files. Upload the contents of `dist/` to the root of your static site. No backend or SPA rewrite rule is required for the project URLs.

## Edit the content

All text and project definitions live in `src/content.js`.

- `profile.name`, `role`, and `introduction`: your home page text.
- `profile.aboutTitle`: the large About heading.
- `profile.about`: the separate personal statement below that heading. Newlines are preserved.
- `profile.aboutDraft`: your unfinished personal statement, preserved for you to complete. This field is not displayed.
- `profile.photo` / `photoAlt`: the profile portrait and its description.
- `profile.email` / `phone` / `links`: email, a clickable phone number, and optional professional links. A placeholder appears when all contact details are empty.
- Project `summary` / `image` / `imageAlt`: homepage tile content.
- `imagePosition` / `imageFit`: optional thumbnail framing controls.
- `photoSize`, `imageSize`, and image media `size`: original `[width, height]` in pixels; these reserve image space while loading.
- `lead` / `topics`: the project introduction and topic labels.
- `overview`: a string, a list of paragraph strings, or an ordered list of paragraph/media groups.
- `sections`: the story chapters. Each has a unique lowercase, hyphenated `id`, a `title`, and a `content` list. Reserve `overview` for the built-in overview panel.

The initial project stories describe what the supplied media shows. Add your specific goals, individual role, design decisions, and measured results as you develop each story.

Use separate objects in a chapter's `content` list to alternate paragraphs and media. Each string in `paragraphs` becomes its own paragraph, and groups appear in the order you write them:

```js
{
  id: 'testing',
  title: 'Testing the assembly',
  content: [
    { paragraphs: ['Why I ran this test.', 'How I set it up.'] },
    { media: [{
      type: 'image',
      src: '/media/your-photo.webp',
      size: [1800, 1350], // Replace with the image's actual dimensions.
      alt: 'A description of the photo',
      caption: 'What this stage shows.',
    }] },
    { paragraphs: ['What I learned from the results.'] },
  ],
}
```

Repeat paragraph or media groups as often as needed. Do not repeat a `paragraphs` property inside the same object: JavaScript retains only its last value. The Capsule chapter is a working example of text before and after an image.

The phrases `in vitro` and `in vivo` are automatically italicized in project paragraphs. Capitalization stays as written; use lowercase within a sentence.

Existing sections with `paragraphs` and `media` directly on the section still work, displaying text followed by media. When a `content` list is present, it defines the entire section body. For a text-only overview, use `overview: ['First paragraph.', 'Second paragraph.']`.

For a video, use `type: 'video'`, an MP4 `src`, a `poster` image, and a `caption`. Set `portrait: true` for vertical footage. Still images can be opened at full size using the image link. Use `fit: 'contain'` for diagrams.

To add a project, copy an entry and give it a unique lowercase, hyphenated `id`. The homepage and static project entry pages are generated from that list.

## Photos and videos

Your originals remain unchanged in `src/photos/`. The site uses optimized copies in `public/media/`:

- HEIC/PNG photos converted to WebP, with orientation preserved.
- MOV videos converted to H.264/AAC MP4, including HDR-to-SDR conversion where needed.
- Still frames extracted for video posters and project tiles.

The `unused` folder is not included in the website. `src/photos/misc/Profile_pic_v2.png` supplies the introduction portrait, using an optimized copy at `public/media/profile-picture-v2.webp`.

To regenerate missing web copies after adding media to the conversion map in `tools/prepare-media.py`:

```sh
python -m pip install --target .dist/media-tools pillow-heif imageio-ffmpeg
python tools/prepare-media.py
```

These Python tools are only needed for media preparation, not to run or build the site. The converter preserves originals and refreshes web copies when their source files are newer. To force a refresh after editing selected media, use their names from the conversion map:

```sh
python tools/prepare-media.py --only capsule-deployed-v2 turbine-glamour turbine-idling --force
```

Update the dimensions in `src/content.js` if an image's crop or size changes. The turbine glamour photo is used for both its project card and page cover; its idling video appears in the bench section. The edited Capsule close-up uses `capsule-deployed-v2.webp` so browsers load the new version.

## Structure

- `src/content.js`: profile, media references, and project stories.
- `src/main.jsx`: homepage and project page components.
- `src/projectContent.js`: ordered story content and support for the original section format.
- `src/styles.css`: palette, typography, and responsive layouts.
- `src/useMotion.js`: scroll reveals, reduced-motion preferences, and direct chapter links.
- `tools/prepare-media.py`: optional media conversion.
- `tools/build-project-pages.mjs`: static project entry pages, run after the Vite build.
- `public/media/`: browser-ready assets included in the build.

Change the variables at the top of `src/styles.css` to adjust the color scheme.

Run `node --test tools/project-content.test.mjs` to check content compatibility and chapter anchors.

The layout combines a portrait, biography, contact details, and an Explore projects link in one white introduction panel. Rounded project cards, sans-serif headings, and compact navigation give the site a modern format. Project pages use separate chapter panels and a sticky contents menu on desktop. Entry animations, scroll reveals, and hover effects respect the system's reduced-motion setting. Cross-page fades enhance navigation in browsers that support CSS view transitions; ordinary links work everywhere.
