import * as React from "react";
import { useVozoAppProvider } from "./useVozoAppProvider.hook";
import { VozoAppCTX } from "./VozoAppContext";

export const VozoAppProvider: React.FunctionComponent = ({ children }) => {
  const appState = useVozoAppProvider();
  return <VozoAppCTX.Provider value={appState}>{children}</VozoAppCTX.Provider>;
};
