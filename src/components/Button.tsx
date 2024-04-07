import { PlusIcon } from "@heroicons/react/24/solid";

interface ButtonProps {
  type: string;
  text?: string;
  onClick: (...args: any[]) => any;
}

export default function Button({ type, text, onClick }: ButtonProps) {
  return (
    <button
      className={`
        ${type === "primary" ? "bg-primary-button" : "bg-secondary-button"}
        border rounded-[10px] px-4 py-2`}
      onClick={onClick}
    >
      {type === "plus" ? 
        <div className="h-4 w-4"><PlusIcon /></div>
        :
        text
      }
    </button>
  )
}