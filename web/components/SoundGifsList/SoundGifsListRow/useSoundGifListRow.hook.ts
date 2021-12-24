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
  const { notificationError, notificationSuccess } = useNotification();
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
      if (!navigator) {
        notificationError(t("errors.no_navigator_error"));
        return;
      }
      if (navigator.share) {
        const data = await getFileFromUrl(audioUrl);
        if (data) {
          await navigator.share({
            files: [data],
          });
        }
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(audioUrl);
        notificationSuccess(t("success.copy_audio_url_success"));
      }
    } catch (error) {
      window.alert(navigator.clipboard);
      notificationError(t("errors.fail_to_web_share_error"));
    }
  };

  return {
    shareSoundGif,
    playSoundGif,
  };
};
