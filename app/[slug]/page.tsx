import ElementorWrapper from '@/components/ElementorWrapper';
import { WordPressPage } from '@/types';
import sanitizeHtml from 'sanitize-html';

export default async function Page({ params }: { params: { slug: string } }) {
  let page: WordPressPage | null = null;

  try {
    const res = await fetch(
      'https://mydemopage.wpenginepowered.com/graphql',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetPageBySlug($slug: String!) {
              pageBy(slug: $slug) {
                id
                slug
                title
                content
              }
            }
          `,
          variables: { slug: params.slug },
        }),
        cache: 'force-cache',
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch page');
    }

    const json = await res.json();
    page = json.data?.pageBy || null;
  } catch (err) {
    console.error('Error fetching page:', err);
    return (
      <ElementorWrapper>
        <div className="error">Failed to load page. Please try again later.</div>
      </ElementorWrapper>
    );
  }

  if (!page) {
    return (
      <ElementorWrapper>
        <div className="error">Page not found</div>
      </ElementorWrapper>
    );
  }

  return (
    <ElementorWrapper>
      <h1>{page.title}</h1>
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
              img: (tagName: string, attribs: Record<string, string>) => ({
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
    </ElementorWrapper>
  );
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://mydemopage.wpenginepowered.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetPages {
            pages {
              nodes {
                slug
              }
            }
          }
        `,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch pages');
    }

    const json = await res.json();
    const pages = json.data?.pages?.nodes || [];
    return pages.map((page: WordPressPage) => ({
      slug: page.slug,
    }));
  } catch (err) {
    console.error('Error generating static params:', err);
    return [];
  }
}