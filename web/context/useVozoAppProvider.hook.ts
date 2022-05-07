import { useEffect, useState } from "react";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { FindSoundGifsPayload, SearchFilter, useApi } from "../hooks/api/useApi.hook";
import { VozoAppContext } from "./VozoAppContext";

export const useVozoAppProvider = (): VozoAppContext => {
  const { findSoundGif } = useApi();
  const [soundGifs, setSoundgifs] = useState<SoundgifDTO[]>([]);
  const [filters, setFilters] = useState<SearchFilter>({});
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  console.log(searchText.length);
  console.log(soundGifs.length);
  const isSearchResultEmpty = Boolean(searchText.length > 3 && soundGifs.length === 0 && !isLoading);
  const getSoundgifs = async (payload: FindSoundGifsPayload) => {
    setLoading(true);
    const soundGifs = await findSoundGif(payload);
    setSoundgifs(soundGifs);
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText.length > 3) {
        getSoundgifs({ fulltext: searchText });
      } else setSoundgifs([]);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText.length]);

  useEffect(() => {
    if (filters.category) getSoundgifs({ filters: { category: filters.category } });
  }, [filters.category]);

  const onChangeText = (fulltext: string) => {
    setSearchText(fulltext);
  };

  const setSearchFilters = (filters: SearchFilter) => {
    setFilters(filters);
  };

  return {
    soundGifs,
    onChangeText,
    searchText,
    setSearchFilters,
    isSearchResultEmpty,
    isLoading,
  };
};
