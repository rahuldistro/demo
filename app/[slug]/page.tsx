interface WordPressPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

// params.slug comes from URL
export default async function WordPressPageBySlug({ params }: { params: { slug: string } }) {
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
              page(id: $slug, idType: URI) {
                id
                slug
                title
                content
              }
            }
          `,
          variables: {
            slug: params.slug
          },
        }),
      }
    );

    const json = await res.json();
    page = json.data.page;
  } catch (err) {
    console.error("Error fetching page:", err);
  }

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
