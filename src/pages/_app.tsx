import { SchoolDataContextProvider } from "@/context/SchoolDataContext";
import { UFsDataContextProvider } from "@/context/IBGE_DataContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UFsDataContextProvider>
      <SchoolDataContextProvider>
        <Component {...pageProps} />
      </SchoolDataContextProvider>
    </UFsDataContextProvider>
  );
}
