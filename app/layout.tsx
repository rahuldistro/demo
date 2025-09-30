// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Next.js App',
  description: 'Next.js with WordPress styles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      <link rel="alternate" type="application/rss+xml" title="Bryan Garabrandt Site » Feed" href="https://mydemopage.wpenginepowered.com/feed/"/>
      <link rel="alternate" type="application/rss+xml" title="Bryan Garabrandt Site » Comments Feed" href="https://mydemopage.wpenginepowered.com/comments/feed/"/>
      <link rel="stylesheet" id="woocommerce-layout-css" href="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/css/woocommerce-layout.css?ver=10.2.1" media="all"/>
      <link rel="stylesheet" id="woocommerce-smallscreen-css" href="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/css/woocommerce-smallscreen.css?ver=10.2.1" media="only screen and (max-width: 768px)"/>

    </head>
      <body className={inter.className}>
        {children}
       
        <Script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery.min.js" strategy="beforeInteractive" />
        <Script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery-migrate.min.js" strategy="beforeInteractive" />
        <Script src="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery.blockUI.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
