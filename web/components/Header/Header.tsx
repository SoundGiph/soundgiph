import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useVozoApp } from "../../context/useVozoApp.hook";
import { CREATE_VOZO_MODAL_ID } from "../CreateVozoModal/CreateVozoModal";
import IconButton from "../IconButton/IconButton";
import { LOGIN_MODAL_ID } from "../LoginModal/LoginModal";
import { WhiteLogo } from "../Logos/WhiteLogo";
import RoundedImageButton from "../RoundedImageButton/RoundedImageButton";
import { SearchSoundGifInput } from "../SearchSoundGifInput/SearchSoundGifInput";
import { SETTINGS_MODAL_ID } from "../SettingsModal/SettingsModal";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();
  const { resetState, currentUser, isUserLoading } = useVozoApp();
  const backHome = () => {
    push("/");
    resetState();
  };

  const isHomeRoute = Object.keys(query).length === 0;
  const isUserLoggedIn = Boolean(currentUser?.id);
  return (
    <div className="sticky top-0 z-50 bg-black p-2 w-full">
      <div className="navbar shadow-lg items-center flex p-0">
        <div>
          <button onClick={backHome}>{isHomeRoute ? <WhiteLogo /> : <IconButton iconName="fa circle-left" />}</button>
        </div>
        <div className="flex-1 justify-end items-center">
          <IconButton modalId={isUserLoggedIn ? CREATE_VOZO_MODAL_ID : LOGIN_MODAL_ID} iconName="fa plus" />
          {isUserLoading ? (
            <div className="h-full flex items-center justify-center">
              <label className="btn btn-ghost btn-circle loading text-xl text-primary" />
            </div>
          ) : currentUser ? (
            <RoundedImageButton imageSrc={currentUser.picture} modalId={SETTINGS_MODAL_ID} />
          ) : (
            <IconButton modalId={LOGIN_MODAL_ID} iconName="fa user" />
          )}
        </div>
      </div>
      <SearchSoundGifInput />
    </div>
  );
};
