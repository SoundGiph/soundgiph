import { PlayIcon } from "@heroicons/react/solid";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { useSoundGifItem } from "./useSoundGifItem.hook";
import { FaShareAltSquare } from "react-icons/fa";
import {
  BLACK_GRADIENT_BOX,
  BLACK_GRADIENT_SUB_BOX,
  BLACK_GRADIENT_SUB_BOX_CHILDREN,
  IMAGE_ITEM_BACKGROUND,
  ITEM_BOX,
  ITEM_DESCRIPTION,
  PLAY_BUTTON_ICON,
  PLAY_ICON,
  SHARE_BUTTON_ICON,
} from "./SoundGifItem.styles";
import playingAnimation from "../../../public/playing.json";
import Lottie from "lottie-react";

type SoundGifsItemProps = {
  soundGif: SoundgifDTO;
  small?: boolean;
};

export const SoundGifItem: React.FC<SoundGifsItemProps> = ({ soundGif, small }) => {
  const { imageUrl, description, id } = soundGif;
  const { playSoundGif, shareAudioFile, isSoundPlaying } = useSoundGifItem(soundGif);
  const ANIMATE_PULSE = isSoundPlaying && "animate-pulse ";
  return (
    <div key={id} className={ITEM_BOX}>
      <div className={`${IMAGE_ITEM_BACKGROUND} ${ANIMATE_PULSE}`}>
        <img src={imageUrl} />
      </div>
      <button onClick={playSoundGif} className={PLAY_BUTTON_ICON}>
        {isSoundPlaying ? <Lottie animationData={playingAnimation} loop /> : <PlayIcon className={PLAY_ICON} />}
      </button>
      <div className={BLACK_GRADIENT_BOX} />
      <div className={BLACK_GRADIENT_SUB_BOX}>
        <div className={BLACK_GRADIENT_SUB_BOX_CHILDREN}>
          <p className={ITEM_DESCRIPTION}>{description}</p>
          <button onClick={shareAudioFile} className={SHARE_BUTTON_ICON}>
            <FaShareAltSquare size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};
