import Button from "@/components/utils/Button";
import { Address, Endpoint, Methods, SchoolDataType, StatusResponse } from "@/types/types";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import { useDataBase } from "@/context/DB_DataContext";
import Loading from "@/components/utils/Loading";
import ConfirmationStatus from "@/components/utils/ConfirmationStatus";
import { InitialAddressData, InitialSchoolData } from "@/types/constValues";

export default function RegisterSchool() {
  const { handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  const [SchoolFormData, setSchoolFormData] = useState<SchoolDataType>(InitialSchoolData);
  const [SchoolAddress, setSchoolAddress] = useState<Address>(InitialAddressData);

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

  // ADDRESS HANDLER
  const handleSchoolAddressFormData = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSchoolAddress({
      ...SchoolAddress,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT CONTEXT HANDLER
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitDataBase(
      {
        ...SchoolFormData,
        endereco: SchoolAddress,
      },
      Methods.POST,
      Endpoint.Escola
    );
    setResponseCode(StatusResponse.Loading);
  };

  useEffect(() => {
    if (responseCode === StatusResponse.Success) {
      setSchoolFormData(InitialSchoolData);
      setSchoolAddress(InitialAddressData);
      setTimeout(() => {
        setResponseCode(StatusResponse.Null);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseCode]);

  return (
    <div className="flex px-4" onClick={() => setResponseCode(StatusResponse.Null)}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <fieldset
          className="flex flex-col items-center justify-center gap-3"
          disabled={responseCode === StatusResponse.Loading ? true : false}
        >
          <h1 className="text-xl font-bold">INSIRA OS DADOS DA ESCOLA ABAIXO</h1>
          {/* SCHOOL DATA SECTION */}
          <div className="flex flex-wrap items-center justify-center">
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
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
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
            <div className="flex flex-col p-2">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={SchoolFormData.email}
                onChange={handleChangeSchoolData}
                required
              />
            </div>
          </div>

          {/* ADDRESS DATA SECTION */}
          <AddressForm AddressFormData={SchoolAddress} handleAddressFormData={handleSchoolAddressFormData} />
        </fieldset>

        <div>
          {responseCode === StatusResponse.Loading ? (
            <Loading width={40} />
          ) : responseCode === StatusResponse.Success || responseCode === StatusResponse.Error ? (
            <ConfirmationStatus statusResponse={responseCode} />
          ) : (
            responseCode === StatusResponse.Null && <Button type="submit">Enviar Dados</Button>
          )}
        </div>
      </form>
    </div>
  );
}
