import { config, IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateVozoModal from "../components/CreateVozoModal/CreateVozoModal";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import LoginModal from "../components/LoginModal/LoginModal";
import SettingsModal from "../components/SettingsModal/SettingsModal";
import { VozoAppProvider } from "../context/VozoAppProvider";
import "../styles/globals.css";
import trackerInit from "../tracker/init";

library.add(fas, fab as unknown as IconDefinition);
config.autoAddCss = false;
trackerInit();

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <CookiesProvider>
        <VozoAppProvider>
          <LoginModal />
          <SettingsModal />
          <CreateVozoModal />
          <Header />
          <Component {...pageProps} />
          <ToastContainer />
          <Footer />
        </VozoAppProvider>
      </CookiesProvider>
    </>
  );
};

export default appWithTranslation(MyApp as any);
