import { create } from "apisauce";
import { Categories } from "../../components/SoundGifsList/utils/getCategoriesIconAndColor";
import {
  CREATE_SOUND_GIF,
  FIND_SOUND_GIF_QUERY,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_WITH_SOUNDGIFS,
} from "../../constants/constants";
import { SoundgifDTO } from "../../domain/sound-gif.dto";

export interface SearchFilter {
  category?: string;
  reaction?: string;
  mostShared?: boolean;
  mostRecent?: boolean;
  limit?: boolean;
}

export type CategoriesWithSoundGifs = { name: Categories; soundGifs: SoundgifDTO[] };
interface FindSoundGifsPayload {
  filters?: SearchFilter;
  fulltext?: string;
}

export const useApi = (): {
  findSoundGif: (payload: FindSoundGifsPayload) => Promise<SoundgifDTO[]>;
  createSoundGif: (payload: Omit<SoundgifDTO, "id">) => Promise<SoundgifDTO[]>;
  getAllCategories: () => Promise<string[]>;
  getAllCategoriesWithSoungifs: () => Promise<SoundgifDTO[]>;
} => {
  const api = create({
    baseURL: process.env.NEXT_PUBLIC_RUNNING_TIME_API_URL,
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

  const getAllCategoriesWithSoungifs = async (): Promise<SoundgifDTO[]> => {
    const { data } = await api.get<SoundgifDTO[]>(GET_ALL_CATEGORIES_WITH_SOUNDGIFS);
    console.log(data);
    return data ?? [];
  };

  const getAllCategories = async (): Promise<string[]> => {
    const { data } = await api.get<string[]>(GET_ALL_CATEGORIES);
    return data ?? [];
  };

  return {
    createSoundGif,
    findSoundGif,
    getAllCategoriesWithSoungifs,
    getAllCategories,
  };
};
