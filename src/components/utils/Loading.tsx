import { twMerge } from "tailwind-merge";
import { LoadingIcon } from "./Icons";

interface LoadingInterface {
  width: number;
  className?: string;
}

export default function Loading({ width, className }: LoadingInterface) {
  return (
    <div className={twMerge("flex items-center justify-center text-white gap-2 text-2xl m-auto h-[52px]", className)}>
      <LoadingIcon width={width} className="text-gray-200 animate-spin fill-red-600 max-w-20" />
      <h1>Carregando...</h1>
    </div>
  );
}
