import { useUFSData } from "@/context/IBGE_DataContext";
import { Address } from "@/types/types";

interface AddressFormInterface {
  AddressFormData: Address;
  handleAddressFormData: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function AddressForm({ AddressFormData, handleAddressFormData }: AddressFormInterface) {
  const { UFSData, selectedUFCities, setSelectedUF } = useUFSData();

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-xl font-bold">INSIRA O ENDEREÇO</h1>
      <div className="flex flex-wrap items-center justify-center">
        {/* ADDRESS SECTION */}
        <div className="flex flex-col p-2">
          <label>Logradouro</label>
          <input type="string" name="rua" value={AddressFormData.rua} onChange={handleAddressFormData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Número</label>
          <input type="string" name="numero" value={AddressFormData.numero} onChange={handleAddressFormData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Bairro</label>
          <input type="string" name="bairro" value={AddressFormData.bairro} onChange={handleAddressFormData} required />
        </div>
        <div className="flex flex-col p-2">
          <label>Ponto de Referência</label>
          <input type="string" name="referencia" value={AddressFormData.referencia} onChange={handleAddressFormData} />
        </div>
        <div className="flex flex-col p-2">
          <label>Estado</label>
          <select
            name="estado"
            value={AddressFormData.estado}
            onChange={(e) => {
              const selectedOption = UFSData?.find((uf) => uf.nome === e.target.value);
              if (selectedOption) {
                setSelectedUF(selectedOption.sigla);
              }
              handleAddressFormData(e);
            }}
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
        <div className="flex flex-col p-2">
          <label>Cidade</label>
          <select
            name="cidade"
            className="max-w-52"
            value={AddressFormData.cidade}
            onChange={handleAddressFormData}
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
            name="zonaResidencial"
            value={AddressFormData.zonaResidencial}
            onChange={handleAddressFormData}
            required
          >
            <option hidden disabled value="">
              Selecione uma Opção
            </option>
            <option value="Rural">Rural</option>
            <option value="Urbana">Urbana</option>
          </select>
        </div>
      </div>
    </div>
  );
}
