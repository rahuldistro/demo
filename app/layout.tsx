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
        {/* WordPress Stylesheets */}
        <link rel="stylesheet" href="https://mydemopage.wpenginepowered.com/wp-content/uploads/elementor/css/global.css" />
<link rel="stylesheet" href="https://mydemopage.wpenginepowered.com/wp-content/uploads/elementor/css/post-123.css" />

        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/css/woocommerce-layout.css?ver=10.2.1"
        />
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/css/woocommerce-smallscreen.css?ver=10.2.1"
        />
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/css/woocommerce.css?ver=10.2.1"
        />
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/themes/hello-elementor/assets/css/reset.css?ver=3.4.4"
        />
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/themes/hello-elementor/assets/css/theme.css?ver=3.4.4"
        />
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/themes/hello-elementor/assets/css/header-footer.css?ver=3.4.4"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap"
        />
      </head>
      <body className={inter.className}>
        {children}

        {/* WordPress Scripts */}
      {/*  <Script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery.min.js" strategy="beforeInteractive" />
        <Script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery-migrate.min.js" strategy="beforeInteractive" />
        <Script src="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery.blockUI.min.js" strategy="beforeInteractive" />*/}
      </body>
    </html>
  );
}

