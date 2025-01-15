import "@/styles/globals.css";
import { DataBaseContextProvider } from "@/context/DB_DataContext";
import { UFsDataContextProvider } from "@/context/IBGE_DataContext";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { UpdateUserContextProvider } from "@/context/UpdateUser_DataContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <UpdateUserContextProvider>
        <UFsDataContextProvider>
          <DataBaseContextProvider>
            <Component {...pageProps} />
          </DataBaseContextProvider>
        </UFsDataContextProvider>
      </UpdateUserContextProvider>
    </UserProvider>
  );
}
