import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen">
      <div className="px-8 py-16 lg:py-24">
        <div className="relative">
          <h1 className="text-4xl lg:text-5xl font-serif font-medium mb-12 leading-tight relative">
            About
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent to-transparent opacity-30"></div>
          </h1>
        </div>

        <div className="prose-custom">
          <p className="text-lg text-gray-600 mb-8">
            I'm a data engineer with a strong foundation in software
            development. My journey began in traditional software engineering,
            where I learned to build robust applications and systems.
          </p>

          <p>
            Over time, I discovered my passion for data and made the transition
            to data engineering. Today, I focus on designing and implementing
            scalable data pipelines, optimizing data workflows, and ensuring
            data quality at scale.
          </p>

          <p>
            I work with technologies like Apache Airflow, Spark, Python, and
            various cloud platforms to solve complex data challenges. The
            intersection of software engineering principles and data processing
            fascinates me—it's where robust system design meets the unique
            challenges of handling data at scale.
          </p>

          <p>
            Through this blog, I share my experiences, learnings, and insights
            from both worlds. I hope to help others who are on similar journeys
            or looking to understand how software engineering principles apply
            to data engineering challenges.
          </p>

          <p>
            When I'm not working with data, I enjoy reading about distributed
            systems, contributing to open source projects, and exploring new
            technologies that can improve how we process and understand data.
          </p>

          <p>
            Feel free to reach out if you'd like to discuss data engineering,
            software development, or anything related to building scalable
            systems. I'm always interested in connecting with fellow engineers
            and sharing knowledge.
          </p>
        </div>
      </div>
    </main>
  );
}
