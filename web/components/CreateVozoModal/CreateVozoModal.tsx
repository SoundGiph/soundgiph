import { useTranslation } from "next-i18next";
import React from "react";
import Dropzone, { DropzoneState } from "react-dropzone";
import { DynamicIcon } from "../DynamicIcon/DynamicIcon";
import Modal from "../Modal/Modal";
import { StepsToAddVozo } from "./useCreateVozoForm.hook";

interface CreateVozoModalProps {}

interface CustomDropZoneProps {
  onDrop: () => void;
  dropZoneState: DropzoneState;
}

export const CREATE_VOZO_MODAL_ID = "create-vozo-modal";

export const CustomDropZone: React.FC<CustomDropZoneProps> = ({ dropZoneState, onDrop }) => {
  const { t } = useTranslation();
  const { getInputProps, getRootProps } = dropZoneState;
  return (
    <Dropzone onDrop={onDrop}>
      {() => (
        <section>
          <div
            {...getRootProps()}
            className="flex border-2 border-dashed border-primary justify-around items-center w-full h-2/6 bg-neutral p-5 rounded-xl flex-col"
          >
            <input {...getInputProps()} />
            <DynamicIcon icon="fa upload" color="#6565F1" size="2x" />
            <p className="mt-4">
              <>{t("create_vozo_modal.drop_box.label")}</>
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export const Steps: React.FC<{ steps: number }> = ({ steps }) => {
  const DEFAULT_STEPS = 3;
  return (
    <ul className="steps mb-5">
      {Array.from(Array(DEFAULT_STEPS)).map((value, index) => {
        return <li className={`step ${index + 1 <= steps ? "step-primary" : ""}`} />;
      })}
    </ul>
  );
};

export const FormInput: React.FC<{ title: string; placeHolder: string; value: string; onChange: () => void }> = ({
  title,
  placeHolder,
  value,
  onChange,
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
      <input
        type="text"
        placeholder={placeHolder}
        className="input input-bordered w-full max-w-xs"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const CreateVozoForm: React.FC<{
  title: string;
  placeholder: string;
  formValue: string;
}> = ({ title, placeholder, formValue }) => {
  const DEFAULT_STEPS = 3;

  return (
    <>
      <FormInput title="titre" placeHolder={placeholder} value={title} onChange={() => setValue(formValue)} />
    </>
  );
};

const CreateVozoModal: React.FC<CreateVozoModalProps> = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { dropZoneAudioState, onSubmit, onDropAudioFile, steps, watch, selectedFileAudio, onPushGoBack, form } =
    useCreateVozoForm();
  return (
    <div>
      <Modal
        modalId={CREATE_VOZO_MODAL_ID}
        title={t("create_vozo_modal.title")}
        canGoBack={Boolean(steps > 1)}
        onPushGoBack={onPushGoBack}
      >
        <div className="flex h-full w-full items-center justify-around flex-col ">
          <Steps steps={steps} />
          {steps === StepsToAddVozo.UPLOAD_AUDIO ? (
            <CustomDropZone onDrop={onDropAudioFile} dropZoneState={dropZoneAudioState} />
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default CreateVozoModal;
