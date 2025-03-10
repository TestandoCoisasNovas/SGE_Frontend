import { Address, Description, Endpoint, Methods, School, StatusResponse } from "@/types/types";
import { FormEvent, useEffect, useState } from "react";
import AddressForm from "../FormsTemplates/AddressForm";
import { useDataBase } from "@/context/DB_DataContext";
import { InitialAddressData, InitialSchoolData } from "@/types/constValues";
import SchoolForm from "../FormsTemplates/SchoolForm";
import SendButton from "@/components/utils/SendButton";
import { Button } from "flowbite-react";
import { ConfirmationModal } from "@/components/utils/ConfirmationModal";

interface EditSchoolInterface {
  selectedSchoolData: School;
  selectedSchoolAddress: Address;
}

export default function EditSchool({ selectedSchoolData, selectedSchoolAddress }: EditSchoolInterface) {
  const { handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  const [SchoolFormData, setSchoolFormData] = useState<School>(selectedSchoolData);
  const [SchoolAddress, setSchoolAddress] = useState<Address>(selectedSchoolAddress);

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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitDataBase(
      {
        ...SchoolFormData,
        // cspell: disable-next-line
        endereco: SchoolAddress,
      },
      Methods.PUT,
      Endpoint.Escola,
      Description.EditSchoolData
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

  // EDIT OPTION BOOLEAN
  const [showSendConfirmation, setShowSendConfirmation] = useState<boolean>(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  useEffect(() => {
    if (responseCode === StatusResponse.Success) {
      setTimeout(() => setIsEditing(false), 100);
    }
  }, [responseCode]);

  return (
    <>
      <form className="flex flex-col items-center bg-foreground rounded-md pb-4 gap-4">
        <fieldset
          className="flex flex-col items-center justify-center gap-4 lg:px-64"
          disabled={!isEditing || responseCode === StatusResponse.Loading ? true : false}
        >
          <SchoolForm schoolData={SchoolFormData} handleSchoolData={handleChangeSchoolData} />
          <AddressForm addressData={SchoolAddress} handleAddressData={handleSchoolAddressFormData} />
        </fieldset>

        {!isEditing ? (
          <Button type="button" color="purple" onClick={() => setIsEditing(true)}>
            Editar Escola
          </Button>
        ) : (
          <div className="flex gap-3">
            <SendButton
              type={undefined}
              onClick={() => (responseCode === StatusResponse.Null ? setShowSendConfirmation(true) : null)}
            >
              Salvar Edições
            </SendButton>
            <Button
              color="failure"
              onClick={() => setShowCancelConfirmation(true)}
              disabled={responseCode === StatusResponse.Loading ? true : false}
            >
              Cancelar
            </Button>
          </div>
        )}

        {/* SEND ACTION - CONFIRMATION MODAL */}
        <ConfirmationModal showConfirmation={showSendConfirmation} setShowConfirmation={setShowSendConfirmation}>
          <h3 className="mb-5 text-lg font-normal text-extraColor">
            Tem certeza que deseja alterar os dados desta escola?
          </h3>
          <div className="flex justify-center gap-4">
            <Button type="button" color="info" onClick={(e) => (handleSubmit(e), setShowSendConfirmation(false))}>
              Sim, tenho certeza!
            </Button>
            <Button color="failure" onClick={() => setShowSendConfirmation(false)}>
              Não, cancelar
            </Button>
          </div>
        </ConfirmationModal>

        {/* CANCEL ACTION - CONFIRMATION MODAL */}
        <ConfirmationModal showConfirmation={showCancelConfirmation} setShowConfirmation={setShowCancelConfirmation}>
          <h3 className="mb-5 text-lg font-normal text-extraColor">
            Tem certeza que deseja cancelar? Os dados editados serão perdidos.
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="info"
              onClick={() => (
                setIsEditing(false),
                setSchoolFormData(selectedSchoolData),
                setSchoolAddress(selectedSchoolAddress),
                setShowCancelConfirmation(false)
              )}
            >
              Sim, cancelar!
            </Button>
            <Button color="failure" onClick={() => setShowCancelConfirmation(false)}>
              Não, continuar editando.
            </Button>
          </div>
        </ConfirmationModal>
      </form>
    </>
  );
}
