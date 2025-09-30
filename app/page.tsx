import Head from "next/head";
import NavBar from "@/components/NavBar";
import ElementorWrapper from "@/components/ElementorWrapper";
import { WordPressPage } from "@/types";
import sanitizeHtml from "sanitize-html";

export default async function Home() {
  let homePage: WordPressPage | null = null;
  let pages: WordPressPage[] = [];
  let elementorAssets: { css: string[]; js: string[] } = { css: [], js: [] };
  let error: string | null = null;

  try {
    // Step 1 — Get Home page + all pages
    const res = await fetch(
      "https://mydemopage.wpenginepowered.com/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetHomePage {
              pageBy(uri: "home") {
                id
                slug
                title
                content
              }
              pages {
                nodes {
                  id
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

    if (!res.ok) throw new Error("Failed to fetch pages");

    const json = await res.json();
    homePage = json.data?.pageBy || null;
    pages = json.data?.pages?.nodes || [];

    if (homePage) {
      // Step 2 — Get Elementor page-specific CSS + JS
      const assetsRes = await fetch(
        `https://mydemopage.wpenginepowered.com/wp-json/elementor/v1/assets/${homePage.id}`
      );

      if (assetsRes.ok) {
        elementorAssets = await assetsRes.json();
      }
    }
  } catch (err) {
    console.error("Error fetching pages:", err);
    error = "Failed to load home page. Please try again later.";
  }

  return (
    <div>
      <NavBar pages={pages} />

      <Head>
        {/* Elementor core CSS */}
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/frontend.min.css"
        />

        {/* Elementor page-specific CSS */}
        {elementorAssets.css?.map((href, i) => (
          <link key={i} rel="stylesheet" href={href} />
        ))}

        {/* Elementor page-specific JS */}
        {elementorAssets.js?.map((src, i) => (
          <script key={i} src={src} defer></script>
        ))}
      </Head>

      <ElementorWrapper>
        {error ? (
          <div className="error">{error}</div>
        ) : !homePage ? (
          <div className="loading">Loading home page...</div>
        ) : (
          <section className="page-section">
            <h1>{homePage.title}</h1>
            <div
              className="elementor"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(homePage.content || "No content available", {
                  allowedTags: false,
                  allowedAttributes: false,
                }),
              }}
            />
          </section>
        )}
      </ElementorWrapper>
    </div>
  );
}
