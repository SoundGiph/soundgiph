import { useRouter } from "next/router";
import { FR_FLAG, GB_FLAG } from "../../../constants/constants";
import { FlagEnum, FlagIconProps } from "./FlagIcon";

export const useFlagIcon = (): {
  currentFlagIcon: FlagIconProps;
  otherFlagIcon: FlagIconProps;
  onClickFlagIconItemDropDown: () => void;
} => {
  const {push, locale} = useRouter()
  const isLocaleFr = Boolean(locale === FlagEnum.FR);

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
      push("/fr", undefined, { locale: false })
    } else {
      push("/en", undefined, { locale: false })
    }
  };

  return { onClickFlagIconItemDropDown, currentFlagIcon, otherFlagIcon };
};
