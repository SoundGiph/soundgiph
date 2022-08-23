interface RoundedImageButtonProps {
  imageSrc?: string;
  onClick?: () => void;
  modalId?: string;
}

const RoundedImageButton: React.FC<RoundedImageButtonProps> = ({ imageSrc, onClick, modalId }) => {
  return (
    <>
      <label className="btn btn-ghost btn-circle" onClick={onClick} htmlFor={modalId}>
        <div className="avatar">
          <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={imageSrc} />
          </div>
        </div>
      </label>
    </>
  );
};

export default RoundedImageButton;
