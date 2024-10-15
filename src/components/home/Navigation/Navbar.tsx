import NavbarOption from "./NavbarOption";
import { SubSize } from "@/types/types";

export default function Navbar() {
  return (
    <nav className="flex flex-col items-start bg-tertiary select-none">
      {/* SIZE ONE - MATRÍCULA */}
      <NavbarOption tittle="Matrícula Inicial" subSize={SubSize.one} icon={true}>
        {/* SIZE TWO - ESCOLA */}
        <NavbarOption tittle="Escola" subSize={SubSize.two} icon={true}>
          {/* SIZE THREE - ESCOLA → OPÇÕES*/}
          <NavbarOption tittle="Cadastro" subSize={SubSize.three} icon={true}>
            {/* INSIDE SIZE THREE - ESCOLA -> CADASTRO -> OPÇÕES*/}
            <NavbarOption tittle="Identificação" subSize={SubSize.four} icon={false} href="" />
            <NavbarOption tittle="Caracterização" subSize={SubSize.four} icon={false} href="" />
            <NavbarOption tittle="Organização Escolar" subSize={SubSize.four} icon={false} href="" />
          </NavbarOption>

          {/* INSIDE SIZE TWO - ESCOLA -> OPÇÕES */}
          <NavbarOption tittle="Pesquisar" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Bloquear Acesso" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Desbloquear" subSize={SubSize.three} icon={false} href="" />
        </NavbarOption>

        {/* SIZE TWO - GESTOR ESCOLAR */}
        <NavbarOption tittle="Gestor Escolar" subSize={SubSize.two} icon={true}>
          {/* SIZE THREE - GESTOR ESCOLAR -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" subSize={SubSize.three} icon={true} />
          <NavbarOption tittle="Pesquisar" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Bloquear Acesso" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Desbloquear" subSize={SubSize.three} icon={false} href="" />
        </NavbarOption>

        {/* SIZE TWO - REMANEJAMENTO */}
        <NavbarOption tittle="Remanejamento" subSize={SubSize.two} icon={true}>
          {/* SIZE THREE - REMANEJAMENTO -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" subSize={SubSize.three} icon={true} />
          <NavbarOption tittle="Pesquisar" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Bloquear Acesso" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Desbloquear" subSize={SubSize.three} icon={false} href="" />
        </NavbarOption>

        {/* SIZE TWO - TURMA */}
        <NavbarOption tittle="Turma" subSize={SubSize.two} icon={true}>
          {/* SIZE THREE - TURMA -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" subSize={SubSize.three} icon={true} />
          <NavbarOption tittle="Pesquisar" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Bloquear Acesso" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Desbloquear" subSize={SubSize.three} icon={false} href="" />
        </NavbarOption>

        {/* SIZE TWO - ALUNO */}
        <NavbarOption tittle="Aluno" subSize={SubSize.two} icon={true}>
          {/* SIZE THREE - ALUNO -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" subSize={SubSize.three} icon={true} />
          <NavbarOption tittle="Pesquisar" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Bloquear Acesso" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Desbloquear" subSize={SubSize.three} icon={false} href="" />
        </NavbarOption>

        {/* SIZE TWO - PROFISSIONAL ESCOLAR */}
        <NavbarOption tittle="Profissional Escolar" subSize={SubSize.two} icon={true}>
          {/* SIZE THREE - PROFISSIONAL ESCOLAR -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" subSize={SubSize.three} icon={true} />
          <NavbarOption tittle="Pesquisar" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Bloquear Acesso" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Desbloquear" subSize={SubSize.three} icon={false} href="" />
        </NavbarOption>

        {/* SIZE TWO - MIGRAÇÃO */}
        <NavbarOption tittle="Migração" subSize={SubSize.two} icon={true}>
          {/* SIZE THREE - MIGRAÇÃO -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" subSize={SubSize.three} icon={true} />
          <NavbarOption tittle="Pesquisar" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Bloquear Acesso" subSize={SubSize.three} icon={false} href="" />
          <NavbarOption tittle="Desbloquear" subSize={SubSize.three} icon={false} href="" />
        </NavbarOption>

        {/* SIZE TWO - STANDALONE - MIGRAÇÃO */}
        <NavbarOption tittle="Relatórios" subSize={SubSize.two} icon={false} href="" />
      </NavbarOption>

      {/* SIZE ONE - USUÁRIO */}
      <NavbarOption tittle="Usuário" subSize={SubSize.one} icon={true}>
        {/* SIZE TWO - USUÁRIO → OPÇÕES*/}
        <NavbarOption tittle="Cadastro" subSize={SubSize.three} icon={true}>
          {/* INSIDE SIZE TWO - USUÁRIO -> CADASTRO -> OPÇÕES*/}
        </NavbarOption>
      </NavbarOption>
    </nav>
  );
}
