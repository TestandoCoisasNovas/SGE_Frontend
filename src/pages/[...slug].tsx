import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ErrorPage from "@/components/utils/ErrorPage";
import RegisterSchoolForm from "@/components/app/Forms/RegisterSchoolForm";
import Navbar from "@/components/app/Navigation/Navbar";
import Footer from "@/components/home/Footer";

export default function DynamicSlugPage() {
  const router = useRouter();
  const pageIdentify = router.query.slug;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    // CLEAR THE TIMER AFTER UNMOUNT
    return () => clearTimeout(timer);
  }, [router.asPath]);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const renderContent = () => {
    if (pageIdentify?.[0] === "matricula-inicial" && pageIdentify[1] === "escola") {
      if (pageIdentify[2] === "cadastro") {
        /* cspell: disable-next-line */
        if (pageIdentify[3] === "identificacao") {
          return <RegisterSchoolForm />;
          /* cspell: disable-next-line */
        } else if (pageIdentify[3] === "caracterizacao") {
          return <p>Você está na página {router.asPath}</p>;
          /* cspell: disable-next-line */
        } else if (pageIdentify[3] === "organizacao-escolar") {
          return <p>Você está na página {router.asPath}</p>;
        }
      } else if (pageIdentify[2] === "pesquisar") {
        return <p>Você está na página de Pesquisar da Matrícula Inicial - Escola</p>;
      } else if (pageIdentify[2] === "bloquear-acesso") {
        return <p>Você está na página de Bloquear Acesso da Matrícula Inicial - Escola</p>;
      } else if (pageIdentify[2] === "desbloquear") {
        return <p>Você está na página de Desbloquear Acesso da Matrícula Inicial - Escola</p>;
      }
    } else if (pageIdentify === undefined) {
      return <p> Página Principal </p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>SGE Edu</title>
      </Head>
      <div className="flex flex-1">
        <Navbar />
        <div
          className={twMerge(
            "flex flex-col m-auto items-center transform transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          )}
        >
          {renderContent() ? renderContent() : <ErrorPage />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
