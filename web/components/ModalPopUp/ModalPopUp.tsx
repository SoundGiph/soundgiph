import { UseModalPopupOutput } from "./useModalPopUp.hook";

export interface ModalPopUpProps extends UseModalPopupOutput {
  modalId: string;
  title: string;
  content: string;
  validateLabel: string;
  cancelLabel: string;
  onClickValidate?: () => void;
  onClickCancel?: () => void;
}

export const ModalPopUp: React.FC<ModalPopUpProps> = ({
  modalId,
  title,
  content,
  validateLabel,
  cancelLabel,
  isVisible,
  onClickCancel,
  onClickValidate,
  openOrCloseModalPopup,
}) => {
  if (!isVisible) return null;
  return (
    <div className="h-screen w-screen absolute flex items-center justify-center z-50">
      <div className="h-screen w-screen opacity-80 absolute bg-black"></div>
      <div className="card bg-black w-4/6">
        <div className="card-body bg-neutral">
          <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={openOrCloseModalPopup}>
            ✕
          </label>
          <h3 className="card title text-md font-bold text-center">{title}</h3>
          <p className="py-4 text-center text-xs">{content}</p>
          <div className="h-full w-full flex-col">
            <button className="btn btn-sm btn-primary w-full mb-2 rounded text-xs" onClick={onClickValidate}>
              {validateLabel}
            </button>
            <button className="btn btn-sm btn-outline btn-primary bg-neutral w-full text-xs" onClick={onClickCancel}>
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
