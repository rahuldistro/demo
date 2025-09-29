import ElementorWrapper from '@/components/ElementorWrapper';
import { WordPressPage } from '@/types';
import sanitizeHtml from 'sanitize-html';

export default async function Page({ params }: { params: { slug: string } }) {
  let page: WordPressPage | null = null;
  let error: string | null = null;

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
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch page');
    }

    const json = await res.json();
    page = json.data?.pageBy || null;
  } catch (err) {
    console.error('Error fetching page:', err);
    error = 'Failed to load page. Please try again later.';
  }

  if (!page) {
    return (
      <ElementorWrapper>
        <div>Page not found</div>
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
            allowedTags: ['div', 'p', 'h1', 'h2', 'h3', 'a', 'img', 'ul', 'li', 'span', 'button'],
            allowedAttributes: {
              '*': ['class', 'style'],
              a: ['href', 'target'],
              img: ['src', 'alt'],
              button: ['type'],
            },
          }),
        }}
      />
    </ElementorWrapper>
  );
}

export async function generateStaticParams() {
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

  const json = await res.json();
  const pages = json.data?.pages?.nodes || [];
  return pages.map((page: WordPressPage) => ({
    slug: page.slug,
  }));
}


// interface WordPressPage {
//   id: string;
//   slug: string;
//   title: string;
//   content: string;
// }

// interface Params {
//   params: { slug: string };
// }

// export default async function WordPressPageBySlug({ params }: Params) {
//   const { slug } = params;
//   let page: WordPressPage | null = null;

//   try {
//     const res = await fetch(
//       "https://mydemopage.wpenginepowered.com/graphql",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: `
//             query GetPageBySlug($slug: ID!) {
//               page(id: $slug, idType: SLUG) {
//                 id
//                 slug
//                 title
//                 content
//               }
//             }
//           `,
//           variables: { slug },
//         }),
//       }
//     );

//     const json = await res.json();
//     page = json.data.page;
//   } catch (err) {
//     console.error("Error fetching page:", err);
//   }

//   if (!page) return <p>Page not found</p>;

//   return (
//     <div>
//       <h1 style={{ display: "none" }}>{page.title}</h1> {/* SEO ke liye */}
//       <div dangerouslySetInnerHTML={{ __html: page.content }} />
//     </div>
//   );
// }
