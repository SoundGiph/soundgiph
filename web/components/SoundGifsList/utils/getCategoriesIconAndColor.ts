export enum Categories {
  "MostShared" = "MostShared",
  "MostRecent" = "MostRecent",
  "News" = "News",
  "Anime" = "Anime",
  "Movies" = "Movies",
  "Cartoons" = "Cartoons",
  "Gaming" = "Gaming",
  "Comedy" = "Comedy",
  "Social" = "Social",
  "Memes" = "Memes",
  "Music" = "Music",
  "Sport" = "Sport",
  "TV" = "TV",
  "Search" = "Search",
}

export enum CategoriesIconName {
  "MostShared" = "fa-brands fa-hotjar",
  "MostRecent" = "fa-solid fa-clock",
  "News" = "fa-solid fa-landmark",
  "Anime" = "fa-solid fa-user-ninja",
  "Movies" = "fa-solid fa-camera-movie",
  "Cartoons" = "fa-brands fa-fort-awesome",
  "Gaming" = "fa-solid fa-gamepad-modern",
  "Comedy" = "fa-solid fa-face-grin-tears",
  "Social" = "fa-solid fa-users",
  "Memes" = "fa-solid fa-face-awesome",
  "Music" = "fa-solid fa-music",
  "Sport" = "fa-solid fa-futbol",
  "TV" = "fa-solid fa-tv-retro",
  "Search" = "fa-solid fa-magnifying-glass",
}

export enum CategoriesIconColor {
  "MostShared" = "#6565F1",
  "MostRecent" = "#E449A3",
  "News" = "white",
  "Anime" = "#E449A3",
  "Movies" = "#FF5733",
  "Cartoons" = "#E449A3",
  "Gaming" = "#571845",
  "Comedy" = "#FFC300",
  "Social" = "#571845",
  "Memes" = "#FF5733",
  "Music" = "#FF5733",
  "Sport" = "#FFC300",
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
