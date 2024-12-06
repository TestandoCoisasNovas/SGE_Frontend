import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ErrorPage from "@/components/utils/ErrorPage";
import RegisterSchool from "@/components/app/Forms/RegisterSchool";
import Navbar from "@/components/app/Navigation/Navbar";
import Footer from "@/components/home/Footer";
import { PageSelector } from "@/types/types";
import RegisterManager from "@/components/app/Forms/RegisterManagers";
import RegisterEmployee from "@/components/app/Forms/RegisterEmployee";

export default function DynamicSlugPage() {
  const router = useRouter();
  const pageIdentify = router.query.slug;

  // SHOWUP ANIMATION
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    // Clear the Timer after unmount
    return () => clearTimeout(timer);
  }, [router.asPath]);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  // CONDITIONAL RENDERING PAGES
  const renderContent = () => {
    if (pageIdentify?.[0] === PageSelector.MatriculaInicial) {
      if (pageIdentify[1] === PageSelector.Escola) {
        if (pageIdentify[2] === PageSelector.Cadastro) {
          /* cspell: disable-next-line */
          if (pageIdentify[3] === PageSelector.Identificação) {
            return <RegisterSchool />;
            /* cspell: disable-next-line */
          } else if (pageIdentify[3] === PageSelector.Caracterização) {
            return <p>Você está na página {router.asPath}</p>;
            /* cspell: disable-next-line */
          } else if (pageIdentify[3] === PageSelector.OrgEscolar) {
            return <p>Você está na página {router.asPath}</p>;
          } else if (pageIdentify[3] === PageSelector.Administrativo) {
            return <RegisterManager />;
          }
        } else if (pageIdentify[2] === PageSelector.Pesquisar) {
          return <p>Você está na página de Pesquisar da Matrícula Inicial - Escola</p>;
        } else if (pageIdentify[2] === PageSelector.BloquearAcesso) {
          return <p>Você está na página de Bloquear Acesso da Matrícula Inicial - Escola</p>;
        } else if (pageIdentify[2] === PageSelector.Desbloquear) {
          return <p>Você está na página de Desbloquear Acesso da Matrícula Inicial - Escola</p>;
        }
      }
    } else if (pageIdentify?.[0] === PageSelector.Usuário) {
      if (pageIdentify[1] === PageSelector.Cadastro) {
        if (pageIdentify[2] === PageSelector.Funcionário) {
          return <RegisterEmployee />;
        }
      }
    } else if (pageIdentify?.[0] === PageSelector.HomePage) {
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
            "flex flex-col m-auto py-4 items-center transform transition-all duration-1000 ease-out",
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
