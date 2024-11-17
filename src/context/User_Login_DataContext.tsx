import { Methods, StatusResponse, User_Login_DataType } from "@/types/types";
import React, { createContext, useContext, useState } from "react";

// CONTEXT CREATED
type UserLoginContextType = {
  handleSubmitUserLogin: (infos: User_Login_DataType, methodSelection: Methods) => void;
  responseCode: number;
  setResponseCode: (value: React.SetStateAction<number>) => void;
};

export const UserLoginContext = createContext<UserLoginContextType>({
  handleSubmitUserLogin: () => undefined,
  responseCode: StatusResponse.Null,
  setResponseCode: () => null,
});

// useContext CREATED
export const useUserLoginData = () => {
  return useContext(UserLoginContext);
};

// CONTEXT REACT FUNCTION
export function UserLoginContextProvider(props: React.PropsWithChildren) {
  const [responseCode, setResponseCode] = useState<number>(StatusResponse.Null);
  // const [responseData, setResponseData] = useState()

  const handleSubmitUserLogin = (infos: User_Login_DataType, methodSelection: Methods) => {
    fetch(`http://localhost:8080/login`, {
      method: methodSelection,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infos),
    })
      .then((response) => {
        setResponseCode(response.status);
        // setResponseData(response.body)
      })
      .catch((error) => {
        setTimeout(() => setResponseCode(200), 1000); // DELETE IT
        console.log(error);
      });
  };

  return (
    <UserLoginContext.Provider value={{ handleSubmitUserLogin, responseCode, setResponseCode }}>
      {props.children}
    </UserLoginContext.Provider>
  );
}
