import { useUser } from "@auth0/nextjs-auth0/client";
import NavbarOption from "./NavbarOption";
import { PageSelector, SubSize } from "@/types/types";

export default function Navbar() {
  const { user } = useUser();
  return (
    <nav className="flex flex-col max-w-[230px] w-full items-start bg-tertiary select-none">
      {/* SIZE ONE - MATRÍCULA */}
      <NavbarOption tittle="Matrícula Inicial" reference="" icon={true} subSize={SubSize.one}>
        {/* SIZE TWO - ESCOLA */}
        <NavbarOption tittle="Escola" reference={PageSelector.MatriculaInicial} icon={true} subSize={SubSize.two}>
          {/* SIZE THREE - ESCOLA → OPÇÕES*/}
          <NavbarOption tittle="Cadastro" reference={PageSelector.Escola} icon={true} subSize={SubSize.three}>
            <NavbarOption
              tittle="Identificação"
              icon={false}
              subSize={SubSize.four}
              href={
                PageSelector.MatriculaInicial +
                "/" +
                PageSelector.Escola +
                "/" +
                PageSelector.Cadastro +
                "/" +
                PageSelector.Identificação
              }
            />
            <NavbarOption
              tittle="Caracterização"
              icon={false}
              subSize={SubSize.four}
              href={
                PageSelector.MatriculaInicial +
                "/" +
                PageSelector.Escola +
                "/" +
                PageSelector.Cadastro +
                "/" +
                PageSelector.Caracterização
              }
            />
            <NavbarOption
              tittle="Organização Escolar"
              icon={false}
              subSize={SubSize.four}
              href={
                PageSelector.MatriculaInicial +
                "/" +
                PageSelector.Escola +
                "/" +
                PageSelector.Cadastro +
                "/" +
                PageSelector.OrgEscolar
              }
            />
            <NavbarOption
              tittle="Administrativo"
              icon={false}
              subSize={SubSize.four}
              href={
                PageSelector.MatriculaInicial +
                "/" +
                PageSelector.Escola +
                "/" +
                PageSelector.Cadastro +
                "/" +
                PageSelector.Administrativo
              }
            />
          </NavbarOption>

          {/* INSIDE SIZE TWO - ESCOLA -> OPÇÕES */}
          <NavbarOption
            tittle="Pesquisar"
            icon={false}
            subSize={SubSize.three}
            href={PageSelector.MatriculaInicial + "/" + PageSelector.Escola + "/" + PageSelector.Pesquisar}
          />
          <NavbarOption
            tittle="Bloquear Acesso"
            icon={false}
            subSize={SubSize.three}
            href={PageSelector.MatriculaInicial + "/" + PageSelector.Escola + "/" + PageSelector.BloquearAcesso}
          />
          <NavbarOption
            tittle="Desbloquear"
            icon={false}
            subSize={SubSize.three}
            href={PageSelector.MatriculaInicial + "/" + PageSelector.Escola + "/" + PageSelector.Desbloquear}
          />
        </NavbarOption>
      </NavbarOption>

      {/* SIZE ONE - USUÁRIO */}
      <NavbarOption tittle="Usuário" reference="" icon={true} subSize={SubSize.one}>
        {/* SIZE TWO - CADASTRO */}
        <NavbarOption tittle="Cadastro" reference={PageSelector.Usuário} icon={true} subSize={SubSize.two}>
          <NavbarOption
            tittle="Funcionário"
            icon={false}
            subSize={SubSize.three}
            href={PageSelector.Usuário + "/" + PageSelector.Cadastro + "/" + PageSelector.Funcionário}
          />
        </NavbarOption>
      </NavbarOption>

      {/* SIZE ONE - USUÁRIO LOGADO */}
      <NavbarOption
        tittle={user ? JSON.stringify(user?.name).replaceAll('"', "") : "sem usuário"}
        reference=""
        icon={true}
        subSize={SubSize.one}
      >
        <NavbarOption
            tittle="Desconectar"
            icon={false}
            subSize={SubSize.two}
            href={PageSelector.LogOut}
          />
      </NavbarOption>
    </nav>
  );
}
