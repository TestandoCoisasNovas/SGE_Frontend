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
          <SchoolForm schoolData={SchoolFormData} handleSchoolData={handleChangeSchoolData} />
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
