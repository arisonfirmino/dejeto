export const formatlink = (url: string | null) => {
  if (!url) return "Link inválido";

  try {
    const path = new URL(url).pathname.replace(/^\/+/, "");

    if (new URL(url).hostname.includes("github.com")) {
      return `github/${path}`;
    }

    if (new URL(url).hostname.includes("linkedin.com")) {
      return path;
    }

    return path || new URL(url).hostname;
  } catch {
    return "Link inválido";
  }
};
