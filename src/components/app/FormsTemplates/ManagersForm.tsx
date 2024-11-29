import { Managers } from "@/types/types";
import IndividualForm from "./IndividualForm";

interface WorkerFormInterface {
  managerData: Managers;
  handleManagerData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ManagersForm({ managerData, handleManagerData }: WorkerFormInterface) {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-xl font-bold">INSIRA OS DADOS DO DIRETOR ABAIXO</h1>
      <div className="flex flex-wrap items-center justify-center">
        <IndividualForm individualData={managerData} handleIndividualData={handleManagerData} />
        <div className="flex flex-col p-2">
          <label>Cargo Exercido</label>
          <input type="text" name="cargo" value={managerData.cargo} onChange={handleManagerData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Nº Portaria</label>
          <input type="text" name="portaria" value={managerData.portaria} onChange={handleManagerData} required />
        </div>
      </div>
    </div>
  );
}
