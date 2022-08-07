import { IconName, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface DynamicIconProps {
  icon: string;
  color?: string;
  size: SizeProp | undefined;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ icon, color, size }) => {
  if (!icon || !color) return null;
  const name = icon.split(" ")[1];
  return <FontAwesomeIcon icon={["fas", name as IconName]} color={color} size={size} />;
};
