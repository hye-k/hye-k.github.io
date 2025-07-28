export function generateOGImageUrl(postId?: string): string {
  // Use generated static images with full URL for GitHub Pages
  const baseUrl = 'https://hye-k.github.io';
  
  if (postId) {
    return `${baseUrl}/og-images/${postId}.png`;
  }
  return `${baseUrl}/og-images/default.png`;
}

export function getPostOGImage(postId: string): string {
  return generateOGImageUrl(postId);
}

export function getDefaultOGImage(): string {
  return generateOGImageUrl();
}
