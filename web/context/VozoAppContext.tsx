import { createContext } from "react";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { SearchFilter } from "../hooks/api/useApi.hook";

export interface VozoAppContext {
  soundGifs: SoundgifDTO[];
  onChangeText: (fulltext: string) => void;
  searchText: string;
  setSearchFilters: (filters: SearchFilter) => void;
}

const vozoAppContext = {
  soundGifs: [],
  updateSoundGifSearchResults: () => undefined,
  onChangeText: () => undefined,
  searchText: "",
  soundGifsSearchResults: [],
  setSearchFilters: () => undefined,
};

export const VozoAppCTX = createContext<VozoAppContext>(vozoAppContext);
