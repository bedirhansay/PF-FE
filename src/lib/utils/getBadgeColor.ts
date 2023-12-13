export const GetBadgeColor = (value: string) => {
  switch (value) {
    case "Javascript":
      return { bg: "#FFF07D", text: "#E7C100" };
    case "Next Js":
      return { bg: "#AED9E0", text: "#78a2a9" };
    case "Seo":
      return { bg: "#C0FFA0", text: "#6AC33E" };
    case "React Js":
      return { bg: "#D3A0A2", text: "#9b6c6e" };
    case "TypeScripts":
      return { bg: "#B9A0B1", text: "#846c7c" };
    case "TypeScript":
      return { bg: "#6D92A1", text: "#374955" };
    default:
      return { bg: "#FFFFFF", text: "#000000" }; // Varsayılan renk
  }
};
