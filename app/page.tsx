// app/page.tsx (Next.js 13+)
import Head from "next/head";
import NavBar from "@/components/NavBar";
import ElementorWrapper from "@/components/ElementorWrapper";
import { WordPressPage } from "@/types";

export default async function Home() {
  let homePageHTML = "";
  let pages: WordPressPage[] = [];
  let error: string | null = null;

  try {
    // STEP 1 — Fetch Home Page GraphQL Data
    const graphqlRes = await fetch(
      "https://mydemopage.wpenginepowered.com/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetHomePage {
              pageBy(uri: "home") {
                id
                databaseId
                slug
              }
              pages {
                nodes {
                  id
                  databaseId
                  slug
                  title
                }
              }
            }
          `,
        }),
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!graphqlRes.ok) throw new Error("Failed to fetch WordPress pages");

    const json = await graphqlRes.json();
    const homePage = json.data?.pageBy;
    pages = json.data?.pages?.nodes || [];

    if (homePage) {
      // STEP 2 — Fetch Rendered HTML of the Home Page
      const pageUrl = `https://mydemopage.wpenginepowered.com/${homePage.slug}`;
      const htmlRes = await fetch(pageUrl);
      homePageHTML = await htmlRes.text();
    }
  } catch (err) {
    console.error("Error fetching Elementor page:", err);
    error = "Failed to load home page. Please try again later.";
  }

  return (
    <div>
      {/*<NavBar pages={pages} />*/}

      <Head>
        {/* This will load all Elementor styles + scripts automatically */}
      </Head>

      <ElementorWrapper>
        {error ? (
          <div className="error">{error}</div>
        ) : !homePageHTML ? (
          <div className="loading">Loading home page...</div>
        ) : (
          <section className="page-section">
  {/* Inject full Elementor HTML */}
  <div
    className="elementor"
    dangerouslySetInnerHTML={{ __html: homePageHTML }}
  />
</section>

        )}
      </ElementorWrapper>
    </div>
  );
}


