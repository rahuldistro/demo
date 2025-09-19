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
        cache: "no-store", // ✅ ye line important hai
      }
    );

    const json = await res.json();
    pages = json.data.pages.nodes;
  } catch (err) {
    console.error("Error fetching pages:", err);
  }

  return (
    <div>
      {pages.map((page) => (
        <div key={page.id}>
          <h2 style={{ display: "none" }}>{page.title}</h2> {/* SEO ke liye */}
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      ))}
    </div>
  );
}
