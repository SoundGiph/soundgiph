import { useTranslation } from "next-i18next";
import React from "react";
import Modal from "../Modal/Modal";
import { SoundGifItem } from "../SoundGifsList/SoundGifItem/SoundGifItem";
import { CustomDropZone, DropZoneType } from "./CustomDropZone/CustomDropZone";
import { FormInput } from "./FormInput/FormInput";
import { Steps } from "./Steps/Steps";
import { CreateVozoFormFields, StepsToAddVozo, useCreateVozoForm } from "./useCreateVozoForm.hook";

interface CreateVozoModalProps { }

export const CREATE_VOZO_MODAL_ID = "create-vozo-modal";

const CreateVozoModal: React.FC<CreateVozoModalProps> = () => {
  const { t } = useTranslation();

  const {
    dropZoneAudioState,
    onSubmit,
    steps,
    form,
    onPushGoBack,
    dropZoneImageState,
    onPressValidateTitleAndDescriptions,
  } = useCreateVozoForm();
  const formValues = form.getValues();

  return (
    <div>
      <Modal
        modalId={CREATE_VOZO_MODAL_ID}
        title={t("create_vozo_modal.title")}
        canGoBack={Boolean(steps > StepsToAddVozo.UPLOAD_AUDIO)}
        onPushGoBack={onPushGoBack}
      >
        <div className="flex h-full w-full items-center justify-around flex-col">
          <Steps steps={steps} />
          {steps === StepsToAddVozo.UPLOAD_AUDIO ? (
            <CustomDropZone
              dropZoneState={dropZoneAudioState}
              dropZoneType={DropZoneType.AUDIO} />
          ) : steps === StepsToAddVozo.ADD_DESCRIPTION ? (
            <>
              <FormInput
                name={CreateVozoFormFields.TITLE}
                form={form}
                title="Titre"
                placeHolder={"Donne un titre à ton vozo"}
              />
              <FormInput
                form={form}
                name={CreateVozoFormFields.DESCRIPTION}
                title="Description"
                placeHolder={"Indique qui parle dans ton Vozo"}
              />
              <button className="btn btn-primary w-full max-w-xs mt-5" onClick={onPressValidateTitleAndDescriptions}>
                Valider
              </button>
            </>
          ) : steps === StepsToAddVozo.UPLOAD_IMAGE ? (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full w-full items-center justify-around flex-col"
            >
              {form.formState.isValid && form.getValues().imageFile ? (
                <SoundGifItem
                  soundGif={{
                    id: "vozo-preview",
                    title: formValues.title,
                    description: formValues.description,
                    imageUrl: formValues?.imageFile ? URL.createObjectURL(formValues?.imageFile) : "",
                    audioUrl: formValues?.audioFile ? URL.createObjectURL(formValues?.audioFile) : "",
                  }}
                />
              ) : (
                <CustomDropZone
                  dropZoneState={dropZoneImageState}
                  dropZoneType={DropZoneType.IMAGE} />
              )}
              <button className="btn btn-secondary w-full max-w-xs mt-5" disabled={!form.formState.isValid}>
                Publier
              </button>
            </form>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default CreateVozoModal;
