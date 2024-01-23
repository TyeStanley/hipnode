"use server";

export const fetchMetadataServer = async (url: string) => {
  try {
    const response = await fetch(url);

    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType || !contentType.includes("text/html")) {
      console.error("Response is not a valid HTML document.");
      return null;
    }

    const html = await response.text();

    const extractMetaContent = (name: string) => {
      const match = html.match(
        new RegExp(
          `<meta[^>]*property=["']?${name}["']?[^>]*content=["']?([^"'>]+)["']?[^>]*>`
        )
      );
      return match ? match[1] : "";
    };

    const title = extractMetaContent("og:title");
    const image = extractMetaContent("og:image");
    const description = extractMetaContent("og:description");

    return { title, image, description };
  } catch (error) {
    console.error("Error fetching URL:", error);
    return null;
  }
};
