// app/page.tsx or pages/index.tsx
import ElementorWrapper from "@/components/ElementorWrapper";

interface WordPressPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

export default async function Home() {
  let pages: WordPressPage[] = [];

  try {
    const res = await fetch(
      "https://mydemopage.wpenginepowered.com/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetPages {
              pages {
                nodes {
                  id
                  slug
                  title
                  content
                }
              }
            }
          `,
        }),
      }
    );

    const json = await res.json();
    pages = json.data.pages.nodes;
  } catch (err) {
    console.error("Error fetching pages:", err);
  }

  return (
    <ElementorWrapper>
      {pages.map((page) => (
        <div
          key={page.id}
          className="elementor"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ))}
    </ElementorWrapper>
  );
}
