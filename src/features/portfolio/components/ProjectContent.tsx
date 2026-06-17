import type { ProjectContentBlock } from "../types";

interface ProjectContentProps {
  blocks?: ProjectContentBlock[];
}

export function ProjectContent({ blocks }: ProjectContentProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-base text-muted-foreground">
          O conteúdo detalhado deste case ainda será publicado.
        </p>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex flex-col gap-12">
        {blocks.map((block) => (
          <section key={block.heading} className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {block.heading}
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              {block.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
