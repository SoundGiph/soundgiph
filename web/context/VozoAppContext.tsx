import { createContext } from "react";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { User } from "../domain/User.dto";
import { SearchFilter } from "../hooks/api/interfaces";

export interface VozoAppContext {
  soundGifs: SoundgifDTO[];
  onChangeText: (fulltext: string) => void;
  searchText: string;
  setSearchFilters: (filters: SearchFilter) => void;
  isSearchResultEmpty: boolean;
  isLoading: boolean;
  resetState: () => void;
  filters: SearchFilter;
  currentUser: User | undefined;
  isUserLoading: boolean;
  logout: () => void;
  deleteUserAccount: (id: string) => void;
}

const vozoAppContext = {
  soundGifs: [],
  updateSoundGifSearchResults: () => undefined,
  onChangeText: () => undefined,
  searchText: "",
  soundGifsSearchResults: [],
  setSearchFilters: () => undefined,
  isSearchResultEmpty: false,
  isLoading: false,
  resetState: () => undefined,
  filters: {},
  currentUser: undefined,
  isUserLoading: true,
  logout: () => undefined,
  deleteUserAccount: () => undefined,
};

export const VozoAppCTX = createContext<VozoAppContext>(vozoAppContext);
