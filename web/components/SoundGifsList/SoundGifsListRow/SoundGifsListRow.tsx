import { VolumeUpIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { useSoundGifListRow } from "./useSoundGifListRow.hook";

type SoundGifsListRowProps = {
  soundGif: SoundgifDTO;
};

export const SoundGifsListRow: React.FC<SoundGifsListRowProps> = ({ soundGif }) => {
  const { imageUrl, description, id } = soundGif;
  const { t } = useTranslation();
  const { playSoundGif, shareSoundGif } = useSoundGifListRow(soundGif);

  return (
    <div
      key={id}
      className="items-center px-5 py-5 bg-cover bg-primary m-5 justify-between rounded-xl shadow-md image-full"
    >
      <div className="card glass card-body text-neutral-content h-full w-full items-center justify-between compact">
        <div className="avatar items-center justify-center">
          <button
            onClick={playSoundGif}
            className="absolute self-center m-auto btn btn-ghost btn-circle h-28 w-28 items-center justify-center rounded-full"
          >
            <VolumeUpIcon className="h-28 w-28 fill-primary" />
          </button>
          <div className="rounded-full w-52 h-52 hover ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={imageUrl} />
          </div>
        </div>
        <div className="text-center mt-8">
          <p>{description}</p>
        </div>
        <div className="card-actions w-full flex justify-center">
          <button onClick={shareSoundGif} className="btn glass rounded-full w-full">
            {t("share")}
          </button>
        </div>
      </div>
    </div>
  );
};
