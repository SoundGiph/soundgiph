import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useVozoApp } from "../../context/useVozoApp.hook";
import IconButton from "../IconButton/IconButton";
import { LOGIN_MODAL_ID } from "../LoginModal/LoginModal";
import { WhiteLogo } from "../Logos/WhiteLogo";
import { SearchSoundGifInput } from "../SearchSoundGifInput/SearchSoundGifInput";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { resetState } = useVozoApp();
  const backHome = () => {
    push("/");
    resetState();
  };

  return (
    <div className="sticky top-0 z-50 bg-black p-2 w-full">
      <div className="navbar shadow-lg items-center flex p-0">
        <div>
          <button onClick={backHome}>
            <WhiteLogo />
          </button>
        </div>
        <div className="flex-1 justify-end items-center">
          <IconButton modalId={LOGIN_MODAL_ID} iconName="fa plus" onClick={() => undefined} />
          <IconButton modalId={LOGIN_MODAL_ID} iconName="fa user" onClick={() => undefined} />
        </div>
      </div>
      <SearchSoundGifInput />
    </div>
  );
};
