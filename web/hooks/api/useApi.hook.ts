import { create } from "apisauce";
import { useCookies } from "react-cookie";
import { CreateVozoForm } from "../../components/CreateVozoModal/useCreateVozoForm.hook";
import { Categories } from "../../components/SoundGifsList/utils/getCategoriesIconAndColor";
import {
  CREATE_SOUND_GIF,
  CREATE_SOUND_GIF_TO_APPROVE,
  DELETE_USER,
  FIND_SOUND_GIF_QUERY,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_WITH_SOUNDGIFS,
  GET_ME,
  INCREMENT_SHARED_COUNT,
  Stages,
} from "../../constants/constants";
import { SoundgifDTO } from "../../domain/sound-gif.dto";
import { User } from "../../domain/User.dto";
import { SearchFilter } from "./interfaces";

export type CategoriesWithSoundGifs = { name: Categories; soundGifs: SoundgifDTO[] };
export interface FindSoundGifsPayload {
  filters?: SearchFilter;
  fulltext?: string;
}

export interface IncrementSharedCountPayload {
  id: string;
}

interface UseApiOutput {
  findSoundGif: (payload: FindSoundGifsPayload) => Promise<SoundgifDTO[]>;
  createSoundGif: (payload: Omit<SoundgifDTO, "id">) => Promise<SoundgifDTO[]>;
  getAllCategories: () => Promise<string[]>;
  getAllCategoriesWithSoungifs: () => Promise<SoundgifDTO[]>;
  incrementSharedCount: (payload: IncrementSharedCountPayload) => Promise<void>;
  getMe: (access_token: string) => Promise<User | undefined>;
  deleteUser: (id: string, access_token: string) => Promise<boolean>;
  createSoundGifToApprove: (payload: CreateVozoForm) => Promise<boolean>;
}

const buildBearerHeader = (access_token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
};

export const useApi = (stage: Stages): UseApiOutput => {
  const api = create({
    baseURL:
      stage === Stages.RUN
        ? process.env.NEXT_PUBLIC_RUNNING_TIME_API_URL
        : process.env.NEXT_PUBLIC_BUILDING_TIME_API_URL,
  });

  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
  const createSoundGif = async (payload: Omit<SoundgifDTO, "id">): Promise<SoundgifDTO[]> => {
    const { data } = await api.post<SoundgifDTO[]>(CREATE_SOUND_GIF, payload);
    return data ?? [];
  };

  const createSoundGifToApprove = async (payload: CreateVozoForm): Promise<boolean> => {
    const { title, description, audioFile, imageFile, userId } = payload;
    const formData = new FormData();
    formData.append("audioFile", audioFile);
    formData.append("imageFile", imageFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("addedBy", userId);
    const { data } = await api.post<boolean>(
      CREATE_SOUND_GIF_TO_APPROVE,
      formData,
      buildBearerHeader(cookies.access_token)
    );
    return Boolean(data);
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
    return data ?? [];
  };

  const getMe = async (access_token: string): Promise<User | undefined> => {
    const { data, status } = await api.get<User>(GET_ME, {}, buildBearerHeader(access_token));
    if (status === 200) return data;
    return undefined;
  };

  const getAllCategories = async (): Promise<string[]> => {
    const { data } = await api.get<string[]>(GET_ALL_CATEGORIES);
    return data ?? [];
  };

  const deleteUser = async (id: string, access_token: string): Promise<boolean> => {
    const { data } = await api.get<boolean>(
      DELETE_USER,
      {
        id,
      },
      buildBearerHeader(access_token)
    );
    return data || false;
  };

  const incrementSharedCount = async (payload: IncrementSharedCountPayload): Promise<void> => {
    await api.post<void>(INCREMENT_SHARED_COUNT, payload);
  };

  return {
    deleteUser,
    getMe,
    createSoundGif,
    findSoundGif,
    getAllCategoriesWithSoungifs,
    createSoundGifToApprove,
    getAllCategories,
    incrementSharedCount,
  };
};
