import { StatusResponse } from "@/types/types";
import { Modal } from "flowbite-react";
import { useState } from "react";
import SendButton from "../utils/SendButton";

interface GeolocationModalInterface {
  geolocationStatus: StatusResponse;
  needCompleteRegister: boolean;
}

export default function GeolocationModal(props: GeolocationModalInterface) {
  console.log(props.geolocationStatus);

  const [openModal, setOpenModal] = useState<boolean>(
    props.geolocationStatus !== StatusResponse.Success ? true : false
  );

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Configuração Necessária</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Para ter acesso ao sistema, primeiramente você precisará nos fornecer a permissão de localização, para
            identificarmos a região onde foi emitida a requisição de login.
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Não se preocupe! Os dados de localização fornecidos são confidenciais, não serão divulgados e são
            necessários para garantir a segurança da sua conta e do sistema. Por isso, serão necessários somente
            mediante violação das nossas políticas de segurança.
          </p>
          {props.geolocationStatus === StatusResponse.Loading ? (
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Você poderá Continuar somente após a permissão de localização, concedida ao clicar no botão{" "}
              <b>&quot;PERMITIR&quot;</b> na caixa de notificação aberta a esquerda de sua tela!
            </p>
          ) : (
            props.geolocationStatus === StatusResponse.Error && (
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Você poderá Continuar somente após permitir a verificação de localização, concedida ao clicar no botão{" "}
                <b>&quot;PERMITIR&quot;</b>!
              </p>
            )
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {props.needCompleteRegister && (
          <SendButton
            type="submit"
            onClick={() => setOpenModal(false)}
            disabled={props.geolocationStatus !== StatusResponse.Success ? true : false}
          >
            Continuar
          </SendButton>
        )}
      </Modal.Footer>
    </Modal>
  );
}
