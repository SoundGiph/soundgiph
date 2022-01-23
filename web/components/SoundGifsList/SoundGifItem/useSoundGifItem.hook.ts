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
  shareAudioFile: () => Promise<void>
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


  async function shareAudioFile() {

    const blob =  await fetch(audioUrl).then(res => res.blob())
    const file = new File([blob], "title.mp3", { type: 'audio/mp3' });
    const filesArray = [file];

    const shareData = {
      files : filesArray
    }
    // add it to the shareData

    const navigator = window.navigator

    if (navigator){
      //const canShare = navigator.canShare && navigator.canShare(shareData)

      if(navigator.canShare){
        if (navigator.share){
          navigator.share(shareData)
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
        }
      }
      else {
        notificationError(t("Cannot share the vozo, update your navigator"));
        return;   
      }
    }
  }

  const shareSoundGif = async (): Promise<void> => {
    const url = `${process.env.WEB_URL}/${id}`
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
    shareAudioFile
  };
};
