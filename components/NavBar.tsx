// components/NavBar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Page {
  id: string;
  slug: string;
  title: string;
}

export default function NavBar() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPages() {
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
                    }
                  }
                }
              `,
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to fetch pages");

        const json = await res.json();
        setPages(json.data.pages.nodes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPages();
  }, []);

  if (loading) return <div className="loading">Loading menu...</div>;

  return (
    <nav className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal">
      <ul className="elementor-nav-menu">
        {pages.map((page) => (
          <li key={page.id} className="menu-item menu-item-type-post_type menu-item-object-page">
            <Link href={`/${page.slug}`}>
               {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
