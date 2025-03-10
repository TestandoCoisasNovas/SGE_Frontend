import { useDataBase } from "@/context/DB_DataContext";
import { StatusResponse } from "@/types/types";
import { Toast } from "flowbite-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

const statusConfig: Record<number, { icon: JSX.Element; bgColor: string; message: string }> = {
  [StatusResponse.Success]: {
    icon: <HiCheck className="h-5 w-5" />,
    bgColor: "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
    message: "Sucesso! Ação executada com sucesso!",
  },
  [StatusResponse.Error]: {
    icon: <HiX className="h-5 w-5" />,
    bgColor: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
    message: "ERRO! A ação não pode ser executada!",
  },
  [StatusResponse.OtherError]: {
    icon: <HiExclamation className="h-5 w-5" />,
    bgColor: "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200",
    message: "Houve algum erro não identificado. Tente novamente",
  },
};

export function ResponseStatusToast({ children }: PropsWithChildren) {
  const { responseCode, setResponseCode } = useDataBase();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (responseCode && statusConfig[responseCode]) {
      setVisible(true);
      const timer = setTimeout(() => (setVisible(false), setResponseCode(StatusResponse.Null)), 10000);
      return () => clearTimeout(timer);
    }
  }, [responseCode, setResponseCode]);

  const config = responseCode ? statusConfig[responseCode] : null;

  return (
    <>
      {children}
      {visible && config && (
        <div
          className={twMerge(
            "fixed bottom-5 right-5 z-[99] flex flex-col gap-2 animate-pulse",
            "border border-black dark:border-gray-600 rounded-lg"
          )}
        >
          <Toast>
            <div
              className={twMerge("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", config.bgColor)}
            >
              {config.icon}
            </div>
            <div className="ml-3 text-sm font-normal">{config.message}</div>
            <Toast.Toggle onClick={() => (setVisible(false), setResponseCode(StatusResponse.Null))} />
          </Toast>
        </div>
      )}
    </>
  );
}
