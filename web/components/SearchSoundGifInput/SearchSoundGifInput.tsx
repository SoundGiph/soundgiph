import { useTranslation } from "next-i18next";
import { SearchCircleIcon } from "@heroicons/react/solid";

export const SearchSoundGifInput = () => {
  const { t } = useTranslation();
  return (
    <div className="form-control w-full">
      <div className="relative w-11/12 items-center self-center max-w-screen-lg">
        <input
          type="text"
          placeholder={t("search")}
          className="w-full pr-16 h-14 input input-bordered border-indigo-500 max-w bg-neutral text-xl"
        />
        <button className="absolute h-14 top-0 right-0 rounded-l-none btn border-indigo-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <SearchCircleIcon className="h-8 w-8 " />
        </button>
      </div>
    </div>
  );
};
