import Button from "@/components/utils/Button";
import { Address, Methods, SchoolDataType } from "@/types/types";
import { useState } from "react";
import AddressForm from "./AddressForm";
import { useSchoolData } from "@/context/School_DataContext";

export default function RegisterSchoolForm() {
  const { handleSubmitSchool } = useSchoolData();

  const [SchoolAddressFormData, setSchoolAddressFormData] = useState<Address>({
    rua: "",
    numero: "",
    bairro: "",
    referencia: "",
    cidade: "",
    estado: "",
    zonaResidencial: "",
  });

  const [SchoolFormData, setSchoolFormData] = useState<SchoolDataType>({
    inep: "",
    nomeEscola: "",
    cnpjEscola: "",
    situacao: "",
    telefone: "",
    endereco: SchoolAddressFormData,
  });

  const handleChangeSchoolData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    // CNPJ MASK
    if (e.target.name === "cnpj") {
      setSchoolFormData({
        ...SchoolFormData,
        cnpjEscola: e.target.value
          .replace(/\D/g, "")
          .replace(/^(\d{2})(\d)/, "$1.$2")
          .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
          .replace(/\.(\d{3})(\d)/, ".$1/$2")
          .replace(/(\d{4})(\d)/, "$1-$2"),
      });
    }
    // INEP MASK
    else if (e.target.name === "inep") {
      setSchoolFormData({
        ...SchoolFormData,
        inep: e.target.value.replace(/\D/g, ""),
      });
    }
    // PHONE MASK
    else if (e.target.name === "telefone") {
      setSchoolFormData({
        ...SchoolFormData,
        telefone: e.target.value
          .replace(/\D/g, "")
          .substring(0, 11)
          .replace(/(^\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4,5})(\d{4}$)/, "$1-$2"),
      });
    }
    // OTHERS
    else {
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
    handleSubmitSchool(
      {
        ...SchoolFormData,
        endereco: SchoolAddressFormData,
      },
      Methods.POST
    );
    console.log(
      "Dados enviados:",
      JSON.stringify({
        ...SchoolFormData,
        endereco: SchoolAddressFormData,
      })
    );
  };

  return (
    <div className="flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold">INSIRA OS DADOS DA ESCOLA ABAIXO</h1>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* BASE DATA SECTION */}
          <div className="flex flex-col p-2">
            <label>Nome</label>
            <input
              type="text"
              name="nomeEscola"
              value={SchoolFormData.nomeEscola}
              onChange={handleChangeSchoolData}
              required
            />
          </div>
          <div className="flex flex-col p-2">
            <label>CNPJ</label>
            <input
              type="text"
              name="cnpj"
              value={SchoolFormData.cnpjEscola}
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
            <select name="situacao" value={SchoolFormData.situacao} onChange={handleChangeSchoolData} required>
              <option hidden disabled value="">
                Selecione uma Opção
              </option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
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
