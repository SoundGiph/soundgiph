import { KeyboardEvent, useState } from "react";

export const useCreateSoundGifFormTagsInput = (): {
  addTags: (event: KeyboardEvent<HTMLInputElement>) => void;
  removeTags: (index: number) => void;
  tags: string[];
} => {
  const [tags, setTags] = useState<string[]>([]);

  const removeTags = (index: number): void => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!event) return;
    const target = event.target as HTMLTextAreaElement;
    if (event.key === "Enter" && target.value !== "") {
      if (!tags.includes(target.value)) setTags([...tags, target.value]);
      target.value = "";
    } else if (event.key === "Backspace" && target.value === "") {
      const indexOfTagToRemove = tags.length - 1;
      if (indexOfTagToRemove < 0) return;
      console.log(indexOfTagToRemove);
      removeTags(indexOfTagToRemove);
    }
  };

  return {
    addTags,
    removeTags,
    tags,
  };
};
