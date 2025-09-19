import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "WordPress Pages in Next.js",
  description: "Render WP Elementor pages dynamically",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Elementor + Theme CSS */}
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/themes/hello-elementor/assets/css/reset.css"
        />
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/themes/hello-elementor/assets/css/theme.css"
        />
        <link
          rel="stylesheet"
          href="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/css/frontend.min.css"
        />

        {/* Elementor JS */}
        <Script
          src="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/js/frontend.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
