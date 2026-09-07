// Set SITE_URL to the confirmed HTTPS production origin before building for release.
// Missing configuration keeps local/preview builds non-indexable without inventing a domain.
export function getSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL?.trim();
  if (!value) return undefined;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("SITE_URL must be a valid absolute HTTPS production origin.");
  }

  if (
    url.protocol !== "https:" ||
    url.username || url.password || url.search || url.hash ||
    url.pathname !== "/" ||
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  ) {
    throw new Error("SITE_URL must be an HTTPS production origin without credentials, a path, query, or fragment.");
  }
  return url;
}
