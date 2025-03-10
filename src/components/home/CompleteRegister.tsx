import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useUser } from "@auth0/nextjs-auth0/client";
import { PageSelector, StatusResponse } from "@/types/types";
import { useRouter } from "next/router";
import { useUpdateUser } from "@/context/UpdateUser_DataContext";
import { Button, Label, TextInput } from "flowbite-react";
import GeolocationModal from "./GeolocationModal";

interface CompleteRegisterInterface {
  isVisible?: boolean;
  needCompleteRegister: boolean;
  geolocationStatus: StatusResponse;
}

export default function CompleteRegister(props: CompleteRegisterInterface) {
  const { user } = useUser();
  const router = useRouter();
  const { updateUserMetadata } = useUpdateUser();

  const [cpf, setCpf] = useState<string>("");

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
  };

  const handleSaveCPF = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div
      className={twMerge(
        "flex m-auto justify-center items-center bg-foreground max-w-[400px] rounded-md",
        "transform transition-all duration-1000 ease-out",
        props.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      )}
    >
      <GeolocationModal geolocationStatus={props.geolocationStatus} needCompleteRegister={props.needCompleteRegister} />
      <form onSubmit={handleSaveCPF} className="flex flex-col px-8 py-5 shadow-md w-full max-w-md gap-3">
        <h1 className="text-2xl text-extraColor font-bold text-center">
          Para continuar, finalize seu cadastro inserindo os seguintes dados:
        </h1>
        <div>
          <Label>CPF</Label>
          <TextInput
            type="text"
            name="cpf"
            value={cpf}
            onChange={handleChange}
            minLength={14}
            placeholder="123.456.789-00"
            required
          />
        </div>
        <Button type="submit">Finalizar Cadastro</Button>
      </form>
    </div>
  );
}
