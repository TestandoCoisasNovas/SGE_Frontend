import { StatusResponse } from "@/types/types";
import { twMerge } from "tailwind-merge";

interface ConfirmationStatusInterface {
  statusResponse: StatusResponse | null;
}

export default function ConfirmationStatus(props: ConfirmationStatusInterface) {
  return (
    <h1
      className={twMerge(
        "text-white p-3",
        props.statusResponse === StatusResponse.Success && "text-green-500",
        props.statusResponse === StatusResponse.Error && "text-red-500"
      )}
    >
      {props.statusResponse === StatusResponse.Success ? (
        <>
          A ação foi executada com <b>com sucesso!</b>
        </>
      ) : props.statusResponse === StatusResponse.Error ? (
        <>
          <b>ERRO:</b> Não foi possível executar tal ação!
        </>
      ) : null}
    </h1>
  );
}
