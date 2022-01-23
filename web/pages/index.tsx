import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { SearchSoundGifInput } from "../components/SearchSoundGifInput/SearchSoundGifInput";
import { SoundGifsList } from "../components/SoundGifsList/SoundGifsList";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ClockIcon, FireIcon } from "@heroicons/react/solid";
import React from "react";
import { useApi } from "../hooks/api/useApi.hook"

type HomeProps = {
  soundGifs: SoundgifDTO[];
};

const Home: NextPage<HomeProps> = ({ soundGifs }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-main">
      <Head>
        <title>Vozo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="flex flex-col items-center justify-space container mx-auto">
          <SearchSoundGifInput />
          <SoundGifsList
            soundGifs={soundGifs}
            title={t("most_recent_soundgif_title")}
            icon={<ClockIcon className="h-6 w-6 to-blue-400" />}
          />
          <SoundGifsList
            soundGifs={soundGifs}
            title={t("most_shared_soundgif_title")}
            icon={<FireIcon className="h-6 w-6 to-blue-400" />}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }: { locale?: string | undefined }) => {
  const { findMostRecentSoundGif } = useApi()
  const soundGifs = await findMostRecentSoundGif()
  return {
    props: {
      soundGifs,
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Home;
