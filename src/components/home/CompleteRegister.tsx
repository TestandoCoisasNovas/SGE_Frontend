import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../utils/Button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { PageSelector } from "@/types/types";
import { useRouter } from "next/router";
import { useUpdateUser } from "@/context/UpdateUser_DataContext";

export default function CompleteRegister() {
  const { user } = useUser();
  const router = useRouter();
  const { updateUserMetadata } = useUpdateUser();

  const [cpf, setCpf] = useState<string>("");
  const [isCpfValid, setIsCpfValid] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // CPF Mask
    const updatedCpf = value
      .replace(/\D/g, "")
      .substring(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpf(updatedCpf);
    setIsCpfValid(updatedCpf.length === 14); // Validação simples de comprimento
  };

  const handleSaveCPF = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o redirecionamento padrão do formulário
    if (!cpf) {
      alert("Por favor, insira um CPF válido.");
      return;
    }

    try {
      await updateUserMetadata(user?.sub, { cpf });
      alert(`Dados atualizados com sucesso.
      Faça login novamente!`);
      router.push(PageSelector.LogOut);
    } catch (error) {
      console.error("Erro ao atualizar CPF:", error);
      alert("Falha ao atualizar CPF.");
    }
  };

  return (
    <div className="flex m-auto justify-center items-center bg-tertiary max-w-[400px]">
      <form onSubmit={handleSaveCPF} className="px-8 py-5 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Para finalizar seu cadastro, insira os seguintes dados:</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">CPF</label>
          <input
            type="text"
            name="cpf"
            value={cpf}
            onChange={handleChange}
            className={twMerge(
              "mt-1 block w-full p-2 border border-gray-300 rounded",
              !isCpfValid && cpf !== "" && "border-red-500"
            )}
            placeholder="123.456.789-00"
            required
          />
        </div>
        <Button type="submit" className="w-full justify-center" disabled={false}>
          Finalizar Cadastro
        </Button>
      </form>
    </div>
  );
}
