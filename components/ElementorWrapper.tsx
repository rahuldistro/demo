"use client";

import { useEffect } from "react";

export default function ElementorWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1️⃣ Load Elementor JS
    const scripts = [
      "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/js/frontend.min.js",
      "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/swiper/swiper.min.js", // for sliders
    ];

    scripts.forEach((src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      }
    });

    // 2️⃣ Initialize Elementor widgets after scripts load
    const initElementor = () => {
      if (window?.elementorFrontend?.init) {
        window.elementorFrontend.init();
      }
    };

    // Delay init to make sure DOM is rendered
    const timeout = setTimeout(initElementor, 500);

    return () => clearTimeout(timeout);
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
