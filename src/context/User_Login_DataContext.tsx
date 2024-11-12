import { Methods, User_Login_DataType } from "@/types/types";
import React, { createContext, useContext, useState } from "react";

// CONTEXT CREATED
type UserLoginContextType = {
  handleSubmitUserLogin: (infos: User_Login_DataType, methodSelection: Methods) => void;
  responseCode: number;
  setResponseCode: (value: React.SetStateAction<number>) => void;
};

export const UserLoginContext = createContext<UserLoginContextType>({
  handleSubmitUserLogin: () => undefined,
  responseCode: 0,
  setResponseCode: () => null,
});

// useContext CREATED
export const useUserLoginData = () => {
  return useContext(UserLoginContext);
};

// CONTEXT REACT FUNCTION
export function UserLoginContextProvider(props: React.PropsWithChildren) {
  const [responseCode, setResponseCode] = useState<number>(0);

  const handleSubmitUserLogin = (infos: User_Login_DataType, methodSelection: Methods) => {
    fetch(`http://localhost:8080/user`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infos),
    })
      .then((response) => {
        setResponseCode(response.status);
        console.log("Renderizou o envio do Login");
        console.log("Resposta do Backend:", response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserLoginContext.Provider value={{ handleSubmitUserLogin, responseCode, setResponseCode }}>
      {props.children}
    </UserLoginContext.Provider>
  );
}
