import Navbar from "@/components/home/Navigation/Navbar";
import { twMerge } from "tailwind-merge";

export default function Home() {
  return (
    <div
      className={twMerge(
        "flex min-h-screen",
      )}
    >
      <Navbar />
      <h1 className="flex-1 p-8 items-center">testando o conteúdo</h1>
    </div>
  );
}
