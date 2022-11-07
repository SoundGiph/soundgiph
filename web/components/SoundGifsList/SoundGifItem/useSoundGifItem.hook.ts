import { create } from "apisauce";
import { Howl, Howler } from "howler";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Stages } from "../../../constants/constants";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { useApi } from "../../../hooks/api/useApi.hook";
import { useNotification } from "../../../hooks/notification/useNotification";
import { trackShareError } from "../../../tracker/actions";

export const useSoundGifItem = (
  soundGif: SoundgifDTO
): {
  playSoundGif: () => void;
  shareSoundGif: () => Promise<void>;
  shareAudioFile: () => Promise<void>;
  isSoundPlaying: boolean;
} => {
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const { notificationError, notificationSuccess } = useNotification();
  const { t } = useTranslation();
  const { audioUrl, id, title } = soundGif;

  const soundGifToPlay = new Howl({
    src: [audioUrl],
    onplay: () => setIsSoundPlaying(true),
    onend: () => setIsSoundPlaying(false),
    onstop: () => setIsSoundPlaying(false)

  });

  const playSoundGif = (): void => {
    if (!Howler.noAudio) {
      Howler.stop();
    }
    isSoundPlaying ? soundGifToPlay.pause() : soundGifToPlay.play();
  };

  async function shareAudioFile() {
    const blob = await fetch(audioUrl).then(res => res.blob());
    const file = new File([blob], "title.mp3", { type: "audio/mp3" });
    const filesArray = [file];
    const api = useApi(Stages.RUN);

    const shareData = {
      files: filesArray,
    };
    // add it to the shareData

    const navigator = window.navigator;

    if (navigator) {
      //const canShare = navigator.canShare && navigator.canShare(shareData)

      if (navigator.canShare) {
        if (navigator.share) {
          navigator
            .share(shareData)
            .then(() => {
              console.log("Successful share");
            })
            .catch(error => console.log("Error sharing", error));

          api
            .incrementSharedCount({ id })
            .then(() => {
              console.log("Successful Increment");
            })
            .catch(error => {
              console.log("Error Incremeting", error);
            });
        }
      } else {
        notificationError(t("Cannot share the vozo, update your navigator"));
        trackShareError();
        return;
      }
    }
  }

  const shareSoundGif = async (): Promise<void> => {
    const url = `${process.env.NEXT_PUBLIC_WEB_URL}/${id}`;
    try {
      if (!navigator) {
        notificationError(t("errors.no_navigator_error"));
        return;
      }
      if (navigator.share) {
        const shareData = {
          url: url,
          title: title,
        };
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        notificationSuccess(t("success.copy_audio_url_success"));
      } else {
        alert("cannot share");
      }
    } catch (error) {
      window.alert(navigator.clipboard);
      notificationError(t("errors.fail_to_web_share_error"));
    }

  };

  return {
    isSoundPlaying,
    shareSoundGif,
    playSoundGif,
    shareAudioFile,
  };
};
