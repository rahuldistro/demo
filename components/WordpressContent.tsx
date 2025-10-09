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

import { useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function WordPressContent({ html }: { html: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // 🧠 STEP 1: Replace old WordPress domain with your new one
  const cleanHtml = useMemo(() => {
    return html.replaceAll(
      /https:\/\/mydemopage\.wpenginepowered\.com/g,
      "https://hpw3htm4fsd7dfi6h6lrevu3r.js.wpenginepowered.com"
    );
  }, [html]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordpressDomain = "https://hpw3htm4fsd7dfi6h6lrevu3r.js.wpenginepowered.com";

    const anchors = container.querySelectorAll("a[href]");
    anchors.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      // Case 1: External links — allow them
      if (
        href.startsWith("http") &&
        !href.startsWith(wordpressDomain)
      ) {
        return;
      }

      // Case 2: Internal WP links → Next.js route
      let internalPath = href;
      if (href.startsWith(wordpressDomain)) {
        internalPath = href.replace(wordpressDomain, "");
      }

      if (!internalPath.startsWith("/")) {
        internalPath = "/" + internalPath;
      }

      // Navigate with Next.js
      a.addEventListener("click", (e) => {
        e.preventDefault();
        router.push(internalPath);
      });
    });

    // Cleanup
    return () => {
      anchors.forEach((a) => {
        a.replaceWith(a.cloneNode(true));
      });
    };
  }, [cleanHtml, router]);

  return (
    <section className="page-section">
      <div
        ref={containerRef}
        className="elementor"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </section>
  );
}

