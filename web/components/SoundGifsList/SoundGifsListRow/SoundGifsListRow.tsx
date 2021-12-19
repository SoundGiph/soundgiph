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
    <div className="flex items-center h-5/6 w-5/6  hover:w-full hover:h-11/12 px-5 py-5 bg-cover card bg-primary m-5 justify-between">
      <div className="card glass card-body text-neutral-content h-full w-full items-center justify-between compact">
        <div className="avatar">
          <div className="rounded-full w-28 h-28 hover ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={imageUrl} />
          </div>
        </div>
        <div className="text-center mt-8">
          <p>{description}</p>
        </div>
        <div className="card-actions w-full flex justify-center">
          <button className="btn glass rounded-full w-full">
            {t("share")}
          </button>
        </div>
      </div>
    </div>
  );
};
