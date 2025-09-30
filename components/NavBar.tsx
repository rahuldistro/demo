"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Page {
  id: string;
  slug: string;
  title: string;
}

interface NavBarProps {
  pages?: Page[]; // Optional prop
}

export default function NavBar({ pages }: NavBarProps) {
  const [localPages, setLocalPages] = useState<Page[]>(pages || []);
  const [loading, setLoading] = useState(!pages); // If pages provided, no need to load

  useEffect(() => {
    if (pages && pages.length > 0) return; // Already have pages

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
        setLocalPages(json.data.pages.nodes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPages();
  }, [pages]);

  if (loading) return <div className="loading">Loading menu...</div>;

  return (
    <nav className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal">
      <ul className="elementor-nav-menu">
        {localPages.map((page) => (
          <li
            key={page.id}
            className="menu-item menu-item-type-post_type menu-item-object-page"
          >
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


