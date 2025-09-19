interface WordPressPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

interface Params {
  params: { slug: string };
}

export default async function WordPressPageBySlug({ params }: Params) {
  const { slug } = params;
  let page: WordPressPage | null = null;

  try {
    const res = await fetch(
      "https://mydemopage.wpenginepowered.com/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetPageBySlug($slug: ID!) {
              page(id: $slug, idType: SLUG) {
                id
                slug
                title
                content
              }
            }
          `,
          variables: { slug },
        }),
      }
    );

    const json = await res.json();
    page = json.data.page;
  } catch (err) {
    console.error("Error fetching page:", err);
  }

  if (!page) return <p>Page not found</p>;

  return (
    <div>
      <h1 style={{ display: "none" }}>{page.title}</h1> {/* SEO ke liye */}
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
