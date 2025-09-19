"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

interface WordPressPage {
  id: number;
  slug: string;
  title: string;
}

interface ElementorPage {
  id: number;
  title: string;
  content: string;
  css?: string[];
  js?: string[];
}

export default function Home() {
  const [pages, setPages] = useState<ElementorPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        // 1️⃣ Fetch page list from GraphQL
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
                    }
                  }
                }
              `,
            }),
            cache: "no-store",
          }
        );

        const json = await res.json();
        const pageList: WordPressPage[] = json.data.pages.nodes;

        // 2️⃣ Fetch Elementor JSON content for each page
        const pageData: ElementorPage[] = await Promise.all(
          pageList.map(async (page) => {
            const elRes = await fetch(
              `https://mydemopage.wpenginepowered.com/wp-json/elementor/v1/pages/${page.id}`
            );
            const elJson = await elRes.json();
            return {
              id: page.id,
              title: page.title,
              content: elJson.content,
              css: elJson.css || [],
              js: elJson.js || [],
            };
          })
        );

        setPages(pageData);
      } catch (err) {
        console.error("Error fetching pages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) return <p>Loading pages...</p>;

  return (
    <>
      {pages.map((page) => (
        <div key={page.id} className="elementor-page">
          {/* Dynamically inject CSS */}
          <Head>
            {page.css?.map((href, i) => (
              <link key={i} rel="stylesheet" href={href} />
            ))}
          </Head>

          {/* Hidden title for SEO */}
          <h2 style={{ display: "none" }}>{page.title}</h2>

          {/* Elementor content */}
          <div dangerouslySetInnerHTML={{ __html: page.content }} />

          {/* Dynamically inject JS */}
          {page.js?.map((src, i) => (
            <Script key={i} src={src} strategy="afterInteractive" />
          ))}
        </div>
      ))}
    </>
  );
}
