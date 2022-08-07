import React from "react";
import { DynamicIcon } from "../DynamicIcon/DynamicIcon";

interface IconButtonProps {
  iconName: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, onClick }) => {
  return (
    <>
      <label className="btn btn-ghost" onClick={onClick} htmlFor="login-modal">
        <DynamicIcon icon={iconName} color="#6565F1" size="2x" />
      </label>
    </>
  );
};

export default IconButton;
