import { Address, Description, Endpoint, Methods, School, StatusResponse } from "@/types/types";
import { useEffect, useState } from "react";
import AddressForm from "../FormsTemplates/AddressForm";
import { useDataBase } from "@/context/DB_DataContext";
import { InitialAddressData, InitialSchoolData } from "@/types/constValues";
import SchoolForm from "../FormsTemplates/SchoolForm";
import { twMerge } from "tailwind-merge";
import SendButton from "@/components/utils/SendButton";

export default function RegisterSchool() {
  const { handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  const [SchoolFormData, setSchoolFormData] = useState<School>(InitialSchoolData);
  const [SchoolAddress, setSchoolAddress] = useState<Address>(InitialAddressData);

  const handleChangeSchoolData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSchoolFormData({
      ...SchoolFormData,
      [e.target.name]: e.target.value,
    });
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
        // cspell: disable-next-line
        endereco: SchoolAddress,
      },
      Methods.POST,
      Endpoint.Escola,
      Description.RegisterSchool
    );
    setResponseCode(StatusResponse.Loading);
  };

  // RESET DATA WHEN SUCCESS SUBMIT
  useEffect(() => {
    if (responseCode === StatusResponse.Success) {
      setSchoolFormData(InitialSchoolData);
      setSchoolAddress(InitialAddressData);
    }
  }, [responseCode]);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center bg-foreground rounded-md pb-4 gap-4">
        <h1
          className={twMerge(
            "text-lg font-bold text-extraColor p-3 w-full text-center",
            "rounded-t-md bg-gray-500 dark:bg-gray-700"
          )}
        >
          CADASTRAR NOVA ESCOLA
        </h1>
        <fieldset
          className="flex flex-col items-center justify-center gap-4 lg:px-64"
          disabled={responseCode === StatusResponse.Loading ? true : false}
        >
          <SchoolForm schoolData={SchoolFormData} handleSchoolData={handleChangeSchoolData} />
          <AddressForm addressData={SchoolAddress} handleAddressData={handleSchoolAddressFormData} />
        </fieldset>

        <SendButton type="submit">Cadastrar Escola</SendButton>
      </form>
    </>
  );
}
