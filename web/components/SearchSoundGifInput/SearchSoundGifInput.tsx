import {useTranslation} from 'next-i18next';
import {SearchCircleIcon} from '@heroicons/react/solid';

export const SearchSoundGifInput = () => {
  const {t} = useTranslation();
  return (
    <div className="form-control w-full">
      <div className="relative w-11/12 items-center self-center max-w-screen-lg">
        <input
          type="text"
          placeholder={t('search')}
          className="w-full pr-16 h-16 input input-primary input-bordered max-w bg-neutral text-xl"
        />
        <button className="absolute h-16 top-0 right-0 rounded-l-none btn btn-primary">
          <SearchCircleIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
