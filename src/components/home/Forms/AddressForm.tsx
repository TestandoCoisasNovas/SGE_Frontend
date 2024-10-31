import { useUFSData } from "@/context/IBGE_DataContext";
import { Address } from "@/types/types";

interface AddressFormInterface {
  SchoolAddressFormData: Address;
  handleChangeSchoolAddressData: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function AddressForm({ SchoolAddressFormData, handleChangeSchoolAddressData }: AddressFormInterface) {
  const { UFSData, selectedUFCities, setSelectedUF } = useUFSData();

  return (
    <>
      {/* ADDRESS SECTION */}
      <div className="flex flex-col p-2">
        <label>Endereço</label>
        <input
          type="string"
          name="endereco"
          value={SchoolAddressFormData.endereco}
          onChange={handleChangeSchoolAddressData}
          required
        />
      </div>
      <div className="flex flex-col p-2">
        <label>Número</label>
        <input
          type="string"
          name="numero"
          value={SchoolAddressFormData.numero}
          onChange={handleChangeSchoolAddressData}
          required
        />
      </div>
      <div className="flex flex-col p-2">
        <label>Bairro</label>
        <input
          type="string"
          name="bairro"
          value={SchoolAddressFormData.bairro}
          onChange={handleChangeSchoolAddressData}
          required
        />
      </div>
      <div className="flex flex-col p-2">
        <label>Estado</label>
        <select
          name="estado"
          value={SchoolAddressFormData.estado}
          onChange={(e) => {
            handleChangeSchoolAddressData(e);
            setSelectedUF(e.target.value);
          }}
          disabled
        >
          <option hidden disabled value="">
            Selecione uma Opção
          </option>
          {UFSData?.map((value) => {
            return <option key={value.id}>{value.nome}</option>;
          })}
        </select>
      </div>
      <div className="flex flex-col p-2">
        <label>Cidade</label>
        <select
          name="cidade"
          value={SchoolAddressFormData.cidade}
          onChange={handleChangeSchoolAddressData}
          disabled={selectedUFCities?.length ? false : true}
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
      <div className="flex flex-col p-2">
        <label>Tipo de Localidade</label>
        <select
          name="tipoLocalidade"
          value={SchoolAddressFormData.tipoLocalidade}
          onChange={handleChangeSchoolAddressData}
          required
        >
          <option hidden disabled value="">
            Selecione uma Opção
          </option>
          <option value="Rural">Rural</option>
          <option value="Urbana">Urbana</option>
        </select>
      </div>
    </>
  );
}
