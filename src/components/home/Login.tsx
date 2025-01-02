import { useUserLoginData } from "@/context/User_Login_DataContext";
import { Methods, PageSelector, StatusResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ConfirmationStatus from "../utils/ConfirmationStatus";
import Loading from "../utils/Loading";
import Button from "../utils/Button";
import { useRouter } from "next/router";

export default function Login() {
  const { responseCode, setResponseCode, handleSubmitUserLogin } = useUserLoginData();

  const [loginFormData, setLoginFormData] = useState({
    cpf: "",
    password: "",
  });

  const [isCpfValid, setIsCpfValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // CPF Mask
    if (name === "cpf") {
      const updatedCpf = value
        .replace(/\D/g, "")
        .substring(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

      setLoginFormData((prev) => ({ ...prev, cpf: updatedCpf }));
      setIsCpfValid(updatedCpf.length === 14);
      return;
    }
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCpfValid) {
      alert("CPF inválido! Certifique-se de que ele está completo.");
      return;
    }

    // Context Send - Handle Submit
    setResponseCode(StatusResponse.Loading);
    handleSubmitUserLogin(loginFormData, Methods.PUT);
  };

  // Redirect to Dashboard IF SUCCESS LOGGED IN
  const router = useRouter();
  useEffect(() => {
    if (responseCode === StatusResponse.Success) {
      router.push(PageSelector.HomePage);
      setTimeout(() => {
        setResponseCode(StatusResponse.Null);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseCode]);

  return (
    <div className="flex justify-center items-center bg-tertiary max-w-[277px]">
      <form onSubmit={handleSubmit} className="px-8 py-5 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">CPF</label>
          <input
            type="text"
            name="cpf"
            value={loginFormData.cpf}
            onChange={handleChange}
            className={twMerge(
              "mt-1 block w-full p-2 border border-gray-300 rounded",
              !isCpfValid && loginFormData.cpf !== "" && "border-red-500"
            )}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            name="password"
            value={loginFormData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <>
          {responseCode === StatusResponse.Loading ? (
            <Loading width={30} className="text-xl" />
          ) : responseCode === StatusResponse.Success || responseCode === StatusResponse.Error ? (
            <ConfirmationStatus statusResponse={responseCode} />
          ) : (
            responseCode === StatusResponse.Null && (
              <Button type="submit" className="w-full justify-center">
                Entrar
              </Button>
            )
          )}
        </>
      </form>
    </div>
  );
}
