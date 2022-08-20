import { DynamicIcon } from "../DynamicIcon/DynamicIcon";

interface IconButtonProps {
  iconName: string;
  onClick?: () => void;
  modalId?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, onClick, modalId }) => {
  return (
    <>
      <label className="btn btn-ghost" onClick={onClick} htmlFor={modalId}>
        <DynamicIcon icon={iconName} color="#6565F1" size="2x" />
      </label>
    </>
  );
};

export default IconButton;
