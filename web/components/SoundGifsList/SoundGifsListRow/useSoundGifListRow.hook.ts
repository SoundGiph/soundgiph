import { Howl } from "howler";
import { useTranslation } from "next-i18next";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { useGetFileFromUrl } from "../../../hooks/getFileFromUrl/useGetFileFromUrl";
import { useNotification } from "../../../hooks/notification/useNotification";

export const useSoundGifListRow = (
  soundGif: SoundgifDTO
): {
  playSoundGif: () => void;
  shareSoundGif: () => Promise<void>;
} => {
  const { getFileFromUrl } = useGetFileFromUrl();
  const { notificationError } = useNotification();
  const { t } = useTranslation();
  const { audioUrl } = soundGif;

  const soundGifToPlay = new Howl({
    src: [audioUrl],
  });

  const playSoundGif = (): void => {
    soundGifToPlay.stop();
    soundGifToPlay.play();
  };

  const shareSoundGif = async (): Promise<void> => {
    try {
      const data = await getFileFromUrl(audioUrl);
      window.alert(navigator.share);
      if (data && navigator.share && navigator.canShare && navigator.canShare({ files: [data] })) {
        await navigator.share({
          files: [data],
        });
      } else {
        console.log(t("share"));
        console.log(t("errors.web_share_api_not_supported"));
        notificationError(t("errors.web_share_api_not_supported"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    shareSoundGif,
    playSoundGif,
  };
};
