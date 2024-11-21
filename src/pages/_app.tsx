import { DataBaseContextProvider } from "@/context/DB_DataContext";
import { UFsDataContextProvider } from "@/context/IBGE_DataContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserLoginContextProvider } from "@/context/User_Login_DataContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserLoginContextProvider>
      <UFsDataContextProvider>
        <DataBaseContextProvider>
          <Component {...pageProps} />
        </DataBaseContextProvider>
      </UFsDataContextProvider>
    </UserLoginContextProvider>
  );
}
