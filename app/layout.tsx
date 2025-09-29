import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'WordPress Next.js Site',
  description: 'A Next.js application displaying WordPress pages with Elementor content',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}