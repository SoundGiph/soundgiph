import Link from "next/link";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { SoundGifItem } from "../SoundGifItem/SoundGifItem";

type SoundGifsListProps = {
  soundGifs: SoundgifDTO[];
  title: string;
  icon: ReactNode;
};

export const SoundGifsVerticalList: React.FC<SoundGifsListProps> = ({ soundGifs, title, icon }) => {
  if (!soundGifs) return null;

  const { t } = useTranslation();
  return (
    <div className="w-full h-full my-3">
      <div className="mx-3 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start">
          {icon}
          <p className="font-bold text-lg ml-2 text-white">{title}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-flow-col overflow-scroll scrollbar-thumb-white scrollbar-track-white-100">
        {soundGifs.map(soundGif => {
          return <SoundGifItem soundGif={soundGif} small />;
        })}
      </div>
    </div>
  );
};
