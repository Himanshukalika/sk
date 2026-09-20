/**
 * Parses various formats of YouTube URLs (watch, youtu.be, shorts, embed)
 * and returns a standard responsive embed URL.
 */
export function getYouTubeEmbedUrl(url: string, autoPlay = true): string {
  if (!url || typeof url !== 'string') return '';
  
  const trimmed = url.trim();
  
  // Regular expressions to match YouTube video IDs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1`;
  }

  // If already an embed URL
  if (trimmed.includes('youtube.com/embed/')) {
    return autoPlay && !trimmed.includes('autoplay')
      ? `${trimmed}${trimmed.includes('?') ? '&' : '?'}autoplay=1`
      : trimmed;
  }

  return trimmed;
}

/**
 * Extracts YouTube Video ID for thumbnail generation
 */
export function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return null;
}
