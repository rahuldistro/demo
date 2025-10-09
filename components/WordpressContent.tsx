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

    // ✅ all WordPress domains you want to strip
    const wordpressDomains = [
      "https://hpw3htm4fsd7dfi6h6lrevu3r.js.wpenginepowered.com",
      "https://mydemopage.wpenginepowered.com",
    ];

    const anchors = container.querySelectorAll("a[href]");
    anchors.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      let internalPath = href;

      // Check if link matches any WP domain
      const matchedDomain = wordpressDomains.find((domain) =>
        href.startsWith(domain)
      );

      // If the link starts with your WP domain, strip it
      if (matchedDomain) {
        internalPath = href.replace(matchedDomain, "");
      }

      // If it’s still a full external link (not internal WP link), skip
      if (internalPath.startsWith("http") || internalPath.startsWith("mailto:")) {
        return;
      }

      // Ensure the internal path starts with "/"
      if (!internalPath.startsWith("/")) {
        internalPath = "/" + internalPath;
      }

      // Attach Next.js routing handler
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
