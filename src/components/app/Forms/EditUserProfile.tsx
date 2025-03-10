import { useDataBase } from "@/context/DB_DataContext";
import { Address, Description, Employee, Endpoint, Methods, StatusResponse } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useUFSData } from "@/context/IBGE_DataContext";
import { InitialAddressData } from "@/types/constValues";
import { Button, Label, TextInput } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import AddressForm from "../FormsTemplates/AddressForm";
import SendButton from "@/components/utils/SendButton";

// cspell: disable

export default function EditUserProfile() {
  const { UFSData, setSelectedUF } = useUFSData();
  const { backendUserData, handleSubmitDataBase, responseCode, setResponseCode } = useDataBase();

  useEffect(() => {
    setSelectedUF(UFSData?.find((uf) => uf.nome === backendUserData?.endereco.estado));
  }, [UFSData, backendUserData, setSelectedUF]);

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (responseCode === StatusResponse.Success) {
      setTimeout(() => setIsEditing(false), 100);
    }
  }, [responseCode]);

  const [userData, setUserData] = useState<Partial<Employee>>({
    nome: backendUserData?.nome,
    telefone: backendUserData?.telefone,
    email: backendUserData?.email,
  });

  const [userAddress, setUserAddress] = useState<Address>({
    ...(backendUserData ? backendUserData?.endereco : InitialAddressData),
  });
  const handleUserAddress = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setUserAddress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMasks = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    // PHONE Mask
    if (name === "telefone" || name === "foneConjuge") {
      const maskedPhone = e.target.value
        .replace(/\D/g, "")
        .substring(0, 11)
        .replace(/(^\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4}$)/, "$1-$2");

      const event = {
        ...e,
        target: {
          ...e.target,
          name,
          value: maskedPhone,
        },
      };
      handleChanges(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Submit Handler for data, with swapped infos
    handleSubmitDataBase(
      { ...userData, ...userAddress },
      Methods.POST,
      Endpoint.EditarFuncionário + backendUserData?.cpf,
      Description.EditUserProfile
    );

    setResponseCode(StatusResponse.Loading);
  };

  return (
    <>
      <form className="flex flex-col items-center bg-foreground rounded-md pb-4 gap-4" onSubmit={handleSubmit}>
        <h1
          className={twMerge(
            "text-lg font-bold text-extraColor p-3 w-full text-center",
            "rounded-t-md bg-gray-500 dark:bg-gray-700"
          )}
        >
          Editar Meus Dados
        </h1>
        <fieldset
          disabled={!isEditing || responseCode === StatusResponse.Loading ? true : false}
          className="flex flex-col items-center justify-center gap-4"
        >
          {/* USER PERSONAL DATA */}
          <div className="flex flex-col w-full max-w-[500px]">
            <div>
              <Label>Nome Completo</Label>
              <TextInput type="text" name="nome" value={userData.nome} onChange={handleChanges} required />
            </div>
            <div>
              <Label>Email de Contato</Label>
              <TextInput
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChanges}
                required
              />
            </div>
            <div>
              <Label>Telefone</Label>
              <TextInput type="text" name="telefone" value={userData.telefone} onChange={handleMasks} required />
            </div>
            {/* USER ADDRESS DATA */}
            <div className="mt-2">
              <AddressForm addressData={userAddress} handleAddressData={handleUserAddress} />
            </div>
          </div>
        </fieldset>
        {/* BUTTONS */}
        <div className="flex justify-end py-2">
          {!isEditing ? (
            <Button type="button" color="purple" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          ) : (
            <div className="flex gap-3">
              <SendButton type="submit"> Salvar Edições</SendButton>
              <Button
                color="red"
                onClick={() => (
                  setIsEditing(false),
                  setUserData({
                    nome: backendUserData?.nome,
                    telefone: backendUserData?.telefone,
                    email: backendUserData?.email,
                  }),
                  setUserAddress({
                    ...(backendUserData ? backendUserData?.endereco : InitialAddressData),
                  })
                )}
                disabled={responseCode === StatusResponse.Loading ? true : false}
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
