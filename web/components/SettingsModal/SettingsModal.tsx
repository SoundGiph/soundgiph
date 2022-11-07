import { useTranslation } from "next-i18next";
import React, { useRef } from "react";
import { useVozoApp } from "../../context/useVozoApp.hook";
import { DynamicIcon } from "../DynamicIcon/DynamicIcon";
import Modal from "../Modal/Modal";
import { ModalPopUp } from "../ModalPopUp/ModalPopUp";
import { useModalPopup } from "../ModalPopUp/useModalPopUp.hook";
import TextButtonWithIcon from "../TextButtonWithIcon/TextButtonWithIcon";

interface SettingsModalProps {}

export const SETTINGS_MODAL_ID = "settings-modal";
export const DELETE_USER_POPUP_ID = "delete-user-popup";
export const LOGOUT_USER_POPUP_ID = "logout--user-popup";

const SettingsModal: React.FC<SettingsModalProps> = () => {
  const { t } = useTranslation();
  const { logout, currentUser, deleteUserAccount } = useVozoApp();
  const deleteUserModalPopup = useRef<HTMLLabelElement>(null);
  const { isVisible: isDeletePopupIsVisible, openOrCloseModalPopup: openOrCloseDeletePopup } = useModalPopup();
  const { isVisible: isLogoutPopupIsVisible, openOrCloseModalPopup: openOrCloseLogoutPopup } = useModalPopup();
  if (!currentUser) return null;

  const onClickDeleteAccount = () => {
    deleteUserAccount(currentUser?.id);
  };

  return (
    <div>
      <Modal
        modalId={SETTINGS_MODAL_ID}
        title={t("settings_modal.title")}
        popup={
          <>
            <ModalPopUp
              modalId={DELETE_USER_POPUP_ID}
              title={t("settings_modal_popup.title")}
              content={t("settings_modal_popup.content")}
              validateLabel={t("settings_modal.delete")}
              cancelLabel={t("settings_modal_popup.cancel")}
              isVisible={isDeletePopupIsVisible}
              openOrCloseModalPopup={openOrCloseDeletePopup}
              onClickCancel={openOrCloseDeletePopup}
              onClickValidate={onClickDeleteAccount}
            />
            <ModalPopUp
              modalId={LOGOUT_USER_POPUP_ID}
              title={t("settings_modal_popup.title")}
              content={t("settings_modal_popup.content")}
              validateLabel={t("settings_modal.logout")}
              cancelLabel={t("settings_modal_popup.cancel")}
              isVisible={isLogoutPopupIsVisible}
              openOrCloseModalPopup={openOrCloseLogoutPopup}
              onClickCancel={openOrCloseLogoutPopup}
              onClickValidate={logout}
            />
          </>
        }
      >
        <div className="flex h-full w-full items-center justify-around flex-col ">
          <div className="mt-10 mb-5 w-full">
            <TextButtonWithIcon
              label={t("settings_modal.logout")}
              icon={<DynamicIcon icon="fa power-off" color="#6565F1" />}
              onClick={openOrCloseLogoutPopup}
            />
            <TextButtonWithIcon
              label={t("settings_modal.delete")}
              icon={<DynamicIcon icon="fa user-xmark" color="#ED4337" />}
              onClick={openOrCloseDeletePopup}
            />
            <label htmlFor={DELETE_USER_POPUP_ID} ref={deleteUserModalPopup} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsModal;
