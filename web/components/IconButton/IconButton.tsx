import { DynamicIcon } from "../DynamicIcon/DynamicIcon";

interface IconButtonProps {
  iconName: string;
  onClick?: () => void;
  modalId?: string;
  ref?: React.RefObject<HTMLLabelElement>;
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, onClick, modalId, ref }) => {
  return (
    <>
      <label className="btn btn-circle btn-ghost" onClick={onClick} htmlFor={modalId} ref={ref}>
        <DynamicIcon icon={iconName} color="#6565F1" size="2x" />
      </label>
    </>
  );
};

export default IconButton;
