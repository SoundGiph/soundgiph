import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLookup, IconDefinition, findIconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";
interface DynamicIconProps {
  icon: string;
  color: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ icon, color }) => {
  if (!icon || !color) return null;
  const name = icon.split(" ")[1];
  console.log(name);
  return <FontAwesomeIcon icon={["fas", name as IconName]} color={color} />;
};
