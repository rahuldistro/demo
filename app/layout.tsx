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
<html lang="en" className="hydrated"> 
   
      <body className={inter.className} cz-shortcut-listen="true">
        {children}

        {/* WordPress Scripts */}
      {/*  <Script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery.min.js" strategy="beforeInteractive" />
        <Script src="https://mydemopage.wpenginepowered.com/wp-includes/js/jquery/jquery-migrate.min.js" strategy="beforeInteractive" />
        <Script src="https://mydemopage.wpenginepowered.com/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery.blockUI.min.js" strategy="beforeInteractive" />*/}
      </body>
    </html>
  );
}

