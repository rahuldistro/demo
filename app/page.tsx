// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // Fetch pages from WordPress REST API
  const res = await fetch("https://mydemopage.wpenginepowered.com/wp-json/wp/v2/pages", {
    cache: "no-store", // Ensure fresh data (similar to ISR)
  });
  const pages = await res.json();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>WordPress Pages</h1>
      {pages.length > 0 ? (
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <Link href={`/${page.slug}`} className="text-blue-600 hover:underline">
                {page.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages found. Check WordPress API or deployment.</p>
      )}
    </div>
  );
}