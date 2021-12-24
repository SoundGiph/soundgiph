import { useFlagIcon } from "./useFlagIcon.hook";

export enum FlagEnum {
  FR = "fr",
  GB = "en",
}

export type FlagIconProps = {
  src: string;
  flag: FlagEnum;
  isDisabled?: boolean;
};

export const FlagIcon = (props: FlagIconProps) => {
  const { src, isDisabled } = props;
  const { onClickFlagIconItemDropDown } = useFlagIcon();
  return (
    <button
      className="avatar p-1 rounded-full btn-ghost bg-neutral"
      onClick={isDisabled ? undefined : onClickFlagIconItemDropDown}
    >
      <div className="rounded-full w-6 h-6">
        <img src={src} className="rounded-full" />
      </div>
    </button>
  );
};
