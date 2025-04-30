interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
}

export const Button = (params: ButtonProps) => {
  const { label, onClick, color = "blue" } = params;
  return (
    <button
      className={`bg-${color}-500 text-white px-4 py-2 rounded hover:bg-${color}-600`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
