import js from "../../../public/icon/javascript.png";
import ts from "../../../public/icon/typescript.png";
import rj from "../../../public/icon/react.png";
import nj from "../../../public/icon/nextjs.png";
import seo from "../../../public/icon/html-folder.png";

export const GetBadgeIcon = (value: string) => {
  switch (value) {
    case "Javascript":
      return js;
    case "Next Js":
      return nj;
    case "Seo":
      return seo;
    case "React Js":
      return rj;
    case "TypeScript":
      return ts;
    default:
      return js;
  }
};
