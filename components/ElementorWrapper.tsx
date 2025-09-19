// components/ElementorWrapper.tsx
"use client";

import { useEffect } from "react";

export default function ElementorWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load Elementor JS dynamically after render
    const scripts = [
      "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/js/frontend.min.js",
      "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/swiper/swiper.min.js", // swiper if sliders used
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    return () => {
      // Cleanup scripts if needed
      scripts.forEach((src) => {
        const s = document.querySelector(`script[src="${src}"]`);
        if (s) s.remove();
      });
    };
  }, []);

  return (
    <>
      {/* Elementor CSS */}
      <link
        rel="stylesheet"
        href="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/frontend.min.css"
      />
      <link
        rel="stylesheet"
        href="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/font-awesome.min.css"
      />
      {children}
    </>
  );
}
