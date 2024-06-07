interface Props {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
export default function Button({
  text,
  onClick,
  disabled = false,
  className = "btn-primary",
}: Props) {
  return (
    <button
      type="submit"
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
