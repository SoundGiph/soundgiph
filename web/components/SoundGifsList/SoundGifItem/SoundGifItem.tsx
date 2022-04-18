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
  WHITE_COLOR,
} from "./SoundGifItem.styles";
import playingAnimation from "../../../public/playing.json";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { Howler } from "howler";
import { unmute } from "../../../tools/unmute";

type SoundGifsItemProps = {
  soundGif: SoundgifDTO;
  small?: boolean;
};

export const SoundGifItem: React.FC<SoundGifsItemProps> = ({ soundGif }) => {
  const { imageUrl, description, id } = soundGif;
  const { playSoundGif, shareAudioFile, isSoundPlaying } = useSoundGifItem(soundGif);

  useEffect(() => {
    if (isSoundPlaying) {
      var audioContext = Howler.ctx;
      const { dispose } = unmute(audioContext, true, true);
      return () => {
        dispose();
      };
    }
  }, [isSoundPlaying]);

  const ANIMATE_PULSE = isSoundPlaying && "animate-pulse ";
  return (
    <div key={id} className={ITEM_BOX}>
      <div className={`${IMAGE_ITEM_BACKGROUND} ${ANIMATE_PULSE}`}>
        <img src={imageUrl} />
      </div>
      <button onClick={playSoundGif} className={PLAY_BUTTON_ICON}>
        {isSoundPlaying ? (
          <Lottie animationData={playingAnimation} loop color={WHITE_COLOR} />
        ) : (
          <PlayIcon className={PLAY_ICON} color={WHITE_COLOR} />
        )}
      </button>
      <div className={BLACK_GRADIENT_BOX} />
      <div className={BLACK_GRADIENT_SUB_BOX}>
        <div className={BLACK_GRADIENT_SUB_BOX_CHILDREN}>
          <p className={ITEM_DESCRIPTION}>{description}</p>
          <button onClick={shareAudioFile} className={SHARE_BUTTON_ICON}>
            <FaShareAltSquare size={30} color={WHITE_COLOR} />
          </button>
        </div>
      </div>
    </div>
  );
};
