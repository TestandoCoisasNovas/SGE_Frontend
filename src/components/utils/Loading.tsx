import { twMerge } from "tailwind-merge";
import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className={twMerge("flex items-center justify-center text-white gap-2 text-2xl m-auto h-[52px]")}>
      <Spinner aria-label="loading" size="md" />
      <h1>Carregando...</h1>
    </div>
  );
}
