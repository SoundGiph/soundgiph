export enum Categories {
  "mostShared" = "mostShared",
  "mostRecent" = "mostRecent",
  "Actualite&politique" = "Actualite&politique",
  "Anime" = "Anime",
  "Cinema" = "Cinema",
  "Dessinsanime" = "Dessinsanime",
  "Gaming" = "Gaming",
  "Humoristes" = "Humoristes",
  "Medias&reseauxsociaux" = "Medias&reseauxsociaux",
  "Memes" = "Memes",
  "Musique" = "Musique",
  "Sport" = "Sport",
  "Television" = "Television",
}

export enum CategoriesIconName {
  "mostShared" = "FireIcon",
  "mostRecent" = "ClockIcon",
  "Actualite&politique" = "AcademicCapIcon",
  "Anime" = "EyeIcon",
  "Cinema" = "FilmIcon",
  "Dessinsanime" = "PhotographIcon",
  "Gaming" = "PuzzleIcon",
  "Humoristes" = "EmojiHappyIcon",
  "Medias&reseauxsociaux" = "GlobeIcon",
  "Memes" = "ChatIcon",
  "Musique" = "MusicNoteIcon",
  "Sport" = "SpeakerphoneIcon",
  "Television" = "DesktopComputerIcon",
}

export enum CategoriesIconColor {
  "mostShared" = "#6565F1",
  "mostRecent" = "#E449A3",
  "Actualite&politique" = "white",
  "Anime" = "#E449A3",
  "Cinema" = "#FF5733",
  "Dessinsanime" = "#E449A3",
  "Gaming" = "#571845",
  "Humoristes" = "#FFC300",
  "Medias&reseauxsociaux" = "#571845",
  "Memes" = "#FF5733",
  "Musique" = "#FF5733",
  "Sport" = "#FFC300",
  "Television" = "#FFC300",
}

export const formatCategory = (category: string): string => {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "");
};

export const getIconNameByCategory = (category: string): string => {
  const formattedCategory = formatCategory(category);
  return CategoriesIconName[formattedCategory as Categories];
};

export const getIconColorByCategory = (category: Categories): string => {
  const formattedCategory = formatCategory(category);
  return CategoriesIconColor[formattedCategory as Categories];
};
