import { PlusIcon } from "@heroicons/react/24/solid";

interface ButtonProps {
  type: string;
  text?: string;
  onClick: (...args: any[]) => any;
  className?: string;
  disabled?: boolean;
}

export default function Button({ type, text, onClick, className, disabled }: ButtonProps) {
  return (
    <button
      className={`${ disabled ? "bg-secondary-color text-modal-veil" : "bg-primary-button text-white"} ${className} border rounded-[10px] px-4 py-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {type === "plus" ? 
        <div className="h-4 w-4"><PlusIcon /></div>
        :
        text
      }
    </button>
  )
}