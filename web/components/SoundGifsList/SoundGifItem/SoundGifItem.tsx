import { PlayIcon, ShareIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { useSoundGifItem } from "./useSoundGifItem.hook";
import { Tags } from "./Tags";
import { useEffect } from "react";

type SoundGifsItemProps = {
  soundGif: SoundgifDTO;
};

export const SoundGifItem: React.FC<SoundGifsItemProps> = ({ soundGif }) => {
  const { imageUrl, description, id } = soundGif;
  const { playSoundGif, shareAudioFile } = useSoundGifItem(soundGif);

  return (
    <div key={id} className="avatar mr-3 my-5 w-44 h-44 flex items-center justify-center">
      <div className="w-44 h-44 rounded-lg">
        <img src={imageUrl} />
      </div>
      <div className="absolute z-20 items-center">
        <button onClick={playSoundGif}>
          <PlayIcon className="h-14" />
        </button>
      </div>
      <div className="flex z-10 w-full h-1/2 absolute bg-gradient-to-t from-black bottom-0" />
      <div className=" z-10 flex items-end w-full absolute bottom-2 justify-center">
        <div className="px-2 flex items-end w-full flex-row justify-between items-center">
          <p className="font-white text-xs font-bold line-clamp-2 hover:text-clip">{description}</p>
          <button onClick={shareAudioFile}>
            <ShareIcon className="h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

/*
    <div className="avatar items-center justify-center">
        <img src={imageUrl} />
      </div>
      <div className="flex-row w-full flex justify-between items-center">
        <div className="text-center text-xs font-bold">
          <p>{description}</p>
        </div>
        <button onClick={shareAudioFile} className="btn glass rounded-full"></button>
      </div>
*/
