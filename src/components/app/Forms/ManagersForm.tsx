import { Managers } from "@/types/types";

interface WorkerFormInterface {
  AdminData: Managers;
  handleAdminData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ManagersForm({ AdminData, handleAdminData }: WorkerFormInterface) {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-xl font-bold">INSIRA OS DADOS DO DIRETOR ABAIXO</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <label>Nome</label>
          <input type="text" name="nome" value={AdminData.nome} onChange={handleAdminData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Telefone</label>
          <input type="text" name="telefone" value={AdminData.telefone} onChange={handleAdminData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            value={AdminData.cpf}
            onChange={handleAdminData}
            minLength={14}
            maxLength={14}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label>RG</label>
          <input type="text" name="rg" value={AdminData.rg} onChange={handleAdminData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={AdminData.dataNascimento}
            onChange={handleAdminData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Nome da Mãe</label>
          <input type="text" name="nomeMae" value={AdminData.nomeMae} onChange={handleAdminData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Nome do Pai</label>
          <input type="text" name="nomePai" value={AdminData.nomePai} onChange={handleAdminData} />
        </div>
        <div className="flex flex-col p-2">
          <label>E-mail</label>
          <input type="email" name="email" value={AdminData.email} onChange={handleAdminData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Estado Civil</label>
          <select name="estadoCivil" value={AdminData.estadoCivil} onChange={handleAdminData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Separado">Separado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viúvo">Viúvo</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          <label>Nome do Cônjuge</label>
          <input
            type="text"
            name="nomeConjuge"
            value={AdminData.nomeConjuge}
            onChange={handleAdminData}
            disabled={AdminData.estadoCivil !== "Casado"}
            required={AdminData.estadoCivil === "Casado"}
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Telefone do Cônjuge</label>
          <input
            type="text"
            name="foneConjuge"
            value={AdminData.foneConjuge}
            onChange={handleAdminData}
            disabled={AdminData.estadoCivil !== "Casado"}
            required={AdminData.estadoCivil === "Casado"}
          />
        </div>
        <div className="flex flex-col p-2">
          <label>Cargo Exercido</label>
          <input type="text" name="cargo" value={AdminData.cargo} onChange={handleAdminData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Nº Portaria</label>
          <input type="text" name="portaria" value={AdminData.portaria} onChange={handleAdminData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Senha de Acesso</label>
          <input type="password" name="password" value={AdminData.password} onChange={handleAdminData} required />
        </div>
        {/* <div className="flex flex-col p-2">
          <label>Confirme a Senha de Acesso</label>
          <input type="password" name="password" value={AdminData.password} onChange={handleAdminData} required />
        </div> */}
      </div>
    </div>
  );
}
