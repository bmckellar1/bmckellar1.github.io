import assert from 'node:assert/strict';
import test from 'node:test';
import { getStoryBlocks } from '../src/projectContent.js';
import { projects } from '../src/content.js';

test('repeated paragraph groups retain their order around media', () => {
  const chapter = { content: [
    { paragraphs: ['Background.', 'The design question.'] },
    { media: [{ type: 'image', src: '/diagram.webp' }] },
    { paragraphs: ['How it works.', 'Results.'] },
  ] };
  const [before, illustration, after] = getStoryBlocks(chapter);
  assert.deepEqual(before.paragraphs, ['Background.', 'The design question.']);
  assert.equal(illustration.media[0].src, '/diagram.webp');
  assert.deepEqual(after.paragraphs, ['How it works.', 'Results.']);
});

test('overview supports one paragraph, multiple paragraphs, and ordered media', () => {
  assert.deepEqual(getStoryBlocks('Introduction.'), [{ paragraphs: ['Introduction.'] }]);
  const image = { media: [{ type: 'image', src: '/example.webp' }] };
  assert.deepEqual(getStoryBlocks(['First.', image, 'Last.']), [
    { paragraphs: ['First.'] }, image, { paragraphs: ['Last.'] },
  ]);
});

test('existing sections and media-only content keep working', () => {
  const legacy = { paragraphs: ['Existing text.'], media: [{ type: 'video', src: '/example.mp4' }] };
  assert.deepEqual(getStoryBlocks(legacy), [legacy]);
  assert.deepEqual(getStoryBlocks({ content: [{ media: legacy.media }] }), [{ media: legacy.media }]);
  assert.deepEqual(getStoryBlocks({ content: [] }), []);
  assert.deepEqual(getStoryBlocks(undefined), []);
});

test('chapter anchors are unique, valid, and do not collide with overview', () => {
  for (const project of projects) {
    const ids = ['overview', ...project.sections.map(section => section.id)];
    assert.equal(new Set(ids).size, ids.length, `${project.title} has unique anchors`);
    for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
  }
});
