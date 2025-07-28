export function generateOGImageUrl(postId?: string): string {
  // Use generated static images
  if (postId) {
    return `/og-images/${postId}.png`;
  }
  return '/og-images/default.png';
}

export function getPostOGImage(postId: string): string {
  return generateOGImageUrl(postId);
}

export function getDefaultOGImage(): string {
  return generateOGImageUrl();
}
