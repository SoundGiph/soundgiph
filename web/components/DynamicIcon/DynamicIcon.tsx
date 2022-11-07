import { IconName, IconPrefix, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface DynamicIconProps {
  icon: string;
  color?: string;
  size?: SizeProp | undefined;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ icon, color, size }) => {
  if (!icon || !color) return null;
  const prefix = icon.split(" ")[0] as IconPrefix;
  const name = icon.split(" ")[1] as IconName;
  return <FontAwesomeIcon icon={[prefix, name]} color={color} size={size} />;
};
