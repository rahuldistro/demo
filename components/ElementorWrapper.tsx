import { ReactNode } from 'react';
import Head from 'next/head';

interface ElementorWrapperProps {
  children: ReactNode;
}

export default function ElementorWrapper({ children }: ElementorWrapperProps) {
  return (
    <>
      <Head>
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
          .elementor {
            line-height: 1.6;
            color: #333;
          }
          .elementor img {
            max-width: 100%;
            height: auto;
          }
          .elementor a {
            color: #0070f3;
            text-decoration: none;
          }
          .elementor a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </>
  );
}