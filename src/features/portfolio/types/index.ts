export interface Profile {
  name: string;
  title: string;
  bio: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
}
