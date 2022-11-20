import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { DynamicIcon } from "../../DynamicIcon/DynamicIcon";
import { SoundGifItem } from "../SoundGifItem/SoundGifItem";

type SoundGifsListProps = {
  soundGifs: SoundgifDTO[];
  title: string;
  icon: string;
  color: string;
  isSearchResultLoading: boolean;
  isSearchResultEmpty: boolean;
};
const SearcResultIsEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-space container mx-auto h-full w-full">
      <p>NO VOZO CORRESPONDGIN TO YOUR RESEARCH</p>
    </div>
  );
};

export const SoundGifsVerticalList: React.FC<SoundGifsListProps> = ({
  soundGifs,
  title,
  icon,
  color,
  isSearchResultEmpty,
}) => {
  if (isSearchResultEmpty) return <SearcResultIsEmptyState />;
  return (
    <div className="flex w-full h-full mt-5 items-center justify-center flex-col">
      <div className="px-3 w-full flex-row items-center justify-between">
        <div className=" mb-2 flex flex-row items-center justify-start">
          <DynamicIcon icon={icon} color={color} />
          <p className="font-bold text-lg ml-2 text-white">{title}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4 grid-flow-row overflow-y-scroll scrollbar-thumb-white scrollbar-track-white-100 content-center">
        {soundGifs.map(soundGif => {
          return <SoundGifItem soundGif={soundGif} small canShare />;
        })}
      </div>
    </div>
  );
};
