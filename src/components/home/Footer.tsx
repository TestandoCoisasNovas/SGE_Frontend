// import Link from "next/link";
import pack from "../../../../package.json";

export default function Footer() {
  return (
    <div className="text-center text-white select-none">
      <div className="flex justify-center text-center">
        <p>
          Versão {pack.version}
        </p>
      </div>
    </div>
  );
}
