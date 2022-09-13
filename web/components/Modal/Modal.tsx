interface ModalProps {
  modalId: string;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLLabelElement>;
  title?: string;
  onClose?: () => void;
  popup?: React.ReactNode;
  canGoBack?: boolean;
  onPushGoBack?: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalId, children, title, onClose, popup, canGoBack, onPushGoBack }) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        {popup}
        <label className="absolute h-full w-full" htmlFor={modalId} />
        <div className="modal-box text-center bg-black opacity-95">
          <div className="flex flex-row w-full items-center justify-center">
            {canGoBack ? (
              <button onClick={onPushGoBack} className="btn btn-sm btn-circle absolute left-2 border-1">
                <p>{"<"}</p>
              </button>
            ) : (
              <label htmlFor={modalId} onClick={onClose} className="btn btn-sm btn-circle absolute left-2 border-1">
                <p>✕</p>
              </label>
            )}
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
            </div>
          </div>
          <div className="modal-action">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
