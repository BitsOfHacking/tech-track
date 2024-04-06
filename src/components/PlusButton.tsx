import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface PlusButtonProps {
  small?: boolean;
  onClick: (...args: any[]) => any;
}

export default function PlusButton({ small, onClick }: PlusButtonProps) {
  return (
    <div
      className={`${small ? "h-10 w-10" : "h-14 w-14"} rounded-full cursor-pointer`}
      onClick={onClick} 
    >
      <PlusCircleIcon className="stroke-primary-text stroke-1 rounded-full"/>
    </div>
  )
}