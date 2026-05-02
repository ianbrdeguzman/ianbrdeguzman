import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Ian D. Guzman
      </h1>
      <p className="mb-4">
        A dedicated father and experienced software professional, Ian balances
        the responsibilities of parenthood with a passion for technology.
      </p>
      <p>
        With half a decade of experience as a full-stack developer, including
        mobile application development using React Native, he brings a
        thoughtful and disciplined approach to building high-quality software.
        Known for his problem-solving skills and positive attitude, Ian
        approaches both technical challenges and life’s demands with focus,
        adaptability, and a sense of balance.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
