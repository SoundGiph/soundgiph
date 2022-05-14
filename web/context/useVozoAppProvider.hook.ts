import { useEffect, useRef, useState } from "react";
import { Categories } from "../components/SoundGifsList/utils/getCategoriesIconAndColor";
import { useTransition } from "react";
import { Stages } from "../constants/constants";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { FindSoundGifsPayload, SearchFilter, useApi } from "../hooks/api/useApi.hook";
import { VozoAppContext } from "./VozoAppContext";

export const useVozoAppProvider = (): VozoAppContext => {
  const { findSoundGif } = useApi(Stages.RUN);
  const [soundGifs, setSoundgifs] = useState<SoundgifDTO[]>([]);
  const [filters, setFilters] = useState<SearchFilter>({});
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isSearchResultEmpty = Boolean(searchText.length > 3 && soundGifs.length === 0 && !isLoading);
  const [isPending, startTransition] = useTransition()


  const getSoundgifs = async (payload: FindSoundGifsPayload) => {
    setLoading(true);
    const soundGifs = await findSoundGif(payload);
    setSoundgifs(soundGifs);
    setLoading(false);
  };

  useEffect(() => {
    getSoundgifs({ fulltext: searchText, filters })
  }, [searchText.length, filters]);

  useEffect(() => {
    if (Object.keys(filters).length) getSoundgifs({ filters });
  }, [filters]);

  const onChangeText = (fulltext: string) => {
    setSearchText(fulltext)
  }

  const setSearchFilters = (filters: SearchFilter) => {
    startTransition(() => setFilters(filters));
  };

  const resetState = () => {
    setLoading(true);
    setFilters({});
    setSearchText("");
    setSoundgifs([]);
    setLoading(false);
  };

  return {
    soundGifs,
    onChangeText,
    searchText,
    setSearchFilters,
    isSearchResultEmpty,
    isLoading,
    resetState,
  };
};
