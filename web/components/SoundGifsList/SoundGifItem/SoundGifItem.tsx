import { PlayIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { useSoundGifItem } from "./useSoundGifItem.hook";
import { Tags } from "./Tags"
import { useEffect } from 'react'

type SoundGifsItemProps = {
  soundGif: SoundgifDTO;
};

export const SoundGifItem: React.FC<SoundGifsItemProps> = ({ soundGif }) => {

  const { imageUrl, description, id, tags } = soundGif;
  const { t } = useTranslation();
  const { playSoundGif, shareSoundGif, shareAudioFile } = useSoundGifItem(soundGif);  

  return (
    <div
      key={id}
      className="px-5 py-5 bg-cover bg-primary m-5 rounded-xl shadow-md image-full border-yellow-400 max-w-xs"
    >
      <div className="card card-body text-neutral-content h-full w-full items-center justify-between compact border">
        <div className="avatar items-center justify-center">
          <button
            onClick={playSoundGif}
            className="absolute self-center m-auto btn btn-ghost btn-circle h-28 w-28 items-center justify-center rounded-full"
          >
            <PlayIcon className="h-12 w-28 fill-primary" />
          </button>
          <div className="rounded-full w-52 h-52 hover ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={imageUrl} />
          </div>
        </div>
        <div className="text-center mt-8">
          <p>{description}</p>
        </div>
        <Tags tags={tags}/>
        <div className="card-actions w-full flex justify-center">
            <button onClick={shareAudioFile} className="btn glass rounded-full w-full">
              {t("share")}
            </button>
        </div>
      </div>
    </div>
  );
};
