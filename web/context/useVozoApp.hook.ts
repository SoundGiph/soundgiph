import { useContext } from "react";
import { VozoAppContext, VozoAppCTX } from "./VozoAppContext";

export const useVozoApp = (): VozoAppContext => {
  return useContext(VozoAppCTX);
};
