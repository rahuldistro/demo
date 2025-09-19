// app/page.tsx
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
    const res = await fetch(
      `${process.env.WP_API_URL || "https://mydemopage.wpenginepowered.com/wp-json/wp/v2"}/pages`,
      {
        cache: "no-store",
        headers:
          process.env.WP_API_USERNAME && process.env.WP_API_PASSWORD
            ? {
                Authorization: `Basic ${Buffer.from(
                  `${process.env.WP_API_USERNAME}:${process.env.WP_API_PASSWORD}`
                ).toString("base64")}`,
              }
            : {},
      }
    );

    if (!res.ok) {
      error = `Failed to fetch pages: ${res.status} ${res.statusText}`;
      console.error(error);
    } else {
      const data: unknown = await res.json();

      if (Array.isArray(data)) {
        pages = data as WordPressPage[];
      } else {
        error = "Invalid API response: Expected an array of pages";
        console.error(error, data);
      }
    }
  } catch (err: any) {
    error = `Error fetching pages: ${err.message}`;
    console.error(error, err);
  }

  return (
    <div className="font-sans container mx-auto min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">WordPress Pages</h1>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : pages.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {pages.map((page) => (
            <li key={page.id}>
              <Link
                href={`/${page.slug}`}
                className="text-blue-600 hover:underline"
              >
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
