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
        cache: 'force-cache', // Static generation ke liye
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

  // Home page ka content find karein
  const homePage = pages.find((page) => page.slug === 'home');

  return (
    <div>
      <NavBar pages={pages} />
      {error ? (
        <div className="error">{error}</div>
      ) : pages.length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <ElementorWrapper>
          {homePage ? (
            <div
              className="elementor"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(homePage.content || 'No content available', {
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
          ) : (
            <div>Home page not found</div>
          )}
        </ElementorWrapper>
      )}
      <style jsx>{`
        .error {
          color: red;
          text-align: center;
          padding: 20px;
        }
        .loading {
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}



// import ElementorWrapper from "@/components/ElementorWrapper";

// interface WordPressPage {
//   id: string;
//   slug: string;
//   title: string;
//   content: string;
// }

// export default async function Home() {
//   let pages: WordPressPage[] = [];

//   try {
//     const res = await fetch(
//       "https://mydemopage.wpenginepowered.com/graphql",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: `
//             query GetPages {
//               pages {
//                 nodes {
//                   id
//                   slug
//                   title
//                   content
//                 }
//               }
//             }
//           `,
//         }),
//       }
//     );

//     const json = await res.json();
//     pages = json.data.pages.nodes;
//   } catch (err) {
//     console.error("Error fetching pages:", err);
//   }

//   return (
//     <ElementorWrapper>
//       {pages.map((page) => (
//         <div
//           key={page.id}
//           className="elementor"
//           dangerouslySetInnerHTML={{ __html: page.content }}
//         />
//       ))}
//     </ElementorWrapper>
//   );
// }
