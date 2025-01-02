import { Methods, StatusResponse, User_Login_DataType } from "@/types/types";
import React, { createContext, useContext, useState } from "react";

// Context Created
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

// useContext Created
export const useUserLoginData = () => {
  return useContext(UserLoginContext);
};

// CONTEXT REACT FUNCTION
export function UserLoginContextProvider(props: React.PropsWithChildren) {
  const [responseCode, setResponseCode] = useState<number>(StatusResponse.Null);
  // const [responseData, setResponseData] = useState()

  // ConstFunc to generate Hash SHA-256
  const generateSHA256 = async (messageReceived: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(messageReceived);

    // Create Hash SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert the Hash Created to Hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  // Primary Handle Submit 
  const handleSubmitUserLogin = async (infos: User_Login_DataType, methodSelection: Methods) => {
    try {
      const hashedPassword = await generateSHA256(infos.password);
      const response = await fetch(`http://localhost:8080/login`, {
        method: methodSelection,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf: infos.cpf,
          password: hashedPassword,
        }),
      });

      setResponseCode(response.status);
      // setResponseData(response.body);
    } catch (error) {
      setResponseCode(StatusResponse.Error);
      console.error("Erro durante a requisição:", error);
    }
  };
  return (
    <UserLoginContext.Provider value={{ handleSubmitUserLogin, responseCode, setResponseCode }}>
      {props.children}
    </UserLoginContext.Provider>
  );
}
