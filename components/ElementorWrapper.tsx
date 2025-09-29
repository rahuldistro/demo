// "use client";

// import { useEffect } from "react";

// export default function ElementorWrapper({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     // 1️⃣ Load Elementor JS
//     const scripts = [
//       "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/swiper/swiper.min.js",
//       "https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/js/frontend.min.js",
//     ];

//     scripts.forEach((src) => {
//       if (!document.querySelector(`script[src="${src}"]`)) {
//         const script = document.createElement("script");
//         script.src = src;
//         script.async = true;
//         document.body.appendChild(script);
//       }
//     });

//     // 2️⃣ Initialize Elementor widgets after scripts load
//     const initElementor = () => {
//       if (window.elementorFrontend?.init) {
//         window.elementorFrontend.init();
//       }
//     };

//     // Delay init to make sure DOM is rendered
//     const timeout = setTimeout(initElementor, 500);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <>
//       {/* Elementor CSS */}
//       <link
//         rel="stylesheet"
//         href="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/frontend.min.css"
//       />
//       <link
//         rel="stylesheet"
//         href="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/font-awesome.min.css"
//       />
//       {children}
//     </>
//   );
// }



import { ReactNode } from 'react';
import Head from 'next/head';

interface ElementorWrapperProps {
  children: ReactNode;
}

export default function ElementorWrapper({ children }: ElementorWrapperProps) {
  return (
    <>
      <Head>
        {/* Include Elementor frontend CSS if needed */}
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/frontend.min.css"
        />
      </Head>
      <div className="elementor-wrapper">
        {children}
        <style jsx global>{`
          .elementor-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          .elementor img {
            max-width: 100%;
            height: auto;
          }
          .elementor {
            line-height: 1.6;
          }
        `}</style>
      </div>
    </>
  );
}