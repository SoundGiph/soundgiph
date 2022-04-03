import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { VozoAppProvider } from "../context/VozoAppProvider";
import "../styles/globals.css";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <VozoAppProvider>
        <Header />
        <Component {...pageProps} />
        <ToastContainer />
        <Footer />
      </VozoAppProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
