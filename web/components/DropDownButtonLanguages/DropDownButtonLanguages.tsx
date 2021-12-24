import { FR, FR_FLAG, GB, GB_FLAG } from "../../constants/constants";
import { FlagEnum, FlagIcon } from "./FlagIcon/FlagIcon";
import { useRouter } from "next/router";
import { useFlagIcon } from "./FlagIcon/useFlagIcon.hook";

export const DropDownButtonLanguages = () => {
  const { currentFlagIcon, otherFlagIcon } = useFlagIcon();
  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <div tabIndex={0} className="rounded-full">
        <FlagIcon src={currentFlagIcon.src} flag={currentFlagIcon.flag} isDisabled />
      </div>
      <ul tabIndex={1} className="pt-2 shadow menu dropdown-content rounded-full flex-1 justify-between h-100 pt-5">
        <li>
          <FlagIcon src={otherFlagIcon.src} flag={otherFlagIcon.flag} />
        </li>
      </ul>
    </div>
  );
};
