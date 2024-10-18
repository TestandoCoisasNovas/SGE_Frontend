import { useRouter } from "next/router";
import Navbar from "@/components/home/Navigation/Navbar";
import RegisterForm from "@/components/home/Forms/RegisterForm";

export default function DynamicSlugPage() {
  const router = useRouter();
  const pageIdentify = router.query.slug;

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const renderContent = () => {
    if (pageIdentify?.[0] === "matricula-inicial" && pageIdentify[1] === "escola") {
      if (pageIdentify[2] === "cadastro") {
        if (pageIdentify[3] === "identificacao") {
          return <RegisterForm />;
        }
      }
      if (pageIdentify[2] === "pesquisar") {
        return <p>Você está na página de Pesquisar da Matrícula Inicial - Escola</p>;
      }
      if (pageIdentify[2] === "bloquear-acesso") {
        return <p>Você está na página de Bloquear Acesso da Matrícula Inicial - Escola</p>;
      }
      if (pageIdentify[2] === "desbloquear") {
        return <p>Você está na página de Desbloquear Acesso da Matrícula Inicial - Escola</p>;
      }
    } else if (pageIdentify === undefined) {
      return <p> Página Principal </p>;
    } else {
      return <p>Página não encontrada.</p>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-col m-auto items-center">{renderContent()}</div>
    </div>
  );
}
