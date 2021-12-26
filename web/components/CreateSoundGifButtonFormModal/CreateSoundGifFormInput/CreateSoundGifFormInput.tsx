import { useTranslation } from "react-i18next";

type CreateSoundGifFormInputProps = {
  label: string;
  isTextArea?: boolean;
};

export const CreateSoundGifFormInput = (props: CreateSoundGifFormInputProps) => {
  const { label, isTextArea } = props;

  return (
    <>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {isTextArea ? (
        <textarea className="textarea h-24 textarea-bordered textarea-primary" placeholder={label} />
      ) : (
        <input type="text" placeholder={label} className="input input-primary input-bordered" />
      )}
    </>
  );
};
