// app/[slug]/page.tsx
import Image from "next/image";

interface WordPressPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let page: WordPressPage | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.WP_API_URL || "https://mydemopage.wpenginepowered.com/wp-json/wp/v2"}/pages?slug=${slug}`, {
      cache: "no-store",
      headers: process.env.WP_API_USERNAME && process.env.WP_API_PASSWORD
        ? {
            Authorization: `Basic ${Buffer.from(`${process.env.WP_API_USERNAME}:${process.env.WP_API_PASSWORD}`).toString("base64")}`,
          }
        : {},
    });

    if (!res.ok) {
      error = `Failed to fetch page: ${res.status} ${res.statusText}`;
      console.error(error);
    } else {
      const data = await res.json();
      page = data[0] || null;
      if (!page) {
        error = `Page with slug "${slug}" not found`;
        console.error(error);
      }
    }
  } catch (err) {
    // Type-check the error
    error = err instanceof Error ? `Error fetching page: ${err.message}` : `Error fetching page: Unknown error`;
    console.error(error, err);
  }

  if (error || !page) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p>{error || "Page not found."}</p>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}