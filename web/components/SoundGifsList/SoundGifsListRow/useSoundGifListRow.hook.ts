import axios from "axios";
import { Howl } from "howler";
import { SoundgifDTO } from "../../../domain/sound-gif.dto";

export const useSoundGifListRow = (
  soundGif: SoundgifDTO
): {
  playSoundGif: () => void;
  shareSoundGif: () => void;
} => {
  const { audioUrl, title, description } = soundGif;
  const soundGifToPlay = new Howl({
    src: [audioUrl],
  });

  const playSoundGif = () => {
    soundGifToPlay.stop();
    soundGifToPlay.play();
  };

  const shareSoundGif = async () => {
    try {
      const { data } = await axios.get<File>(`/api/cors?url=${audioUrl}`);
      window.alert(navigator.canShare);
      window.alert(navigator.share);
      console.log(navigator.canShare && navigator.canShare({ files: [data] }));
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [data] })) {
        await navigator.share({
          title,
          text: description,
          files: [data],
        });
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
