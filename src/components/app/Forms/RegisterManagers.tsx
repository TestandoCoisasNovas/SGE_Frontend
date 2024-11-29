import { useDataBase } from "@/context/DB_DataContext";
import { Address, Endpoint, Managers, Methods, StatusResponse } from "@/types/types";
import AddressForm from "../FormsTemplates/AddressForm";
import { useState } from "react";
import { InitialAddressData, InitialManagersData } from "@/types/constValues";
import Loading from "@/components/utils/Loading";
import ConfirmationStatus from "@/components/utils/ConfirmationStatus";
import Button from "@/components/utils/Button";
import ManagersForm from "../FormsTemplates/ManagersForm";
import SchoolSearcher from "../Search/SchoolSearcher";

export default function RegisterManager() {
  const { infosGET, handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  // Admin State and Handler
  const [ManagerData, setAdminData] = useState<Managers>(InitialManagersData);
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
    // PHONE Mask
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
    // CPF Mask
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

  // Address State and Handler
  const [AdminAddress, setAdminAddress] = useState<Address>(InitialAddressData);
  const handleAdminAddress = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setAdminAddress({
      ...AdminAddress,
      [e.target.name]: e.target.value,
    });
  };

  const generateSHA256 = async (messageReceived: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(messageReceived);

    // Create Hash SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert the Hash Created to Hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!IsSchoolSelected) {
      alert("Selecione uma Escola! As opções abaixo serão desbloqueadas assim que uma escola selecionada.");
      return;
    } else if (!isCpfValid) {
      alert("CPF inválido! Certifique-se de que ele foi digitado corretamente.");
      return;
    }

    // Select only 6 first cpf numbers and generate SHA-256 hash
    const password = ManagerData.cpf.match(/\d{1,6}/)?.[0] || "";
    const hashedPassword = await generateSHA256(password);

    // Submit Handler for data, with swapped infos
    handleSubmitDataBase(
      {
        ...ManagerData,
        endereco: AdminAddress,
        password: hashedPassword,
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
            <ManagersForm managerData={ManagerData} handleManagerData={handleManagerData} />
            <AddressForm addressData={AdminAddress} handleAddressData={handleAdminAddress} />
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
