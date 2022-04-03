import { ClockIcon, FireIcon } from "@heroicons/react/solid";
import { Howler } from "howler";
import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { SoundGifsList } from "../components/SoundGifsList/SoundGifsList";
import { useVozoApp } from "../context/useVozoApp.hook";
import { SoundgifDTO } from "../domain/sound-gif.dto";


type HomeProps = {
  soundGifs: SoundgifDTO[];
};

const Home: NextPage<HomeProps> = () => {
  const { t } = useTranslation();
  const { soundGifs } = useVozoApp();

  const mostRecentSoundGifs = (
    <SoundGifsList soundGifs={soundGifs} title={t("most_recent_soundgif_title")} icon="ClockIcon" color="#6565F1" />
  );

  const mostSharedSoundGifs = (
    <SoundGifsList soundGifs={soundGifs} title={t("most_shared_soundgif_title")} icon="FireIcon" color="#E449A3" />
  );

  return (
    <div className="bg-black">
      <Head>
        <title>Vozo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="relative overflow-hidden">
          <div className="flex flex-col items-center justify-space container mx-auto">
            {[mostRecentSoundGifs, mostSharedSoundGifs]}
          </div>
        </main>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }: { locale?: string | undefined }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Home;
