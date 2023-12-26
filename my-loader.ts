export default function loader({ src, width, quality }) {
    const defaultLoader = `/_next/image/?url=${encodeURIComponent(src)}&w=${Math.min(width, 1080)}&q=${quality || 75}`;
  
    return defaultLoader;
  }