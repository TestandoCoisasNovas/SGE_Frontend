import { Individual } from "@/types/types";

interface IndividualFormInterface {
  individualData: Individual;
  handleIndividualData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function IndividualForm({ individualData, handleIndividualData }: IndividualFormInterface) {
  return (
    <>
      <div className="flex flex-col p-2">
        <label>Nome</label>
        <input type="text" name="nome" value={individualData.nome} onChange={handleIndividualData} required />
      </div>
      <div className="flex flex-col p-2">
        <label>Telefone</label>
        <input type="text" name="telefone" value={individualData.telefone} onChange={handleIndividualData} required />
      </div>
      <div className="flex flex-col p-2">
        <label>E-mail</label>
        <input type="email" name="email" value={individualData.email} onChange={handleIndividualData} required />
      </div>
      <div className="flex flex-col p-2">
        <label>CPF</label>
        <input
          type="text"
          name="cpf"
          value={individualData.cpf}
          onChange={handleIndividualData}
          minLength={14}
          maxLength={14}
          required
        />
      </div>
      <div className="flex flex-col p-2">
        <label>RG</label>
        <input type="text" name="rg" value={individualData.rg} onChange={handleIndividualData} required />
      </div>
      <div className="flex flex-col p-2">
        <label>Data de Nascimento</label>
        <input
          type="date"
          name="dataNascimento"
          value={individualData.dataNascimento}
          onChange={handleIndividualData}
          required
        />
      </div>
      <div className="flex flex-col p-2">
        <label>Nome da Mãe</label>
        <input type="text" name="nomeMae" value={individualData.nomeMae} onChange={handleIndividualData} required />
      </div>
      <div className="flex flex-col p-2">
        <label>Nome do Pai</label>
        <input type="text" name="nomePai" value={individualData.nomePai} onChange={handleIndividualData} />
      </div>
      <div className="flex flex-col p-2">
        <label>Estado Civil</label>
        <select name="estadoCivil" value={individualData.estadoCivil} onChange={handleIndividualData} required>
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
          value={individualData.nomeConjuge}
          onChange={handleIndividualData}
          disabled={individualData.estadoCivil !== "Casado"}
          required={individualData.estadoCivil === "Casado"}
        />
      </div>
      <div className="flex flex-col p-2">
        <label>Telefone do Cônjuge</label>
        <input
          type="text"
          name="foneConjuge"
          value={individualData.foneConjuge}
          onChange={handleIndividualData}
          disabled={individualData.estadoCivil !== "Casado"}
          required={individualData.estadoCivil === "Casado"}
        />
      </div>
    </>
  );
}
