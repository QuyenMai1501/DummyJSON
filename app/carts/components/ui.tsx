import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const Input = ({
  value,
  onChange,
  placeholder,
  className = "",
}: InputProps) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
};

export const Select = ({
  value,
  onChange,
  options,
  className = "",
}: SelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

export const Table = ({ children, className = "" }: TableProps) => (
  <div className="overflow-x-auto">
    <table className={`min-w-full border-collapse ${className}`}>
      {children}
    </table>
  </div>
);

type BadgeProps = {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning";
};

export const Badge = ({ children, variant = "info" }: BadgeProps) => {
  const variants = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};
