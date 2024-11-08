import pack from "../../../package.json";

export default function Footer() {
  return (
    <div className="flex justify-end px-3 select-none bg-tertiary">
      <p>Versão {pack.version}</p>
    </div>
  );
}
