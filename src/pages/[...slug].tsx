import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ErrorPage from "@/components/utils/ErrorPage";
import RegisterSchool from "@/components/app/Forms/RegisterSchool";
import { PageSelector, StatusResponse } from "@/types/types";
import RegisterManager from "@/components/app/Forms/RegisterManagers";
import RegisterEmployee from "@/components/app/Forms/RegisterEmployee";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "@/components/utils/Loading";
import CompleteRegister from "@/components/home/CompleteRegister";
import EditUserProfile from "@/components/app/Forms/EditUserProfile";
import Navigation from "@/components/app/Navigation/Navigation";
import { SchoolTable } from "@/components/app/Tables/SchoolTable";

export default function DynamicSlugPage() {
  const router = useRouter();
  const pageIdentify = router.query.slug;

  // CHECK USER LOGGED
  const { user, isLoading } = useUser();
  const [needCompleteRegister, setNeedCompleteRegister] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.assign(PageSelector.LogIn);
    } else if (!isLoading && user && !user.cpf) {
      setNeedCompleteRegister(true);
    }
  }, [user, isLoading, router]);

  // CHECK GRANTED GEOLOCATION
  const [geolocationStatus, setGeolocationStatus] = useState<StatusResponse>(StatusResponse.Null);
  useEffect(() => {
    if (!("permissions" in navigator)) return;

    const mapPermissionToStatus = (state: PermissionState) => {
      switch (state) {
        case "granted":
          return StatusResponse.Success;
        case "prompt":
          return StatusResponse.Loading;
        default:
          return StatusResponse.Error;
      }
    };

    const verifyGeolocationPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: "geolocation" });
        setGeolocationStatus(mapPermissionToStatus(result.state));

        result.onchange = () => setGeolocationStatus(mapPermissionToStatus(result.state));
      } catch (error) {
        console.error("Erro ao verificar permissão:", error);
      }
    };

    verifyGeolocationPermission();
  }, []);

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
    } else if (pageIdentify?.[0] === PageSelector.Escola) {
      if (pageIdentify[1] === PageSelector.Identificação) {
        return <RegisterSchool />;
      } else if (pageIdentify[1] === PageSelector.Caracterização) {
        return <p>Você está na página {router.asPath}</p>;
      } else if (pageIdentify[1] === PageSelector.OrgEscolar) {
        return <p>Você está na página {router.asPath}</p>;
      } else if (pageIdentify[1] === PageSelector.Administrativo) {
        return <RegisterManager />;
      } else if (pageIdentify[1] === PageSelector.Pesquisar_Editar) {
        return <SchoolTable />;
      }
    } else if (pageIdentify?.[0] === PageSelector.Usuário) {
      if (pageIdentify[1] === PageSelector.Funcionário) {
        return <RegisterEmployee />;
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
      ) : !isLoading &&
        (needCompleteRegister ||
          geolocationStatus === StatusResponse.Loading ||
          geolocationStatus === StatusResponse.Error) ? (
        <>
          <CompleteRegister
            isVisible={isVisible}
            needCompleteRegister={needCompleteRegister}
            geolocationStatus={geolocationStatus}
          />
        </>
      ) : (
        !isLoading &&
        !needCompleteRegister &&
        geolocationStatus === StatusResponse.Success && (
          <>
            <Navigation />
            <div className="px-2 py-3 md:ml-64">
              <div
                className={twMerge(
                  "p-0 mt-14 min-h-[91vh] rounded-lg",
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
