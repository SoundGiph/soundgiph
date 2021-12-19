import { useTranslation } from "react-i18next";
import { SoundgifDTO } from "../../domain/sound-gif.dto";
import { SoundGifsListRow } from "./SoundGifsListRow/SoundGifsListRow";

type SoundGifsListProps = {
  soundGifs: SoundgifDTO[];
};

export const SoundGifsList: React.FC<SoundGifsListProps> = ({ soundGifs }) => {
  if (!soundGifs) return null;
  return (
    <div className="w-11/12 h-full px-4 py-10 bg-cover card bg-base">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 grid justify-items-center h-full w-full">
        {soundGifs.map((soundGif) => {
          return <SoundGifsListRow soundGif={soundGif} />;
        })}
      </div>
    </div>
  );
};
