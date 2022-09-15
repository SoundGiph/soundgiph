export const Steps: React.FC<{ steps: number }> = ({ steps }) => {
  const DEFAULT_STEPS = 3;
  return (
    <ul className="steps mb-5">
      {Array.from(Array(DEFAULT_STEPS)).map((value, index) => {
        return <li className={`step ${index + 1 <= steps ? "step-primary" : ""}`} />;
      })}
    </ul>
  );
};
