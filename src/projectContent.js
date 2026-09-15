// Keep existing paragraph/media sections working while allowing ordered groups.
export function getStoryBlocks(content) {
  if (content == null) return [];
  if (typeof content === 'string') return [{ paragraphs: [content] }];
  if (Array.isArray(content)) return content.flatMap(getStoryBlocks);
  if (content.content !== undefined) return getStoryBlocks(content.content);
  return [content];
}
