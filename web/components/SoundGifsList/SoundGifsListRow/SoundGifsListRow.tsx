import { useTranslation } from "react-i18next";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";

type SoundGifsListRowProps = {
  soundGif: SoundgifDTO;
};

export const SoundGifsListRow: React.FC<SoundGifsListRowProps> = ({
  soundGif,
}) => {
  const { imageUrl, description, title } = soundGif;
  const { t } = useTranslation();
  return (
    <div className="flex items-center h-5/6 w-5/6 px-5 py-5 bg-cover card bg-primary m-5">
      <div className="card glass card-body text-neutral-content h-full w-full items-center justify-between">
        <div className="avatar">
          <div className="rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={imageUrl} />
          </div>
        </div>
        <div className="card-actions w-full flex justify-center text-center">
          <p>{description}</p>
          <button className="btn glass rounded-full w-full">
            {t("share")}
          </button>
        </div>
      </div>
    </div>
  );
};
