export enum Categories {
  "mostShared" = "mostShared",
  "mostRecent" = "mostRecent",
  "Actualité & politique" = "Actualité & politique",
  "Anime" = "Anime",
  "Cinéma" = "Cinéma",
  "Dessins animé" = "Dessins animés",
  "Gaming" = "Gaming",
  "Humoristes" = "Humoristes",
  "Médias & réseaux sociaux" = "Médias & réseaux sociaux",
  "Memes" = "Memes",
  "Musique" = "Musique",
  "Sport" = "Sport",
  "Télévision" = "Télévision",
}

export enum CategoriesIconName {
  "mostShared" = "FireIcon",
  "mostRecent" = "ClockIcon",
  "Actualité & politique" = "AcademicCap",
  "Anime" = "Eye",
  "Cinéma" = "Film",
  "Dessins animés" = "Photograph",
  "Gaming" = "Puzzle",
  "Humoristes" = "EmojiHappy",
  "Médias & réseaux sociaux" = "Globe",
  "Memes" = "Chat",
  "Musique" = "MusicNote",
  "Sport" = "Speakerphone",
  "Télévision" = "DesktopComputer",
}

export enum CategoriesIconColor {
  "mostShared" = "#6565F1",
  "mostRecent" = "#E449A3",
  "Actualité & politique" = "white",
  "Anime" = "green",
  "Cinéma" = "red",
  "Dessins animés" = "blue",
  "Gaming" = "purple",
  "Humoristes" = "yellow",
  "Médias & réseaux sociaux" = "green",
  "Memes" = "white",
  "Musique" = "red",
  "Sport" = "white",
  "Télévision" = "brown",
}

export const getIconNameAndColorByCategory = (category: Categories): { iconName: string; color: string } => {
  return {
    iconName: CategoriesIconName[category],
    color: CategoriesIconColor[category],
  };
};
