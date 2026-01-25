import { Metadata } from "next";
import { BlogPosts } from "app/components/posts";

export const metadata: Metadata = {
  title: "Ian D Guzman | Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />
    </section>
  );
}
