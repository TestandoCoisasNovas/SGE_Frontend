import { useDataBase } from "@/context/DB_DataContext";
import { StatusResponse } from "@/types/types";
import { Button } from "flowbite-react";
import { MouseEventHandler, PropsWithChildren } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { HiExclamation } from "react-icons/hi";

interface SendButtonInterface extends PropsWithChildren {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}

export default function SendButton(props: SendButtonInterface) {
  const { responseCode } = useDataBase();
  return (
    <Button
      type={props.type}
      color={responseCode === StatusResponse.OtherError ? "warning" : ""}
      gradientMonochrome={
        responseCode === StatusResponse.Loading
          ? "teal"
          : responseCode === StatusResponse.Error
          ? "failure"
          : responseCode === StatusResponse.Success
          ? "success"
          : responseCode === StatusResponse.Null
          ? "info"
          : ""
      }
      isProcessing={responseCode === StatusResponse.Loading ? true : false}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {responseCode === StatusResponse.Loading ? (
        "Carregando"
      ) : responseCode === StatusResponse.Error ? (
        <div className="flex gap-1 items-center">
          <VscError /> ERRO
        </div>
      ) : responseCode === StatusResponse.OtherError ? (
        <div className="flex gap-1 items-center">
          <HiExclamation /> Alerta!
        </div>
      ) : responseCode === StatusResponse.Success ? (
        <div className="flex gap-1 items-center">
          <IoCheckmarkDoneOutline /> Sucesso!
        </div>
      ) : (
        <div className="flex gap-1 items-center">
          <IoIosSend /> {props.children}
        </div>
      )}
    </Button>
  );
}
