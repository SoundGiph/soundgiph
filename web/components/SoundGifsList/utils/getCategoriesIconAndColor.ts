export enum Categories {
  "mostShared" = "mostShared",
  "mostRecent" = "mostRecent",
  "News" = "News",
  "Anime" = "Anime",
  "Movies" = "Movies",
  "Cartoons" = "Cartoons",
  "Gaming" = "Gaming",
  "Comedy" = "Comedy",
  "Social" = "Social",
  "Memes" = "Memes",
  "Music" = "Music",
  "Sports" = "Sports",
  "TV" = "TV",
  "Search" = "Search",
}

export enum CategoriesIconName {
  "mostShared" = "fas fire",
  "mostRecent" = "fas clock",
  "News" = "fas landmark",
  "Anime" = "fas user-ninja",
  "Movies" = "fas clapperboard",
  "Cartoons" = "fas fort-awesome",
  "Gaming" = "fas gamepad-modern",
  "Comedy" = "fas face-grin-tears",
  "Social" = "fas users",
  "Memes" = "fas face-awesome",
  "Music" = "fas music",
  "Sports" = "fas futbol",
  "TV" = "fas tv",
  "Search" = "fas magnifying-glass",
}

export enum CategoriesIconColor {
  "mostShared" = "#6565F1",
  "mostRecent" = "#E449A3",
  "News" = "white",
  "Anime" = "#E449A3",
  "Movies" = "#FF5733",
  "Cartoons" = "#E449A3",
  "Gaming" = "#571845",
  "Comedy" = "#FFC300",
  "Social" = "#571845",
  "Memes" = "#FF5733",
  "Music" = "#FF5733",
  "Sports" = "#FFC300",
  "TV" = "#FFC300",
  "Search" = "#E449A3",
}

export const getIconNameByCategory = (category: string): string => {
  if (!category) return "";
  return CategoriesIconName[category as Categories];
};

export const getIconColorByCategory = (category: Categories): string => {
  if (!category) return "";
  return CategoriesIconColor[category as Categories];
};
