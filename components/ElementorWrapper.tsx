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
      <div className="elementor-wrapper">{children}</div>
    </>
  );
}