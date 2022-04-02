import React from "react";
import { useTranslation } from "react-i18next";
import Konami from "react-konami-code";
import { CHEAT_CODE } from "../../constants/constants";
import { WhiteLogo } from "../Logos/WhiteLogo";
import { SearchSoundGifInput } from "../SearchSoundGifInput/SearchSoundGifInput";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="sticky top-0 z-50 bg-black py-2 w-full">
      <div className="navbar shadow-lg items-center flex">
        <div className="px-3">
          <WhiteLogo />
        </div>
        <div className="flex-1 justify-end items-center">
          <Konami code={CHEAT_CODE} className="ml-2">
            <button className="btn btn-outline btn-secondary self-end">{t("upload")}</button>
          </Konami>
        </div>
      </div>
      <SearchSoundGifInput />
    </div>
  );
};
