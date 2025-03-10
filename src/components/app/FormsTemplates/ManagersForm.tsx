import { Managers } from "@/types/types";
import { Label, Select, TextInput } from "flowbite-react";

interface WorkerFormInterface {
  managerData: Managers;
  handleManagerData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ManagersForm({ managerData, handleManagerData }: WorkerFormInterface) {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-center text-lg font-bold text-extraColor">INSIRA OS DADOS DE DIRETOR</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <Label>Cargo Exercido</Label>
          <Select name="cargo" value={managerData.cargo} onChange={handleManagerData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Diretor">Diretor</option>
            <option value="Secretário">Secretário</option>
            <option value="Secretário-Adjunto">Separado-Adjunto</option>
          </Select>
        </div>
        <div className="flex flex-col p-2">
          <Label>Nº Portaria</Label>
          <TextInput type="text" name="portaria" placeholder="Número da Portaria" value={managerData.portaria} onChange={handleManagerData} required />
        </div>
      </div>
    </div>
  );
}
