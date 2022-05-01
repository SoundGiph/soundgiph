import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { DynamicIcon } from "../../DynamicIcon/DynamicIcon";
import { SoundGifItem } from "../SoundGifItem/SoundGifItem";

type SoundGifsListProps = {
  soundGifs: SoundgifDTO[];
  title: string;
  icon: string;
  color: string;
  isSearchResultLoading: boolean;
};
const SearcResultIsEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-space container mx-auto h-full w-full">
      <p>NO VOZO CORRESPONDGIN TO YOUR RESEARCH</p>
    </div>
  );
};

const IsLoadingEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-space container mx-auto h-full w-full">
      <p>...LOADING</p>
    </div>
  );
};

export const SoundGifsVerticalList: React.FC<SoundGifsListProps> = ({
  soundGifs,
  title,
  icon,
  color,
  isSearchResultLoading,
}) => {
  if (isSearchResultLoading) return <IsLoadingEmptyState />;
  if (!soundGifs.length) return <SearcResultIsEmptyState />;
  return (
    <div className="w-full h-full mt-5">
      <div className="mx-3 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start">
          <DynamicIcon icon={icon} color={color} />
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
