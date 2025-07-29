/**
 * Convert a tag name to a URL-safe slug
 * "Lesson Learned" -> "lesson-learned"
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convert a slug back to the original tag name
 * This requires checking against all available tags
 */
export function slugToTag(slug: string, allTags: string[]): string | null {
  return allTags.find(tag => tagToSlug(tag) === slug) || null;
}

/**
 * Create a mapping of slugs to original tag names
 */
export function createTagSlugMap(tags: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  tags.forEach(tag => {
    map[tagToSlug(tag)] = tag;
  });
  return map;
}