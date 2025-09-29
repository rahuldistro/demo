import NavBar from '@/components/NavBar';
import ElementorWrapper from '@/components/ElementorWrapper';
import { WordPressPage } from '@/types';
import sanitizeHtml from 'sanitize-html';

export default async function Home() {
  let pages: WordPressPage[] = [];

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
        cache: 'force-cache',
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch pages');
    }

    const json = await res.json();
    pages = json.data?.pages?.nodes || [];
  } catch (err) {
    console.error('Error fetching pages:', err);
    return (
      <div>
        <NavBar pages={[]} />
        <ElementorWrapper>
          <div className="error">Failed to load pages. Please try again later.</div>
        </ElementorWrapper>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div>
        <NavBar pages={[]} />
        <ElementorWrapper>
          <div className="loading">Loading pages...</div>
        </ElementorWrapper>
      </div>
    );
  }

  return (
    <div>
      <NavBar pages={pages} />
      <ElementorWrapper>
        <div className="page-list">
          {pages.map((page) => (
            <section key={page.id} className="page-section">
              <h2>
                <a href={`/${page.slug}`}>{page.title}</a>
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
                    transformTags: {
                      img: (tagName, attribs) => ({
                        tagName,
                        attribs: {
                          ...attribs,
                          src: attribs.src.startsWith('http')
                            ? attribs.src.replace('https://mydemopage.wpenginepowered.com', '')
                            : attribs.src,
                        },
                      }),
                    },
                  }),
                }}
              />
            </section>
          ))}
        </div>
      </ElementorWrapper>
    </div>
  );
}