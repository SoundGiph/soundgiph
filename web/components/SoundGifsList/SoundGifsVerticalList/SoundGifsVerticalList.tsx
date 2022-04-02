import Link from "next/link";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { DynamicHeroIcon } from "../../DynamicIcon/DynamicIcon";
import { SoundGifItem } from "../SoundGifItem/SoundGifItem";

type SoundGifsListProps = {
  soundGifs: SoundgifDTO[];
  title: string;
  icon: string;
  color: string;
};

export const SoundGifsVerticalList: React.FC<SoundGifsListProps> = ({ soundGifs, title, icon, color }) => {
  if (!soundGifs) return null;
  return (
    <div className="w-full h-full mt-5">
      <div className="mx-3 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start">
          <DynamicHeroIcon icon={icon} color={color} />
          <p className="font-bold text-lg ml-2 text-white">{title}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 grid-flow-row overflow-y-scroll scrollbar-thumb-white scrollbar-track-white-100">
        {soundGifs.map(soundGif => {
          return <SoundGifItem soundGif={soundGif} small />;
        })}
      </div>
    </div>
  );
};
