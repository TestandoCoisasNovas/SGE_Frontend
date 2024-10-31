import Button from "@/components/utils/Button";
import { Address, SchoolDataType } from "@/types/types";
import { useState } from "react";
import AddressForm from "./AddressForm";

export default function RegisterSchoolForm() {
  const [SchoolAddressFormData, setSchoolAddressFormData] = useState<Address>({
    id: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "Piauí",
    tipoLocalidade: "",
  });

  const [SchoolFormData, setSchoolFormData] = useState<SchoolDataType>({
    id: "",
    inep: "",
    nome: "",
    cnpj: "",
    situacao: "",
    telefone: "",
    localizacao: SchoolAddressFormData,
  });

  const handleChangeSchoolData = (e: React.ChangeEvent<HTMLInputElement>) => {
    // CNJP MASK
    if (e.target.name === "cnpj") {
      setSchoolFormData({
        ...SchoolFormData,
        cnpj: e.target.value
          .replace(/\D/g, "")
          .replace(/^(\d{2})(\d)/, "$1.$2")
          .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
          .replace(/\.(\d{3})(\d)/, ".$1/$2")
          .replace(/(\d{4})(\d)/, "$1-$2"),
      });
      // INEP MASK
    } else if (e.target.name === "inep") {
      setSchoolFormData({
        ...SchoolFormData,
        inep: e.target.value.replace(/\D/g, ""),
      });
      // PHONE MASK
    } else if (e.target.name === "telefone") {
      setSchoolFormData({
        ...SchoolFormData,
        telefone: e.target.value
          .replace(/\D/g, "")
          .substring(0, 11)
          .replace(/(^\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4,5})(\d{4}$)/, "$1-$2"),
      });
      // OTHERS
    } else {
      setSchoolFormData({
        ...SchoolFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeSchoolAddressData = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSchoolAddressFormData({
      ...SchoolAddressFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", SchoolFormData);
    // Lógica para envio dos dados
  };

  return (
    <div className="flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold">INSIRA OS DADOS DA ESCOLA ABAIXO</h1>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* BASE DATA SECTION */}
          <div className="flex flex-col p-2">
            <label>Nome</label>
            <input type="text" name="nome" value={SchoolFormData.nome} onChange={handleChangeSchoolData} required />
          </div>
          <div className="flex flex-col p-2">
            <label>CNPJ</label>
            <input
              type="text"
              name="cnpj"
              value={SchoolFormData.cnpj}
              onChange={handleChangeSchoolData}
              minLength={18}
              maxLength={18}
              required
            />
          </div>
          <div className="flex flex-col p-2">
            <label>INEP</label>
            <input
              type="text"
              name="inep"
              value={SchoolFormData.inep}
              onChange={handleChangeSchoolData}
              minLength={8}
              maxLength={8}
              required
            />
          </div>
          <div className="flex flex-col p-2">
            <label>Situação</label>
            <input
              type="text"
              name="situacao"
              value={SchoolFormData.situacao}
              onChange={handleChangeSchoolData}
              required
            />
          </div>
          <div className="flex flex-col p-2">
            <label>Telefone</label>
            <input
              type="string"
              name="telefone"
              value={SchoolFormData.telefone}
              onChange={handleChangeSchoolData}
              minLength={15}
              maxLength={15}
              required
            />
          </div>
          <AddressForm
            SchoolAddressFormData={SchoolAddressFormData}
            handleChangeSchoolAddressData={handleChangeSchoolAddressData}
          />
        </div>
        <Button type="submit">Enviar Dados</Button>
      </form>
    </div>
  );
}
