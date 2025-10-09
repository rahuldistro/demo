// "use client";

// export default function WordPressContent({ html }: { html: string }) {
//   return (
//     <section className="page-section">
//       <div
//         className="elementor"
//         dangerouslySetInnerHTML={{ __html: html }}
//       />
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function WordPressContent({ html }: { html: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Domains to treat as internal (headless + old WP)
    const internalDomains = [
      "https://hpw3htm4fsd7dfi6h6lrevu3r.js.wpenginepowered.com",
      "https://mydemopage.wpenginepowered.com",
    ];

    const anchors = container.querySelectorAll<HTMLAnchorElement>("a[href]");

    anchors.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      const isInternal = internalDomains.some((domain) =>
        href.startsWith(domain)
      );

      // Skip true external links (leave them alone)
      if (!isInternal && href.startsWith("http")) return;

      // Compute internal route path
      let internalPath = href;
      internalDomains.forEach((domain) => {
        internalPath = internalPath.replace(domain, "");
      });

      // Normalize path
      if (!internalPath.startsWith("/")) internalPath = "/" + internalPath;

      // Remove old event listeners to avoid duplicate
      const newLink = a.cloneNode(true) as HTMLAnchorElement;
      newLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // 🔥 Stops Elementor or browser navigation
        router.push(internalPath);
      });

      // Replace original link with new one (fully preserves HTML/CSS)
      a.replaceWith(newLink);
    });
  }, [html, router]);

  return (
    <section className="page-section">
      <div
        ref={containerRef}
        className="elementor"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
