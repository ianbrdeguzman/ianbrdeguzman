import { Metadata } from "next";

const projects = [
  {
    title: "Evie - Digital Cash Stuffing",
    type: "Mobile app",
    href: "https://evie.ianbrdeguzman.com",
    summary:
      "Local-first envelope budget for people who want clarity, not financial noise. Fund the next paycheck, see what is safe to spend, and keep your weekly review light.",
  },
  {
    title: "Shopfront Studio",
    type: "Web app",
    href: "https://shopfront-studio.example.com",
    summary:
      "An ecommerce admin dashboard for managing products, orders, and customer activity in one place.",
  },
  {
    title: "Nomad Notes",
    type: "Mobile app",
    href: "https://nomad-notes.example.com",
    summary:
      "A lightweight travel journal app for capturing itineraries, photos, and quick notes while exploring.",
  },
];

export const metadata: Metadata = {
  title: "Ian D Guzman | Projects",
  description: "A selection of mobile and web app projects.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <div>
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4"
          >
            <article className="flex flex-col space-y-1">
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                  {project.type}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {project.title}
                </p>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 md:pl-[108px]">
                {project.summary}
              </p>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}
