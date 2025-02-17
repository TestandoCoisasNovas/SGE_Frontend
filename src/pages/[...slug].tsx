import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ErrorPage from "@/components/utils/ErrorPage";
import RegisterSchool from "@/components/app/Forms/RegisterSchool";
import { PageSelector } from "@/types/types";
import RegisterManager from "@/components/app/Forms/RegisterManagers";
import RegisterEmployee from "@/components/app/Forms/RegisterEmployee";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "@/components/utils/Loading";
import CompleteRegister from "@/components/home/CompleteRegister";
import EditUserProfile from "@/components/app/Forms/EditUserProfile";
import Navigation from "@/components/app/Navigation/Navigation";

export default function DynamicSlugPage() {
  const router = useRouter();
  const pageIdentify = router.query.slug;

  // CHECK USER LOGGED
  const { user, isLoading } = useUser();
  const [needCompleteRegister, setNeedCompleteRegister] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(PageSelector.LogIn);
    } else if (!isLoading && user && !user.cpf) {
      setNeedCompleteRegister(true);
    }
  }, [user, isLoading, router]);

  // SHOWUP ANIMATION
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    // Clear the Timer after unmount
    return () => clearTimeout(timer);
  }, [router.asPath]);

  // CONDITIONAL RENDERING PAGES
  const renderContent = () => {
    if (pageIdentify?.[0] === PageSelector.HomePage) {
      return <p> Página Principal </p>;
    } else if (pageIdentify?.[0] === PageSelector.Cadastro) {
      if (pageIdentify[1] === PageSelector.Escola) {
        if (pageIdentify[2] === PageSelector.Identificação) {
          return <RegisterSchool />;
        } else if (pageIdentify[2] === PageSelector.Caracterização) {
          return <p>Você está na página {router.asPath}</p>;
        } else if (pageIdentify[2] === PageSelector.OrgEscolar) {
          return <p>Você está na página {router.asPath}</p>;
        } else if (pageIdentify[2] === PageSelector.Administrativo) {
          return <RegisterManager />;
        } else if (pageIdentify[2] === PageSelector.Pesquisar) {
          return <p>Você está na página {router.asPath}</p>;
        }
      } else if (pageIdentify[1] === PageSelector.Usuário) {
        if (pageIdentify[2] === PageSelector.Funcionário) {
          return <RegisterEmployee />;
        }
      }
    } else if (pageIdentify?.[0] === PageSelector.MeuPerfil) {
      if (pageIdentify?.[1] === PageSelector.Editar) {
        return <EditUserProfile />;
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>SGE Edu</title>
      </Head>

      {!user || isLoading ? (
        <Loading />
      ) : !isLoading && needCompleteRegister ? (
        <CompleteRegister isVisible={isVisible} />
      ) : (
        !isLoading &&
        user &&
        !needCompleteRegister && (
          <>
            <Navigation />
            <div className="px-2 py-3 md:ml-64">
              <div
                className={twMerge(
                  "p-4 mt-14 min-h-[91vh] border-2 border-extraColor border-dashed rounded-lg",
                  "transform transition-all duration-1000 ease-out",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                )}
              >
                {renderContent() ? renderContent() : <ErrorPage />}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
