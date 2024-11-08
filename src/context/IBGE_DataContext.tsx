import { IBGE_CITIES_DataType, IBGE_UF_DataType } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";

type UFsDataContextType = {
  UFSData: IBGE_UF_DataType[] | null;
  setSelectedUF: React.Dispatch<React.SetStateAction<string | null>>;
  selectedUFCities: IBGE_CITIES_DataType[] | null;
};

// contexto criado
export const UFsDataContext = createContext<UFsDataContextType>({
  UFSData: null,
  setSelectedUF: () => null,
  selectedUFCities: null,
});

// usar o contexto criado
export const useUFSData = () => {
  return useContext(UFsDataContext);
};

// react func do context
export function UFsDataContextProvider(props: React.PropsWithChildren) {
  const [UFSData, setUFSData] = useState<IBGE_UF_DataType[] | null>(null);
  const [selectedUF, setSelectedUF] = useState<string | null>(null);
  const [selectedUFCities, setSelectedUFCities] = useState<IBGE_CITIES_DataType[] | null>(null);

  useEffect(() => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: IBGE_UF_DataType[]) => {
        setUFSData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF ? selectedUF : ""}/municipios`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: IBGE_CITIES_DataType[]) => {
        setSelectedUFCities(data);
      })
      .catch((error) => console.error(error));
  }, [selectedUF]);

  return (
    <UFsDataContext.Provider value={{ UFSData, setSelectedUF, selectedUFCities }}>
      {props.children}
    </UFsDataContext.Provider>
  );
}
