import { PlayIcon } from "@heroicons/react/solid";
import { Howler } from "howler";
import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect } from "react";
import { FaShareAltSquare } from "react-icons/fa";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import playingAnimation from "../../../public/playing.json";
import { unmute } from "../../../tools/unmute";
import { trackPlay, trackShare } from "../../../tracker/actions";
import {
  BLACK_GRADIENT_BOX,
  BLACK_GRADIENT_SUB_BOX,
  BLACK_GRADIENT_SUB_BOX_CHILDREN,
  IMAGE_ITEM_BACKGROUND,
  IMAGE_ITEM_BACKGROUND_MID,
  ITEM_BOX,
  ITEM_DESCRIPTION,
  PLAY_BUTTON_ICON,
  PLAY_ICON,
  SHARE_BUTTON_ICON,
  WHITE_COLOR,
} from "./SoundGifItem.styles";
import { useSoundGifItem } from "./useSoundGifItem.hook";

type SoundGifsItemProps = {
  soundGif: SoundgifDTO;
  small?: boolean;
  canShare?: boolean;
};

export const SoundGifItem: React.FC<SoundGifsItemProps> = ({ soundGif, small, canShare }) => {
  const { imageUrl, description, id, title } = soundGif;
  const { playSoundGif, shareAudioFile, isSoundPlaying } = useSoundGifItem(soundGif);

  const onShare = () => {
    shareAudioFile();
    trackShare({ id, description, title });
  };

  const onPlay = () => {
    playSoundGif();
    trackPlay({ id, description, title });
  };

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
  const userProfilePicture = soundGif.user?.picture || "";
  return (
    <div>
      <div key={id} className={ITEM_BOX}>
        <div className={`${small ? IMAGE_ITEM_BACKGROUND_MID : IMAGE_ITEM_BACKGROUND} ${ANIMATE_PULSE}`}>
          <img src={imageUrl} />
        </div>
        <button onClick={onPlay} className={PLAY_BUTTON_ICON}>
          {isSoundPlaying ? (
            <Lottie className={PLAY_ICON} animationData={playingAnimation} loop color={WHITE_COLOR} />
          ) : (
            <PlayIcon className={PLAY_ICON} color={WHITE_COLOR} />
          )}
        </button>
        <div className={BLACK_GRADIENT_BOX} />
        <div className={BLACK_GRADIENT_SUB_BOX}>
          <div className={BLACK_GRADIENT_SUB_BOX_CHILDREN}>
            <p className={ITEM_DESCRIPTION}>{title}</p>
            {canShare && (
              <button onClick={onShare} className={SHARE_BUTTON_ICON}>
                <FaShareAltSquare size={45} color={WHITE_COLOR} />
              </button>
            )}
          </div>
        </div>
      </div>
      {canShare && (
        <div className="w-full flex flex-row justify-start py-1 ml-1">
          <Image
            loader={() => userProfilePicture}
            src={userProfilePicture}
            width={15}
            height={15}
            className="rounded-full"
          />
          {soundGif.user && <p className={ITEM_DESCRIPTION}>{soundGif.user?.firstname}</p>}
        </div>
      )}
    </div>
  );
};
