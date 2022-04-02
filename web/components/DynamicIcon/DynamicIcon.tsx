import { FC } from "react";
import * as HIcons from "@heroicons/react/solid";

export const DynamicHeroIcon: FC<{ icon: string; color: string }> = props => {
  const { ...icons } = HIcons;
  // @ts-ignore
  const TheIcon: JSX.Element = icons[props.icon];

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className="h-6 w-6" color={props.color} aria-hidden="true" />
    </>
  );
};
