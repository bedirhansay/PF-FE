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
