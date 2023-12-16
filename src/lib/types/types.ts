export type ContextProps = {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export type SkillsDTO = {
  title: string;
  items: string[];
  bgColor: string;
  image: string;
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
