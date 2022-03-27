import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReactNode } from "react";
import { SoundgifDTO } from "../../domain/sound-gif.dto";
import { SoundGifItem } from "./SoundGifItem/SoundGifItem";

type SoundGifsListProps = {
  soundGifs: SoundgifDTO[];
  title: string;
  icon: ReactNode;
};

export const SoundGifsList: React.FC<SoundGifsListProps> = ({ soundGifs, title, icon }) => {
  if (!soundGifs) return null;
  const { t } = useTranslation();
  return (
    <div className="w-full h-full my-3">
      <div className="mx-3 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start">
          {icon}
          <p className="font-bold text-lg ml-2 text-white">{title}</p>
        </div>
        <Link href={`/categories/${title}`}>
          <a className="font-bold text-stone-300 text-xs">{t("see_more")}</a>
        </Link>
      </div>
      <div className="grid sm:grid-rows-3 lg:grid-rows-2 grid-flow-col overflow-scroll scrollbar-thumb-white scrollbar-track-white-100">
        {soundGifs.map(soundGif => {
          return <SoundGifItem soundGif={soundGif} small />;
        })}
      </div>
    </div>
  );
};
