interface Project {
  title: string;
  description: string;
  url: string;
  year: string;
  roles: string[];
  stack: string[];
}

const projects: Project[] = [
  {
    title: "Leave Her Alone — Archiving Misogyny in South Korea",
    description:
      "A documentation platform archiving incidents of misogyny and gender-based violence in South Korea. Combines curated news articles, personal testimonials, and data visualizations drawn from official sources to reveal systemic patterns—turning isolated incidents into a coherent record that refuses to be forgotten.",
    url: "https://www.leave-her-alone.org",
    year: "2025-Present",
    roles: ["Planning", "Design", "Development", "Operations"],
    stack: ["Next.js", "TypeScript", "Python", "Supabase(PostgreSQL)", "Anthropic API"],
  },
  {
    title: "Devtionary — A Dictionary for Developers",
    description:
      "A dictionary built for developers—a searchable reference for technical terminology and programming concepts. Designed to be the first place you look when you encounter an unfamiliar term.",
    url: "https://devtionary.lovable.app/",
    year: "2026 -",
    roles: ["Planning", "Design", "Development", "Operations"],
    stack: ["React", "TypeScript", "Supabase(PostgreSQL)"],
  },
];

export default function Projects() {
  return (
    <div className="px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-800 mb-4">Projects</h1>
        <p className="text-stone-600 text-lg">
          A collection of things I&apos;ve built.
        </p>
      </div>

      <div className="grid gap-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl group relative bg-white/95 shadow-lg p-6 lg:p-8"
          >
            
            <h3 className="text-xl lg:text-2xl font-medium mb-4 leading-relaxed">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-accent transition-colors duration-200 group-hover:underline decoration-1 underline-offset-4"
              >
                {project.title}
              </a>
            </h3>

            <div className="flex justify-beween mb-4 w-full">
              <span className="text-sm text-gray-500 tracking-wide">
                {project.roles.join(", ")}
              </span>
            </div>

            <div className="prose-custom mb-6">
              <p className="text-gray-600">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
