import { useUFSData } from "@/context/IBGE_DataContext";
import { Address } from "@/types/types";
import { Label, Select, TextInput } from "flowbite-react";
import { useEffect } from "react";

interface AddressFormInterface {
  addressData: Address;
  handleAddressData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function AddressForm({ addressData, handleAddressData }: AddressFormInterface) {
  const { UFSData, selectedUFCities, setSelectedUF } = useUFSData();

  // useEffect HOOK TO UPDATE SELECTED UF AND CITY
  useEffect(() => {
    setSelectedUF(UFSData?.find((uf) => uf.nome === addressData.estado));
  }, [UFSData, addressData, setSelectedUF]);

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-center text-lg font-bold text-extraColor">INSIRA O ENDEREÇO</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex flex-col p-2">
          <Label>Logradouro</Label>
          <TextInput
            type="text"
            name="rua"
            placeholder="Rua, Avenida, Travessa..."
            value={addressData.rua}
            onChange={handleAddressData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Número</Label>
          <TextInput
            type="text"
            name="numero"
            placeholder="Número do Endereço"
            value={addressData.numero}
            onChange={handleAddressData}
            minLength={15}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Bairro</Label>
          <TextInput
            type="text"
            name="bairro"
            placeholder="Bairro do Endereço"
            value={addressData.bairro}
            onChange={handleAddressData}
            required
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Ponto de Referência</Label>
          <TextInput
            type="text"
            name="referencia"
            placeholder="Não Obrigatória!"
            value={addressData.referencia}
            onChange={handleAddressData}
          />
        </div>
        <div className="flex flex-col p-2">
          <Label>Estado</Label>
          <Select
            name="estado"
            value={addressData.estado}
            onChange={(e) => {
              setSelectedUF(UFSData?.find((uf) => uf.nome === e.target.value));
              handleAddressData(e);
            }}
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
          </Select>
        </div>
        <div className="flex flex-col p-2">
          <Label>Cidade</Label>
          <Select
            name="cidade"
            className="max-w-52"
            value={addressData.cidade}
            onChange={handleAddressData}
            disabled={!selectedUFCities?.length}
            required
          >
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            {selectedUFCities?.map((value) => {
              return <option key={value.id}>{value.nome}</option>;
            })}
          </Select>
        </div>
        <div className="flex flex-col p-2">
          <Label>Tipo de Localidade</Label>
          <Select name="zonaResidencial" value={addressData.zonaResidencial} onChange={handleAddressData} required>
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Rural">Rural</option>
            <option value="Urbana">Urbana</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
