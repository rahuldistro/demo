// app/post/[slug]/page.tsx
import Image from "next/image";

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

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch a single post by slug
  const res = await fetch(`https://mydemopage.wpenginepowered.com/wp-json/wp/v2/posts?slug=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p>Error fetching post. Please check the WordPress API.</p>
      </div>
    );
  }

  const post: WordPressPost = (await res.json())[0];

  if (!post) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}