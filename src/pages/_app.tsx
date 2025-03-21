import "@/styles/globals.css";
import { DataBaseContextProvider } from "@/context/DB_DataContext";
import { UFsDataContextProvider } from "@/context/IBGE_DataContext";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { UpdateUserContextProvider } from "@/context/UpdateUser_DataContext";
import { useEffect } from "react";
import { ResponseStatusToast } from "@/components/utils/ResponseStatusToast";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <UserProvider>
      <UpdateUserContextProvider>
        <UFsDataContextProvider>
          <DataBaseContextProvider>
            <ResponseStatusToast>
              <Component {...pageProps} />
            </ResponseStatusToast>
          </DataBaseContextProvider>
        </UFsDataContextProvider>
      </UpdateUserContextProvider>
    </UserProvider>
  );
}
