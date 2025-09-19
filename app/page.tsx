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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">WordPress Pages</h1>
      <ul className="list-disc pl-5 space-y-2">
        {pages.map((page) => (
          <li key={page.id}>
            <h2 className="text-xl font-semibold">{page.title}</h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
