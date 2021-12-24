import { useTranslation } from "react-i18next";
import { FR_FLAG, GB_FLAG } from "../../../constants/constants";
import { FlagEnum, FlagIconProps } from "./FlagIcon";

export const useFlagIcon = (): {
  currentFlagIcon: FlagIconProps;
  otherFlagIcon: FlagIconProps;
  onClickFlagIconItemDropDown: () => void;
} => {
  const { i18n } = useTranslation();
  const isLocaleFr = Boolean(i18n.language === FlagEnum.FR);

  const currentFlagIcon = {
    src: isLocaleFr ? FR_FLAG : GB_FLAG,
    flag: isLocaleFr ? FlagEnum.FR : FlagEnum.GB,
  };

  const otherFlagIcon = {
    src: !isLocaleFr ? FR_FLAG : GB_FLAG,
    flag: !isLocaleFr ? FlagEnum.FR : FlagEnum.GB,
  };

  const onClickFlagIconItemDropDown = (): void => {
    if (!isLocaleFr) {
      i18n.changeLanguage(FlagEnum.FR);
    } else {
      i18n.changeLanguage(FlagEnum.GB);
    }
  };

  return { onClickFlagIconItemDropDown, currentFlagIcon, otherFlagIcon };
};
