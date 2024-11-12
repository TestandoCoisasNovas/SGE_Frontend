import { useUserLoginData } from "@/context/User_Login_DataContext";
import { Methods } from "@/types/types";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Login() {
  const { handleSubmitUserLogin } = useUserLoginData();
  const [loginFormData, setLoginFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isCpfValid, setIsCpfValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // CPF MASK CHANGER
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

    // PASSWORD CHECKER
    if (name === "password") {
      setPasswordMatch(value === confirmPassword);
    }

    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === loginFormData.password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!isCpfValid) {
      alert("CPF inválido! Certifique-se de que ele está completo.");
      return;
    }

    // SWITCH FURTHER TO CONTEXT SEND
    handleSubmitUserLogin(loginFormData, Methods.POST);
    console.log("Dados Enviados para Login:", JSON.stringify(loginFormData));
  };

  return (
    <div className="flex justify-center items-center bg-tertiary">
      <form onSubmit={handleSubmit} className="p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="name"
            value={loginFormData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={loginFormData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-sm font-medium">Confirme sua senha</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={twMerge(
              "mt-1 block w-full p-2 border rounded",
              passwordMatch ? "border-gray-300" : "border-red-500"
            )}
            required
          />
          {!passwordMatch && <p className="text-red-500 text-sm mt-1">As senhas não coincidem.</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Entrar
        </button>
      </form>
    </div>
  );
}
