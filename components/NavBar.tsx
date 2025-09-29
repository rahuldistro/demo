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
            <Link href={`/${page.slug}`}>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .page-navigation {
          background-color: #f4f4f4;
          padding: 15px 0;
          border-bottom: 1px solid #ddd;
        }
        .page-navigation ul {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 0;
        }
        .page-navigation a {
          text-decoration: none;
          color: #333;
          font-size: 16px;
          font-weight: 500;
        }
        .page-navigation a:hover {
          color: #0070f3;
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}