import axios from "axios";
import { API, GET_FILE_FROM_URL } from "../../constants/constants";

export const useGetFileFromUrl = (): {
  getFileFromUrl: (url: string) => Promise<File | undefined>;
} => {
  const getFileFromUrl = async (url: string): Promise<File | undefined> => {
    const { data } = await axios.get<File>(`${API}${GET_FILE_FROM_URL}?url=${url}`);
    return data;
  };

  return {
    getFileFromUrl,
  };
};
