interface TextButtonWithIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  color?: string;
}

const TextButtonWithIcon: React.FC<TextButtonWithIconProps> = ({ icon, onClick, label }) => {
  return (
    <button
      className="btn btn-outline bg-white text-black border-2 border-primary hover:border-2 focus:border-2 focus:border-primary mb-4"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default TextButtonWithIcon;
