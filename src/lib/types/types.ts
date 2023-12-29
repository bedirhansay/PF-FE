export type ContextProps = {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export type SkillsDTO = {
  _id?: string;
  title: string;
  items: string[];
  bgColor: string;
  image: string | undefined;
  itemColor: string;
};

export type LoginDTO = {
  email?: string;
  password: string;
};

export type RegisterDTO = {
  email?: string;
  password: string;
};

export type AboutDTO = {
  _id?: string;
  content: string;
};

export type ProjectDTO = {
  _id: string;
  company: string;
  projectName: string;
  image: string;
  time: number;
  area: string;
  tags?: string[];
  description?: string;
  goals?: string[];
  scope?: string;
  requirements?: string[];
  tasks: string;
  createdAt?: string;
};

export type CategoryDTO = {
  _id: string;
  name: string;
  image: string;
  createdAt?: string;
};

export type ExperienceDTO = {
  _id: string;
  title: string;
  location: string;
  position: string;
  description: string;
  image: string;
  date: string;
  skills: string[];
  createdAt?: string;
};

export type BlogDTO = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  image?: string;
  viewCount?: number;
  category: CategoryDTO;
  createdAt?: string;
};
