import { create } from "apisauce";
import { API, FIND_SOUND_GIF_QUERY } from "../constants/constants";
import { SoundgifDTO } from "../domain/sound-gif.dto";

export const useApi = (): {
  findSoundGif: (fulltext: string) => Promise<SoundgifDTO[]>;
  findMostRecentSoundGif: (fulltext: string) => Promise<SoundgifDTO[]>;
  findMostSharedSoundGif: (fulltext: string) => Promise<SoundgifDTO[]>;
} => {
  const api = create({
    baseURL: API,
  });

  // start making calls
  const findSoundGif = async (fulltext: string): Promise<SoundgifDTO[]> => {
    const { data } = await api.post<SoundgifDTO[]>(FIND_SOUND_GIF_QUERY, {
      fulltext,
    });
    return data ?? [];
  };

  const findMostRecentSoundGif = async (
    fulltext: string
  ): Promise<SoundgifDTO[]> => {
    const { data } = await api.post<SoundgifDTO[]>(FIND_SOUND_GIF_QUERY, {
      fulltext,
    });
    return data ?? [];
  };

  const findMostSharedSoundGif = async (
    fulltext: string
  ): Promise<SoundgifDTO[]> => {
    const { data } = await api.post<SoundgifDTO[]>(FIND_SOUND_GIF_QUERY, {
      fulltext,
    });
    return data ?? [];
  };

  return {
    findSoundGif,
    findMostRecentSoundGif,
    findMostSharedSoundGif,
  };
};
