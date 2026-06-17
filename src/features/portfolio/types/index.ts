export interface Profile {
  name: string;
  title: string;
  bio: string;
}

export interface ProjectContentBlock {
  heading: string;
  paragraphs: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  publishedAt?: string;
  content?: ProjectContentBlock[];
}
