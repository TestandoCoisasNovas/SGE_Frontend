import { Managers } from "@/types/types";

interface WorkerFormInterface {
  managerData: Managers;
  handleManagerData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ManagersForm({ managerData, handleManagerData }: WorkerFormInterface) {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-xl font-bold">INSIRA OS DADOS DE DIRETOR</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <label>Cargo Exercido</label>
          <input type="text" name="cargo" value={managerData.cargo} onChange={handleManagerData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Nº Portaria</label>
          <input type="text" name="portaria" value={managerData.portaria} onChange={handleManagerData} required />
        </div>
      </div>
      <h1 className="opacity-75 animate-pulse">A senha padrão será os 6 primeiros dígitos do CPF!</h1>
    </div>
  );
}
