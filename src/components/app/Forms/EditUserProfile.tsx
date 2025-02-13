import { useDataBase } from "@/context/DB_DataContext";
import { Address, Employee } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useUFSData } from "@/context/IBGE_DataContext";
import { InitialAddressData } from "@/types/constValues";
import { twMerge } from "tailwind-merge";

export default function EditUserProfile() {
  const { UFSData, selectedUFCities, setSelectedUF } = useUFSData();
  const { backendUserData } = useDataBase();

  useEffect(() => {
    const selectedUF = UFSData?.find((uf) => uf.nome === backendUserData?.endereco.estado);
    setSelectedUF(selectedUF ? selectedUF.sigla : null);
  }, [UFSData, backendUserData, setSelectedUF]);

  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    // Aqui você pode integrar sua função de envio para o backend.
    console.log("Dados salvos:", userData);
    setIsEditing(false);
  };

  const inputsDesign = twMerge(
    "flex p-2 w-full rounded-md border-gray-300 shadow-sm",
    "focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    isEditing ? "bg-white" : "bg-background border-background shadow-none appearance-none pr-7"
  );

  const labelsDesign = twMerge("text-sm font-medium text-gray-700");

  return (
    <div>
      <form>
        <h1 className="text-2xl font-semibold mt-4 mb-2">Meus Dados</h1>
        {/* USER PERSONAL DATA */}
        <div>
          <label className={labelsDesign}>Nome Completo</label>
          <input
            type="text"
            name="nome"
            value={userData.nome}
            onChange={handleChanges}
            className={inputsDesign}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label className={labelsDesign}>Email de Contato</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChanges}
            className={inputsDesign}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label className={labelsDesign}>Telefone</label>
          <input
            type="text"
            name="telefone"
            value={userData.telefone}
            onChange={handleMasks}
            className={inputsDesign}
            disabled={!isEditing}
            required
          />
        </div>
        {/* USER ADDRESS DATA */}
        <h1 className="text-2xl font-semibold mt-4 mb-2">Endereço</h1>
        <div>
          <label className={labelsDesign}>Logradouro</label>
          <input
            type="string"
            name="rua"
            value={userAddress.rua}
            onChange={handleUserAddress}
            className={inputsDesign}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label className={labelsDesign}>Número</label>
          <input
            type="string"
            name="numero"
            value={userAddress.numero}
            onChange={handleChanges}
            className={inputsDesign}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label className={labelsDesign}>Bairro</label>
          <input
            type="string"
            name="bairro"
            value={userAddress.bairro}
            onChange={handleUserAddress}
            className={inputsDesign}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label className={labelsDesign}>Ponto de Referência</label>
          <input
            type="string"
            name="referencia"
            value={userAddress.referencia}
            onChange={handleUserAddress}
            className={inputsDesign}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className={labelsDesign}>Estado</label>
          <select
            name="estado"
            value={userAddress.estado}
            onChange={(e) => {
              const selectedOption = UFSData?.find((uf) => uf.nome === e.target.value);
              if (selectedOption) {
                setSelectedUF(selectedOption.sigla);
              }
              handleUserAddress(e);
            }}
            className={inputsDesign}
            disabled={!isEditing}
            required
          >
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            {UFSData?.map((value) => {
              return (
                <option key={value.id} value={value.nome}>
                  {value.nome}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label className={labelsDesign}>Cidade</label>
          <select
            name="cidade"
            value={userAddress.cidade}
            onChange={handleUserAddress}
            className={inputsDesign}
            disabled={!selectedUFCities?.length || !isEditing}
            required
          >
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            {selectedUFCities?.map((value) => {
              return <option key={value.id}>{value.nome}</option>;
            })}
          </select>
        </div>
        <div>
          <label className={labelsDesign}>Tipo de Localidade</label>
          <select
            name="zonaResidencial"
            value={userAddress.zonaResidencial}
            onChange={handleUserAddress}
            className={inputsDesign}
            disabled={!isEditing}
            required
          >
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Rural">Rural</option>
            <option value="Urbana">Urbana</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end py-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none"
            >
              Editar
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm focus:outline-none"
            >
              Salvar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
