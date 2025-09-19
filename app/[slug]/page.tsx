// app/[slug]/page.tsx
import { Metadata } from "next";

interface WordPressPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

interface PageProps {
  params: { slug: string };
}

// (Optional SEO metadata)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  return {
    title: `${slug} | My Site`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  let page: WordPressPage | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.WP_API_URL || "https://mydemopage.wpenginepowered.com/wp-json/wp/v2"}/pages?slug=${slug}`,
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
      error = `Failed to fetch page: ${res.status} ${res.statusText}`;
      console.error(error);
    } else {
      const data: unknown = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        page = data[0] as WordPressPage;
      } else {
        error = `Page with slug "${slug}" not found`;
        console.error(error);
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = `Error fetching page: ${err.message}`;
      console.error(error, err);
    } else {
      error = "Unknown error occurred";
      console.error(error);
    }
  }

  if (error || !page) {
    return (
      <div className="font-sans flex items-center justify-center min-h-screen p-8">
        <p>{error || "Page not found."}</p>
      </div>
    );
  }

  return (
    <div className="font-sans container mx-auto min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">{page.title.rendered}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </div>
  );
}
