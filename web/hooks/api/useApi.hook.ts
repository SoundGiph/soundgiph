import { create } from "apisauce";
import { CREATE_SOUND_GIF, FIND_SOUND_GIF_QUERY } from "../../constants/constants";
import { SoundgifDTO } from "../../domain/sound-gif.dto";

export interface SearchFilter {
  category?: string;
  reaction?: string;
  mostShared?: boolean;
  mostRecent?: boolean;
  limit?: boolean;
}

interface FindSoundGifsPayload {
  filters?: SearchFilter;
  fulltext?: string;
}

export const useApi = (
  runningTimeApiUrl: string
): {
  findSoundGif: (payload: FindSoundGifsPayload) => Promise<SoundgifDTO[]>;
  createSoundGif: (payload: Omit<SoundgifDTO, "id">) => Promise<SoundgifDTO[]>;
  getAllCategories: () => string[];
} => {
  const api = create({
    baseURL: runningTimeApiUrl,
  });

  const createSoundGif = async (payload: Omit<SoundgifDTO, "id">): Promise<SoundgifDTO[]> => {
    const { data } = await api.post<SoundgifDTO[]>(CREATE_SOUND_GIF, payload);
    return data ?? [];
  };

  const findSoundGif = async (payload: FindSoundGifsPayload): Promise<SoundgifDTO[]> => {
    const { fulltext, filters } = payload;
    const { data } = await api.post<SoundgifDTO[]>(FIND_SOUND_GIF_QUERY, {
      fulltext,
      filters,
    });
    return data ?? [];
  };

  const getAllCategories = () => {
    return ["mostShared", "mostRecent"];
  };

  return {
    createSoundGif,
    findSoundGif,
    getAllCategories,
  };
};
