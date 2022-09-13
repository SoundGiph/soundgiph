import Image from "next/image";
interface RoundedImageButtonProps {
  imageSrc?: string;
  onClick?: () => void;
  modalId?: string;
}

const RoundedImageButton: React.FC<RoundedImageButtonProps> = ({ imageSrc, onClick, modalId }) => {
  console.log(imageSrc);
  return (
    <>
      <label className="btn btn-ghost btn-circle" onClick={onClick} htmlFor={modalId}>
        <div className="avatar">
          <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image src={imageSrc || ""} width={500} height={500} />
          </div>
        </div>
      </label>
    </>
  );
};

export default RoundedImageButton;
