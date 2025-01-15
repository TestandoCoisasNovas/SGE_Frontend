import { twMerge } from "tailwind-merge";

interface ButtonInterface extends React.PropsWithChildren {
  className?: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button(props: ButtonInterface) {
  return (
    <button
      className={twMerge(
        "flex items-center font-bold max-w-26 p-3 text-center",
        "ease-in-out duration-200 select-none active:duration-100",
        "border-2 border-solid border-foreground rounded-lg",
        "hover:text-black hover:border-extraColor hover:bg-extraColor hover:scale-110 active:scale-90",
        props.className
      )}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
