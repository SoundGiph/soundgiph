import { Trans, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { AppleLogo } from "../Logos/Apple";
import { GoogleLogo } from "../Logos/Google";
import { WhiteLogo } from "../Logos/WhiteLogo";
import Modal from "../Modal/Modal";
import TextButtonWithIcon from "../TextButtonWithIcon/TextButtonWithIcon";

interface LoginModalProps {}

export const LOGIN_MODAL_ID = "login-modal";

const BUTTON_LINK = "btn-link text-white font-bold";

const LoginModal: React.FC<LoginModalProps> = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const TermsLink: React.FC = () => {
    return (
      <Trans
        i18nKey="login_modal.terms"
        t={t}
        components={[<button className={BUTTON_LINK} onClick={() => push("privacy")} />]}
      />
    );
  };

  const PrivacyLink: React.FC = () => {
    return (
      <Trans
        i18nKey="login_modal.privacy"
        t={t}
        components={[<button className={BUTTON_LINK} onClick={() => push("privacy")} />]}
      />
    );
  };

  return (
    <div>
      <Modal modalId={LOGIN_MODAL_ID}>
        <div className="flex h-full w-full items-center justify-around flex-col ">
          <WhiteLogo />
          <div className="mt-10 mb-5">
            <TextButtonWithIcon label={t("login_modal.button.google")} icon={<GoogleLogo size={30} />} />
            <TextButtonWithIcon label={t("login_modal.button.apple")} icon={<AppleLogo size={30} />} />
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
