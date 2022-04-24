import { Howl, Howler } from "howler";
import { useEffect } from "react";
import { SILENT_MP3_URL } from "../../constants/constants";
import { unmute } from "../../tools/unmute";

export const useUnmute = () => {
    useEffect(() => {
        const soundGifToPlay = new Howl({
            src: [SILENT_MP3_URL]
        });
        soundGifToPlay.play();
        var audioContext = Howler.ctx;
        unmute(audioContext, true, true);
    }, []);
}