type TagsProps = {
  tags: string[];
};

export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="flex overflow-hidden max-w-xs">
      {tags.map(tag => {
        //TODO
        const cleanedTag = tag.replace('"', "").replace('"', "").replace("[", "").replace("]", "");
        return (
          <div className="rounded flex bg-white font-mono compact text-xs text-black mt-4 mr-2 p-1">
            {`#${cleanedTag}`}
            <p />
          </div>
        );
      })}
    </div>
  );
};
