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

    const wordpressDomain = "https://hpw3htm4fsd7dfi6h6lrevu3r.js.wpenginepowered.com";
    const oldDomain = "https://mydemopage.wpenginepowered.com";

    const anchors = container.querySelectorAll("a[href]");
    anchors.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      // Keep external links working normally
      if (
        href.startsWith("http") &&
        !href.startsWith(wordpressDomain) &&
        !href.startsWith(oldDomain)
      ) {
        return;
      }

      // Convert old WP domain to new one for internal navigation (only for click)
      let internalPath = href
        .replace(wordpressDomain, "")
        .replace(oldDomain, "");

      if (!internalPath.startsWith("/")) internalPath = "/" + internalPath;

      // Intercept click to use Next.js router
      a.addEventListener("click", (e) => {
        e.preventDefault();
        router.push(internalPath);
      });
    });

    // Cleanup on re-render
    return () => {
      anchors.forEach((a) => {
        a.replaceWith(a.cloneNode(true));
      });
    };
  }, [html, router]);

  return (
    <section className="page-section">
      {/* ✅ Keep the original HTML untouched (CSS & scripts remain) */}
      <div
        ref={containerRef}
        className="elementor"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
