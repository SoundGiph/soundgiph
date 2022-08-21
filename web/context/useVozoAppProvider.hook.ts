import { useEffect, useState, useTransition } from "react";
import { Stages } from "../constants/constants";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { User } from "../domain/User.dto";
import { SearchFilter } from "../hooks/api/interfaces";
import { FindSoundGifsPayload, useApi } from "../hooks/api/useApi.hook";
import { VozoAppContext } from "./VozoAppContext";

export const useVozoAppProvider = (): VozoAppContext => {
  const { findSoundGif } = useApi(Stages.RUN);
  const { getMe } = useApi(Stages.BUILD);
  const [soundGifs, setSoundgifs] = useState<SoundgifDTO[]>([]);
  const [filters, setFilters] = useState<SearchFilter>({});
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isSearchResultEmpty = Boolean(searchText.length > 3 && soundGifs.length === 0 && !isLoading);
  const [isPending, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isUserLoading, setUserLoading] = useState(false);

  const getSoundgifs = async (payload: FindSoundGifsPayload) => {
    setLoading(true);
    const soundGifs = await findSoundGif(payload);
    setSoundgifs(soundGifs);
    setLoading(false);
  };

  const getCurrentUser = async () => {
    setUserLoading(true);
    const user = await getMe();
    console.log("GET ME ", user);
    setCurrentUser(user);
    setUserLoading(false);
  };

  useEffect(() => {
    getSoundgifs({ fulltext: searchText, filters });
  }, [searchText.length, filters]);

  useEffect(() => {
    if (Object.keys(filters).length) getSoundgifs({ filters });
  }, [filters]);

  useEffect(() => {
    console.log("GET CURRENT USER");
    getCurrentUser();
  }, []);

  const onChangeText = (fulltext: string) => {
    setSearchText(fulltext);
  };

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
    filters,
    currentUser,
  };
};
