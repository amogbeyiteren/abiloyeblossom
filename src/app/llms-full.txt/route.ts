import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

function stripMarkdownLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export async function GET() {
  const posts = await getBlogPosts();

  const workSection = DATA.work
    .map(
      (w) =>
        `### ${w.title} — ${w.company} (${w.start} - ${w.end || "Present"})\n${
          w.location ? `Location: ${w.location}\n` : ""
        }${w.description}`
    )
    .join("\n\n");

  const educationSection = DATA.education
    .map(
      (e) =>
        `### ${e.school} (${e.start} - ${e.end})\n${e.degree}${
          e.location ? `\nLocation: ${e.location}` : ""
        }${"GPA" in e && e.GPA ? `\nGPA: ${e.GPA}` : ""}`
    )
    .join("\n\n");

  const skillsSection = DATA.skills
    .map((group) => `- **${group.category}:** ${group.items.join(", ")}`)
    .join("\n");

  const projectsSection = DATA.projects
    .map(
      (p) =>
        `### ${p.title} (${p.dates})\n${p.description}\nTechnologies: ${p.technologies.join(
          ", "
        )}\nLink: ${p.href}`
    )
    .join("\n\n");

  const certsSection = DATA.certifications
    .map((c) => `- ${c.name} — ${c.provider} (${c.date})`)
    .join("\n");

  const pubsSection = DATA.publications
    .map((p) => `- [${p.title}](${p.link}) — ${p.platform} (${p.date})`)
    .join("\n");

  const blogSection = posts.length
    ? posts
        .map(
          (post) =>
            `### ${post.metadata.title} (${post.metadata.publishedAt})\n${
              post.metadata.summary ?? ""
            }\nURL: ${DATA.url}/blog/${post.slug}`
        )
        .join("\n\n")
    : "No posts yet.";

  const body = `# ${DATA.name} — Full Site Content

> ${DATA.description}

Location: ${DATA.location}
Email: ${DATA.contact.email}
GitHub: ${DATA.contact.social.GitHub.url}
LinkedIn: ${DATA.contact.social.LinkedIn.url}

## About

${stripMarkdownLinks(DATA.summary)}

## Work Experience

${workSection}

## Education

${educationSection}

## Skills

${skillsSection}

## Projects

${projectsSection}

## Certifications

${certsSection}

## Publications

${pubsSection}

## Blog Posts

${blogSection}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
