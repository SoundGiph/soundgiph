import { Accept, DropzoneState, useDropzone } from "react-dropzone";

export const useCreateVozoModalDropZone = ({
  onDrop,
  accept,
}: {
  onDrop: () => void;
  accept: Accept;
}): DropzoneState => {
  return useDropzone({ onDrop, accept });
};
