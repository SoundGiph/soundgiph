import { useEffect, useState, useTransition } from "react";
import { useCookies } from "react-cookie";
import { Stages } from "../constants/constants";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { User } from "../domain/User.dto";
import { SearchFilter } from "../hooks/api/interfaces";
import { FindSoundGifsPayload, useApi } from "../hooks/api/useApi.hook";
import { VozoAppContext } from "./VozoAppContext";

export const useVozoAppProvider = (): VozoAppContext => {
  const { findSoundGif } = useApi(Stages.RUN);
  const { getMe, deleteUser } = useApi(Stages.BUILD);
  const [soundGifs, setSoundgifs] = useState<SoundgifDTO[]>([]);
  const [filters, setFilters] = useState<SearchFilter>({});
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isSearchResultEmpty = Boolean(searchText.length > 3 && soundGifs.length === 0 && !isLoading);
  const [isPending, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isUserLoading, setUserLoading] = useState(true);
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);

  const getSoundgifs = async (payload: FindSoundGifsPayload) => {
    setLoading(true);
    const soundGifs = await findSoundGif(payload);
    setSoundgifs(soundGifs);
    setLoading(false);
  };

  const getCurrentUser = async () => {
    setUserLoading(true);
    console.log("ACCESS_TOKEN", cookies.access_token);
    const user = await getMe(cookies.access_token);
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
    if (!currentUser) getCurrentUser();
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

  const logout = () => {
    removeCookies("access_token");
    setCurrentUser(undefined);
  };

  const deleteUserAccount = async (id: string): Promise<void> => {
    const isDeleted = await deleteUser(id, cookies.access_token);
    if (isDeleted === true) logout();
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
    isUserLoading,
    logout,
    deleteUserAccount,
  };
};
