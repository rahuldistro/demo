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

    const anchors = container.querySelectorAll("a[href]");
    anchors.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      const wordpressDomain = "https://hpw3htm4fsd7dfi6h6lrevu3r.js.wpenginepowered.com";

      // Case 1: External links (leave them as is)
      if (
        href.startsWith("http") &&
        !href.startsWith(wordpressDomain)
      ) {
        return;
      }

      // Case 2: WordPress links — convert to relative Next.js routes
      let internalPath = href;

      if (href.startsWith(wordpressDomain)) {
        internalPath = href.replace(wordpressDomain, "");
      }

      // Case 3: Ensure path starts with '/'
      if (!internalPath.startsWith("/")) {
        internalPath = "/" + internalPath;
      }

      // Add click handler
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
      <div
        ref={containerRef}
        className="elementor"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
