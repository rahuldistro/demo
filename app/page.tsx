import NavBar from '@/components/NavBar';
import ElementorWrapper from '@/components/ElementorWrapper';
import { WordPressPage } from '@/types';
import sanitizeHtml from 'sanitize-html';

export default async function Home() {
  let pages: WordPressPage[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      'https://mydemopage.wpenginepowered.com/graphql',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetPages {
              pages {
                nodes {
                  id
                  slug
                  title
                  content
                }
              }
            }
          `,
        }),
        cache: 'force-cache', // Static generation
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch pages');
    }

    const json = await res.json();
    pages = json.data?.pages?.nodes || [];
  } catch (err) {
    console.error('Error fetching pages:', err);
    error = 'Failed to load pages. Please try again later.';
  }

  return (
    <div>
      <NavBar pages={pages} />
      <ElementorWrapper>
        {error ? (
          <div className="error">{error}</div>
        ) : pages.length === 0 ? (
          <div className="loading">Loading pages...</div>
        ) : (
          <div className="page-list">
            {pages.map((page) => (
              <section key={page.id} className="page-section">
                <h2>
                  <Link href={`/${page.slug}`}>{page.title}</Link>
                </h2>
                <div
                  className="elementor"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(page.content || 'No content available', {
                      allowedTags: [
                        'div',
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'a',
                        'img',
                        'ul',
                        'li',
                        'span',
                        'button',
                      ],
                      allowedAttributes: {
                        '*': ['class', 'style'],
                        a: ['href', 'target'],
                        img: ['src', 'alt'],
                        button: ['type'],
                      },
                    }),
                  }}
                />
              </section>
            ))}
          </div>
        )}
      </ElementorWrapper>
      <style jsx>{`
        .page-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .page-section {
          border-bottom: 1px solid #eee;
          padding-bottom: 20px;
        }
        .page-section h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .page-section h2 a {
          color: #333;
          text-decoration: none;
        }
        .page-section h2 a:hover {
          color: #0070f3;
        }
        .error {
          color: red;
          text-align: center;
          padding: 20px;
        }
        .loading {
          text-align: center;
          padding: 20px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}