import { SearchCircleIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { useVozoApp } from "../../context/useVozoApp.hook";

export const SearchSoundGifInput: React.FC = () => {
  const { t } = useTranslation();
  const { searchText, onChangeText } = useVozoApp();

  return (
    <div className="form-control w-full">
      <div className="relative w-11/12 items-center self-center max-w-screen-lg">
        <input
          type="text"
          value={searchText}
          placeholder={t("search")}
          className="w-full pr-16 h-14 input input-bordered border-indigo-500 max-w bg-neutral text-xl"
          onChange={event => onChangeText(event.target.value)}
        />
        <button className="absolute h-14 top-0 right-0 rounded-l-none btn border-indigo-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <SearchCircleIcon className="h-8 w-8 " />
        </button>
      </div>
    </div>
  );
};
