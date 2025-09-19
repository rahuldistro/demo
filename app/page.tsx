// app/page.tsx
import Image from "next/image";
import Link from "next/link";

interface WordPressPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

export default async function Home() {
  let pages: WordPressPage[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.WP_API_URL || "https://mydemopage.wpenginepowered.com/wp-json/wp/v2"}/pages`, {
      cache: "no-store",
      headers: process.env.WP_API_USERNAME && process.env.WP_API_PASSWORD
        ? {
            Authorization: `Basic ${Buffer.from(`${process.env.WP_API_USERNAME}:${process.env.WP_API_PASSWORD}`).toString("base64")}`,
          }
        : {},
    });

    if (!res.ok) {
      error = `Failed to fetch pages: ${res.status} ${res.statusText}`;
      console.error(error);
    } else {
      pages = await res.json();
      // Validate that pages is an array
      if (!Array.isArray(pages)) {
        error = "Invalid API response: Expected an array of pages";
        console.error(error, pages);
      }
    }
  } catch (err) {
    error = `Error fetching pages: ${err.message}`;
    console.error(error, err);
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>WordPress Pages</h1>
      {error ? (
        <p>{error}</p>
      ) : pages.length > 0 ? (
        <ul>
          {pages.map((page: WordPressPage) => (
            <li key={page.id}>
              <Link href={`/${page.slug}`} className="text-blue-600 hover:underline">
                {page.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages found. Check WordPress API or deployment.</p>
      )}
    </div>
  );
}