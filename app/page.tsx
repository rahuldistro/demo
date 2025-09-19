// app/page.tsx
import Image from "next/image";
import Link from "next/link";

// Define interfaces
interface WordPressPage {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

interface WordPressPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

export default async function Home() {
  // Fetch pages and posts
  const pageRes = await fetch("https://mydemopage.wpenginepowered.com/wp-json/wp/v2/pages", {
    cache: "no-store",
  });
  const postRes = await fetch("https://mydemopage.wpenginepowered.com/wp-json/wp/v2/posts", {
    cache: "no-store",
  });

  // Handle API errors
  if (!pageRes.ok || !postRes.ok) {
    console.error("Failed to fetch:", pageRes.status, postRes.status);
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1>WordPress Content</h1>
        <p>Error fetching content. Please check the WordPress API.</p>
      </div>
    );
  }

  const pages: WordPressPage[] = await pageRes.json();
  const posts: WordPressPost[] = await postRes.json();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>WordPress Content</h1>

      <h2>Pages</h2>
      {pages.length > 0 ? (
        <ul>
          {pages.map((page: WordPressPage) => (
            <li key={page.id}>
              <Link href={`/${page.slug}`} className="text-blue-600 hover:underline">
                {page.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages found.</p>
      )}

      <h2>Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post: WordPressPost) => (
            <li key={post.id}>
              <Link href={`/post/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}