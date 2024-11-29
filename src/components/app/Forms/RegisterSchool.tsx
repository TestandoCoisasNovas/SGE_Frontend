import Button from "@/components/utils/Button";
import { Address, Endpoint, Methods, SchoolDataType, StatusResponse } from "@/types/types";
import { useEffect, useState } from "react";
import AddressForm from "../FormsTemplates/AddressForm";
import { useDataBase } from "@/context/DB_DataContext";
import Loading from "@/components/utils/Loading";
import ConfirmationStatus from "@/components/utils/ConfirmationStatus";
import { InitialAddressData, InitialSchoolData } from "@/types/constValues";
import SchoolForm from "../FormsTemplates/SchoolForm";

export default function RegisterSchool() {
  const { handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  const [SchoolFormData, setSchoolFormData] = useState<SchoolDataType>(InitialSchoolData);
  const [SchoolAddress, setSchoolAddress] = useState<Address>(InitialAddressData);

  const handleChangeSchoolData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    // CNPJ Mask
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
    // INEP Mask
    else if (e.target.name === "inep") {
      setSchoolFormData({
        ...SchoolFormData,
        inep: e.target.value.replace(/\D/g, ""),
      });
    }
    // PHONE Mask
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
    // Others
    else {
      setSchoolFormData({
        ...SchoolFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Address Handler
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
            <SchoolForm schoolData={SchoolFormData} handleSchoolData={handleChangeSchoolData} />
          </div>

          {/* ADDRESS DATA SECTION */}
          <AddressForm addressData={SchoolAddress} handleAddressData={handleSchoolAddressFormData} />
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
