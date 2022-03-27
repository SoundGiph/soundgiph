import { useTranslation } from "next-i18next";
import Link from "next/link";
<<<<<<< HEAD
import { useRouter } from "next/router";
=======
>>>>>>> b570a81 (feature(list): added link to redirect user)
import { ReactNode } from "react";
import { SoundgifDTO } from "../../domain/sound-gif.dto";
import { DynamicHeroIcon } from "../DynamicIcon/DynamicIcon";
import { SoundGifItem } from "./SoundGifItem/SoundGifItem";

type SoundGifsListProps = {
  soundGifs: SoundgifDTO[];
  title: string;
  icon: string;
  color: string;
};

export const SoundGifsList: React.FC<SoundGifsListProps> = ({ soundGifs, title, icon, color }) => {
  if (!soundGifs) return null;
  const { t } = useTranslation();
  const { push } = useRouter();
  const onClick = () => {
    push({ pathname: `/categories/${title}`, query: { title, icon, color } });
  };
  return (
    <div className="w-full h-full mt-5">
      <div className="mx-3 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start">
          <DynamicHeroIcon icon={icon} color={color} />
          <p className="font-bold text-lg ml-2 text-white">{title}</p>
        </div>
        <button onClick={onClick} className="font-bold text-stone-300 text-xs">
          {t("see_more")}
        </button>
      </div>
      <div className="grid sm:grid-rows-3 lg:grid-rows-2 grid-flow-col overflow-y-scroll scrollbar-thumb-white scrollbar-track-white-100 justify-start">
        {soundGifs.map(soundGif => {
          return <SoundGifItem soundGif={soundGif} small />;
        })}
      </div>
    </div>
  );
};
