// pages/page.tsx
import Image from "next/image";

export async function getStaticProps() {
  // Fetch pages from WordPress REST API
  const res = await fetch("https://mydemopage.wpenginepowered.com/wp-json/wp/v2/pages");
  const pages = await res.json();

  // Check if the response is valid
  if (!res.ok) {
    console.error("Failed to fetch pages:", res.status, res.statusText);
    return { props: { pages: [] } };
  }

  return {
    props: { pages }, // Pass pages to the component
    revalidate: 10, // Revalidate every 10 seconds (ISR)
  };
}

export default function Home({ pages }) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>WordPress Pages</h1>
      {pages.length > 0 ? (
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <a href={`/${page.slug}`} className="text-blue-600 hover:underline">
                {page.title.rendered}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages found. Check WordPress API or deployment.</p>
      )}
    </div>
  );
}