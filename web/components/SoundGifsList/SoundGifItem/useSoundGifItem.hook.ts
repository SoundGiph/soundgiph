import { Howl } from "howler";
import { useTranslation } from "next-i18next";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { useGetFileFromUrl } from "../../../hooks/getFileFromUrl/useGetFileFromUrl";
import { useNotification } from "../../../hooks/notification/useNotification";

export const useSoundGifItem = (
  soundGif: SoundgifDTO
): {
  playSoundGif: () => void;
  shareSoundGif: () => Promise<void>;
} => {
  const { getFileFromUrl } = useGetFileFromUrl();
  const { notificationError, notificationSuccess } = useNotification();
  const { t } = useTranslation();
  const { audioUrl, id, title } = soundGif;

  const soundGifToPlay = new Howl({
    src: [audioUrl],
  });

  const playSoundGif = (): void => {
    soundGifToPlay.stop();
    soundGifToPlay.play();
  };

  const shareSoundGif = async (): Promise<void> => {
    const url = `http://localhost/${id}`
    try {
      if (!navigator) {
        notificationError(t("errors.no_navigator_error"));
        return;
      }
      if (navigator.share) {
        const shareData = {
            url: url,
            title: title
          }
          await navigator.share(shareData);
      }
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        notificationSuccess(t("success.copy_audio_url_success"));
      }
      else {
        alert("cannot share")
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
