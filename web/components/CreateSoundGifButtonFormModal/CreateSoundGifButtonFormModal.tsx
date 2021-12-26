import { useTranslation } from "react-i18next";
import { CreateSoundGifFormInput } from "./CreateSoundGifFormInput/CreateSoundGifFormInput";
import { TagInput } from "./CreateSoundGifFormTagsInput/CreateSoundGifFormTagsInput";

export const CreateSoundGifButtonFormModal = () => {
  const { t } = useTranslation();
  return (
    <div>
      <label htmlFor="my-modal-2" className="btn btn-primary modal-button">
        {t("home.upload")}
      </label>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="form-control">
            <CreateSoundGifFormInput label={t("home.create_sound_gif_form.title")} />
            <CreateSoundGifFormInput label={t("home.create_sound_gif_form.description")} isTextArea />
            <TagInput />
          </div>
          <div className="modal-action">
            <label className="btn btn-primary">{t("upload")}</label>
            <label htmlFor="my-modal-2" className="btn">
              {t("home.close_modal_button")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
