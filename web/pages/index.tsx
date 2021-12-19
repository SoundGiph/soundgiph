import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { SearchSoundGifInput } from "../components/SearchSoundGifInput/SearchSoundGifInput";
import { SoundGifsList } from "../components/SoundGifsList/SoundGifsList";
import { SoundgifDTO } from "../domain/sound-gif.dto";
import { soundGifFixtureFactory } from "../domain/sound-gif.fixtures.factory";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ClockIcon, FireIcon } from "@heroicons/react/solid";

type HomeProps = {
  soundGifs: SoundgifDTO[];
};

const Home: NextPage<HomeProps> = ({ soundGifs }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-main">
      <Head>
        <title>Create Next App</title>
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
            icon={<ClockIcon className="h-6 w-6" />}
          />
          <SoundGifsList
            soundGifs={soundGifs}
            title={t("most_shared_soundgif_title")}
            icon={<FireIcon className="h-6 w-6" />}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
}: {
  locale?: string | undefined;
}) => {
  return {
    props: {
      soundGifs: [
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
        soundGifFixtureFactory({}),
      ],
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Home;
