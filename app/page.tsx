"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

interface WordPressPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

export default function Home() {
  const [pages, setPages] = useState<WordPressPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
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
            cache: "no-store",
          }
        );

        const json = await res.json();
        setPages(json.data.pages.nodes);
      } catch (err) {
        console.error("Error fetching pages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) return <p>Loading pages...</p>;

  // Elementor frontend CSS/JS + theme CSS
  const elementorCss = [
    "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/frontend.min.css",
    "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css",
    "https://mydemopage.wpenginepowered.com/wp-content/themes/your-theme/style.css", // Replace with your theme CSS
  ];

  const elementorJs = [
    "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/js/frontend.min.js",
  ];

  return (
    <>
      <Head>
        {elementorCss.map((href, i) => (
          <link key={i} rel="stylesheet" href={href} />
        ))}
      </Head>

      <div>
        {pages.map((page) => (
          <div key={page.id} className="elementor-page">
            <h2 style={{ display: "none" }}>{page.title}</h2> {/* SEO */}
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        ))}
      </div>

      {elementorJs.map((src, i) => (
        <Script key={i} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
