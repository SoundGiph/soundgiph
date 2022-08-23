import { useState } from "react";

export interface UseModalPopupOutput {
  isVisible: boolean;
  openOrCloseModalPopup: () => void;
}

export const useModalPopup = (): UseModalPopupOutput => {
  const [isVisible, setIsVisible] = useState(false);

  const openOrCloseModalPopup = () => {
    setIsVisible(currentIsVisble => !currentIsVisble);
  };

  return {
    isVisible,
    openOrCloseModalPopup,
  };
};
