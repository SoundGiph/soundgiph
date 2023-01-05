import { Trans, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { AppleLogo } from "../Logos/Apple";
import { WhiteLogo } from "../Logos/WhiteLogo";
import Modal from "../Modal/Modal";
import TextButtonWithIcon from "../TextButtonWithIcon/TextButtonWithIcon";

interface LoginModalProps {}

export const LOGIN_MODAL_ID = "login-modal";

const BUTTON_LINK = "btn-link text-white font-bold";
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
const LoginModal: React.FC<LoginModalProps> = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const TermsLink: React.FC = () => {
    return (
      <Trans
        i18nKey="login_modal.terms"
        t={t}
        components={[<button className={BUTTON_LINK} onClick={() => openInNewTab(`${WEB_URL}/terms_of_services`)} />]}
      />
    );
  };

  const PrivacyLink: React.FC = () => {
    return (
      <Trans
        i18nKey="login_modal.privacy"
        t={t}
        components={[<button className={BUTTON_LINK} onClick={() => openInNewTab(`${WEB_URL}/privacy_policy`)} />]}
      />
    );
  };

  // const googleSignin = () => {
  //   window.open(`${process.env.NEXT_PUBLIC_BUILDING_TIME_API_URL}/auth/google`, "_self");
  // };

  const appleSignin = () => {
    window.open(`${process.env.NEXT_PUBLIC_BUILDING_TIME_API_URL}/auth/apple`, "_self");
  };

  return (
    <div>
      <Modal modalId={LOGIN_MODAL_ID}>
        <div className="flex h-full w-full items-center justify-around flex-col ">
          <WhiteLogo />
          <div className="mt-10 mb-5">
            {/* <TextButtonWithIcon
              label={t("login_modal.button.google")}
              icon={<GoogleLogo size={30} />}
              onClick={googleSignin}
            /> */}
            <TextButtonWithIcon
              label={t("login_modal.button.apple")}
              icon={<AppleLogo size={30} />}
              onClick={appleSignin}
            />
          </div>
          <div className="w-4/5 text-center text-sm text-white">
            <p className="text-xs">
              <TermsLink />
              <PrivacyLink />
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
