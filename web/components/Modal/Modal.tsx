import IconButton from "../IconButton/IconButton";

interface ModalProps {
  modalId: string;
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalId, children, title, onClose }) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <label className=" absolute h-full w-full" htmlFor={modalId} />
        <div className="modal-box text-center bg-black opacity-95">
          <div className="flex flex-row w-full items-center justify-center">
            {/*
            <label
              htmlFor={modalId}
              onClick={onClose}
              className="btn btn-sm btn-circle absolute left-2 border-1 border-primary"
            >
              <p className="text-primary">✕</p>
            </label>
            */}
            <div className="absolute left-0">
              <IconButton iconName="fa xmark" modalId={modalId} onClick={onClose} />
            </div>
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
