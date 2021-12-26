import { XCircleIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import { useCreateSoundGifFormTagsInput } from "./useCreateSoundGifFormTagsInput.hook";

export const TagInput = () => {
  const { t } = useTranslation();
  const { tags, addTags, removeTags } = useCreateSoundGifFormTagsInput();
  return (
    <>
      <label className="label">
        <span className="label-text">{t("home.create_sound_gif_form.tags")}</span>
      </label>
      <div className="input input-primary input-bordered flex flex-row items-center">
        <ul className="flex flex-row">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="bg-primary px-2 h-6 rounded-full shadow-md flex flex-row mx-1 items-center justify-center"
            >
              <p className="text-xs mr-2">{tag}</p>
              <button className="btn-ghost rounded-full" onClick={() => removeTags(index)}>
                <XCircleIcon className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
        <input
          onKeyUp={event => addTags(event)}
          className="flex bg-base-100 ml-2 border-none focus:outline-none"
          placeholder="Press enter to add tags"
        />
      </div>
    </>
  );
};
