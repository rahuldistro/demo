'use client';

import Link from 'next/link';
import { WordPressPage } from '@/types';

interface NavBarProps {
  pages: WordPressPage[];
}

export default function NavBar({ pages }: NavBarProps) {
  return (
    <nav className="page-navigation">
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}