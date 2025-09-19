import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WordPress Pages in Next.js",
  description: "Render WP Elementor pages dynamically",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
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
        <script
          src="https://mydemopage.wpenginepowered.com/wp-content/plugins/elementor/assets/js/frontend.min.js"
          defer
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
