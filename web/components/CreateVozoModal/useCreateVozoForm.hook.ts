import { useEffect, useState } from "react";
import { DropzoneState, FileWithPath } from "react-dropzone";
import { useForm, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useCreateVozoModalDropZone } from "./useCreateVozoModalDropZone";

export enum StepsToAddVozo {
  UPLOAD_AUDIO = 1,
  ADD_DESCRIPTION = 2,
  UPLOAD_IMAGE = 3,
}

export interface CreateVozoForm {
  audioFile: File;
}

interface UseCreateVozoFormOutput {
  onDropAudioFile: () => void;
  onSubmit: (data: CreateVozoForm) => void;
  dropZoneAudioState: DropzoneState;
  steps: number;
  watch: UseFormWatch<CreateVozoForm>;
  selectedFileAudio: FileWithPath | null;
  onPushGoBack: () => void;
  setValue: UseFormSetValue<CreateVozoForm>;
}

export const useCreateVozoForm = (): UseCreateVozoFormOutput => {
  const [selectedFileAudio, setSelectedFileAudio] = useState<FileWithPath | null>(null);
  const [steps, setSteps] = useState<StepsToAddVozo>(StepsToAddVozo.UPLOAD_AUDIO);
  const { setValue, watch } = useForm<CreateVozoForm>();

  const onDropAudioFile = () => {
    console.log("DROP", acceptedFiles);
    setValue("audioFile", acceptedFiles[0]);
  };

  const dropZoneAudioState = useCreateVozoModalDropZone({
    onDrop: onDropAudioFile,
    accept: {
      "audio/aac": [".aac"],
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
    },
  });

  const { acceptedFiles, fileRejections } = dropZoneAudioState;
  console.log("rejected", fileRejections);
  console.log("accepted", acceptedFiles);

  useEffect(() => {
    if (acceptedFiles[0]) {
      setSelectedFileAudio(acceptedFiles[0]);
      setSteps(StepsToAddVozo.ADD_DESCRIPTION);
    }
  }, [acceptedFiles]);

  const onSubmit = (data: CreateVozoForm) => {
    console.log(data);
  };

  const onPushGoBack = () => {
    setSteps(previousSteps => previousSteps - 1);
  };

  return {
    onDropAudioFile,
    onSubmit,
    dropZoneAudioState,
    steps,
    watch,
    selectedFileAudio,
    onPushGoBack,
    setValue,
  };
};
