import { Howl, Howler } from "howler";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Stages } from "../../../constants/constants";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";
import { useApi } from "../../../hooks/api/useApi.hook";
import { useNotification } from "../../../hooks/notification/useNotification";
import { trackShareError, trackShare } from "../../../tracker/actions";


declare global {
  interface Window {
    ReactNativeWebView?: any;
  }
}

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
    const file = new File([blob], `${title}.mp3`, { type: "audio/mp3" });
    const filesArray = [file];
    const api = useApi(Stages.RUN);

    const shareData = {
      files: filesArray,
      text: title,
      url: audioUrl
    };

    const navigator = window.navigator;

    if (navigator) {
      //const canShare = navigator.canShare && navigator.canShare(shareData)
      if (navigator.canShare) {
        if (navigator.share) {
          const { files } = shareData;
          navigator
            .share({ files })
            .then(() => {
              trackShare({ id, title, description: "" });
              api
                .incrementSharedCount({ id })
                .then(() => {})
                .catch(error => {
                  trackShareError();
                  notificationError(t("error.share"));
                });
            })
            .catch(error => console.log("Error sharing", error));
        }
      } else {
        const shareToWebView = async (shareData: any) => {
          window.ReactNativeWebView.postMessage('share:' + JSON.stringify(shareData),);
        }
        shareToWebView(shareData).then(() => {
          trackShare({ id, title, description: "" });
          api
            .incrementSharedCount({ id })
            .then(() => {
            })
            .catch(error => {
              console.log("Error Incremeting", error);
            });
        }).catch(error => {
          trackShareError()
          notificationError(t("error.share"))
        });
        return;
      }
      trackShare({ id: id, title: title, description: title });
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

