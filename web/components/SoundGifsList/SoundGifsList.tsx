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

  return (
    <div className="w-full h-full px-3 py-5 bg-cover card bg-base">
      <div className="flex flex-row justify-space">
        {icon}
        <p className="card-title ml-5">{title}</p>
      </div>
      <div className="grid sm:grid-rows-3 lg:grid-rows-2 grid-flow-col overflow-scroll scrollbar-thumb-white scrollbar-track-white-100">
        {soundGifs.map(soundGif => {
          return <SoundGifItem soundGif={soundGif} small />;
        })}
      </div>
    </div>
  );
};
