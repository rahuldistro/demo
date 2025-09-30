// app/[slug]/page.tsx
import sanitizeHtml from "sanitize-html";

export const revalidate = 3600;

interface WordPressPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

export default async function Page({ params }: { params: { slug: string } }) {
  let page: WordPressPage | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(
      "https://mydemopage.wpenginepowered.com/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetPage($slug: String!) {
              pageBy(uri: $slug) {
                id
                slug
                title
                content
              }
            }
          `,
          variables: { slug: params.slug },
        }),
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch page");
    const json = await res.json();
    page = json.data?.pageBy || null;
  } catch (err) {
    console.error("Error fetching page:", err);
    error = "Failed to load page. Please try again later.";
  }

  return (
    <>
      {error ? (
        <div className="error">{error}</div>
      ) : !page ? (
        <div className="error">Page not found.</div>
      ) : (
        <div className="elementor-wrapper">
          <h1 className="elementor-heading-title elementor-size-default">{page.title}</h1>
          <div
            className="elementor"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(page.content || "No content available", {
                allowedTags: [
                  "div","p","h1","h2","h3","h4","h5","h6",
                  "a","img","ul","li","span","button","section",
                  "article","aside","header","footer","nav","figure",
                  "figcaption","main"
                ],
                allowedAttributes: {
                  "*": ["class","style","id","data-*"],
                  a: ["href","target","rel"],
                  img: ["src","alt","width","height","srcset","sizes","loading"],
                  button: ["type","onclick"]
                },
                allowedClasses: {
                  "*": [
                    /^elementor.*/, /^wp-.*/, /^align-.*/, /^has-.*/,
                    /^is-.*/, /^menu-.*/, /^fa-.*/, /^button-.*/,
                    /^container.*/, /^row.*/, /^col-.*/
                  ]
                },
                transformTags: {
                  img: (tagName, attribs) => ({
                    tagName,
                    attribs: {
                      ...attribs,
                      src: attribs.src?.startsWith("http")
                        ? attribs.src
                        : `https://mydemopage.wpenginepowered.com${attribs.src}`,
                      srcset: attribs.srcset
                        ? attribs.srcset.replace(
                            /https:\/\/mydemopage\.wpenginepowered\.com/g,
                            ""
                          )
                        : undefined,
                    },
                  }),
                  a: (tagName, attribs) => ({
                    tagName,
                    attribs: {
                      ...attribs,
                      href: attribs.href?.startsWith("http")
                        ? attribs.href
                        : `https://mydemopage.wpenginepowered.com${attribs.href}`,
                    },
                  }),
                },
              }),
            }}
          />
        </div>
      )}
    </>
  );
}
