import { useEffect, useState } from "react";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { SearchFilter, useApi } from "../hooks/api/useApi.hook";
import { VozoAppContext } from "./VozoAppContext";

export const useVozoAppProvider = (): VozoAppContext => {
  const { findSoundGif } = useApi();
  const [soundGifs, setSoundgifs] = useState<SoundgifDTO[]>([]);
  const [filters, setFilters] = useState<SearchFilter>({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getSoundgifs = async () => {
      const soundGifs = await findSoundGif({ fulltext: searchText, filters });
      setSoundgifs(soundGifs);
    };
    getSoundgifs();
  }, [searchText, filters]);

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
  };
};
