"use client";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "start" | "stop" | "skip" | "reset";
}

const getColor = (type: string) => {
  switch (type) {
    case "start":
      return "bg-blue-500";
    case "stop":
      return "bg-red-500";
    case "skip":
      return "bg-yellow-500";
    case "reset":
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
};

export const Button = (params: ButtonProps) => {
  const { label, onClick, type = "start" } = params;
  const color = getColor(type);

  return (
    <button
      className={`${color} text-white px-4 py-2 rounded`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
