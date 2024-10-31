import { Methods, SchoolDataType } from "@/types/types";
import React, { createContext, useContext, useState, useEffect } from "react";

// INTERFACE FOR SUBMITS
interface InfoSUBMIT {
  id: string;
}

// CONTEXT CREATED
type SchoolDataContextType = {
  handleSubmit: (infos: InfoSUBMIT, methodSelection: Methods) => void;
  infosReceived: SchoolDataType[] | null;
  responseCode: number;
  setResponseCode: (value: React.SetStateAction<number>) => void;
};

export const SchoolDataContext = createContext<SchoolDataContextType>({
  handleSubmit: () => undefined,
  infosReceived: null,
  responseCode: 0,
  setResponseCode: () => null,
});

// useContext CREATED
export const useSchoolData = () => {
  return useContext(SchoolDataContext);
};

// CONTEXT REACT FUNCTION
export function SchoolDataContextProvider(loteInfos: React.PropsWithChildren) {
  const [infosReceived, setInfosReceived] = useState<SchoolDataType[] | null>(null);
  const [responseCode, setResponseCode] = useState<number>(0);

  useEffect(() => {
    fetch(``, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: SchoolDataType[]) => {
        setInfosReceived(data);
      })
      .catch((error) => console.error(error));
  }, [responseCode]);

  const handleSubmit = (infos: InfoSUBMIT, methodSelection: Methods) => {
    fetch(``, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infos),
    })
      .then((response) => {
        setResponseCode(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SchoolDataContext.Provider value={{ infosReceived, handleSubmit, responseCode, setResponseCode }}>
      {loteInfos.children}
    </SchoolDataContext.Provider>
  );
}
