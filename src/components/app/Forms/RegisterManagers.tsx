import { useDataBase } from "@/context/DB_DataContext";
import { Address, Endpoint, Managers, Methods, StatusResponse } from "@/types/types";
import AddressForm from "./AddressForm";
import { useState } from "react";
import { InitialAddressData, InitialWorkerData } from "@/types/constValues";
import Loading from "@/components/utils/Loading";
import ConfirmationStatus from "@/components/utils/ConfirmationStatus";
import Button from "@/components/utils/Button";
import ManagersForm from "./ManagersForm";
import SchoolSearcher from "../Search/SchoolSearcher";

export default function RegisterManager() {
  const { infosGET, handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  // ADMIN STATE AND HANDLER
  const [ManagerData, setAdminData] = useState<Managers>(InitialWorkerData);
  const [IsSchoolSelected, setIsSchoolSelected] = useState<boolean>(false);

  const [isCpfValid, setIsCpfValid] = useState(false);

  const handleManagerData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedSchool = infosGET?.find((school) => school.nomeEscola === value);

    if (name === "escola" && selectedSchool) {
      setAdminData({
        ...ManagerData,
        escola: {
          id: selectedSchool.id,
          inep: selectedSchool.inep,
          nomeEscola: selectedSchool.nomeEscola,
          cnpjEscola: selectedSchool.cnpjEscola,
          situacao: selectedSchool.situacao,
          telefone: selectedSchool.telefone,
          email: selectedSchool.email,
          endereco: selectedSchool.endereco,
          diretorResponsavel: selectedSchool.diretorResponsavel,
          professores: selectedSchool.professores,
        },
      });
      setIsSchoolSelected(true);
    }
    // PHONE MASK
    else if (name === "telefone") {
      setAdminData({
        ...ManagerData,
        telefone: value
          .replace(/\D/g, "")
          .substring(0, 11)
          .replace(/(^\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4,5})(\d{4}$)/, "$1-$2"),
      });
    }
    // CPF MASK
    else if (name === "cpf") {
      const updatedCpf = value
        .replace(/\D/g, "")
        .substring(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

      setAdminData({ ...ManagerData, cpf: updatedCpf });
      setIsCpfValid(updatedCpf.length === 14);
      return;
    } else {
      setAdminData({
        ...ManagerData,
        [name]: value,
      });
    }
  };

  // ADDRESS STATE AND HANDLER
  const [AdminAddress, setAdminAddress] = useState<Address>(InitialAddressData);
  const handleAdminAddress = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setAdminAddress({
      ...AdminAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!IsSchoolSelected) {
      alert("Selecione uma Escola! As opções abaixo serão desbloqueadas assim que uma escola selecionada.");
      return;
    } else if (!isCpfValid) {
      alert("CPF inválido! Certifique-se de que ele foi digitado corretamente.");
      return;
    }

    handleSubmitDataBase(
      {
        ...ManagerData,
        endereco: AdminAddress,
      },
      Methods.POST,
      Endpoint.Diretor
    );
    setResponseCode(StatusResponse.Loading);
  };

  return (
    <div className="flex px-4" onClick={() => setResponseCode(StatusResponse.Null)}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <fieldset
          className="flex flex-col items-center justify-center gap-10"
          disabled={responseCode === StatusResponse.Loading ? true : false}
        >
          {/* SCHOOL SELECT SECTION */}
          <SchoolSearcher baseInfo={ManagerData} handler={handleManagerData} infosGET={infosGET} />

          {/* DIRETOR/SECRETARIO DATA SECTION */}
          <fieldset className="flex flex-col items-center justify-center gap-10" disabled={!IsSchoolSelected}>
            <ManagersForm AdminData={ManagerData} handleAdminData={handleManagerData} />
            <AddressForm AddressFormData={AdminAddress} handleAddressFormData={handleAdminAddress} />
          </fieldset>
        </fieldset>

        {/* BUTTON SENDER AND STATUS */}
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
