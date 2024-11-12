import NavbarOption from "./NavbarOption";
import { SubSize } from "@/types/types";

export default function Navbar() {
  return (
    <nav className="flex flex-col max-w-[230px] w-full items-start bg-tertiary select-none">
      {/* SIZE ONE - MATRÍCULA */}
      <NavbarOption tittle="Matrícula Inicial" reference="" icon={true} subSize={SubSize.one}>
        {/* SIZE TWO - ESCOLA */}
        <NavbarOption tittle="Escola" reference="matricula-inicial" icon={true} subSize={SubSize.two}>
          {/* SIZE THREE - ESCOLA → OPÇÕES*/}
          <NavbarOption tittle="Cadastro" reference="escola" icon={true} subSize={SubSize.three}>
            {/* INSIDE SIZE THREE - ESCOLA -> CADASTRO -> OPÇÕES*/}
            <NavbarOption
              tittle="Identificação"
              icon={false}
              subSize={SubSize.four}
              href="/matricula-inicial/escola/cadastro/identificacao"
            />
            <NavbarOption
              tittle="Caracterização"
              icon={false}
              subSize={SubSize.four}
              href="/matricula-inicial/escola/cadastro/caracterizacao"
            />
            <NavbarOption
              tittle="Organização Escolar"
              icon={false}
              subSize={SubSize.four}
              href="/matricula-inicial/escola/cadastro/organizacao-escolar"
            />
          </NavbarOption>

          {/* INSIDE SIZE TWO - ESCOLA -> OPÇÕES */}
          <NavbarOption
            tittle="Pesquisar"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/escola/pesquisar"
          />
          <NavbarOption
            tittle="Bloquear Acesso"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/escola/bloquear-acesso"
          />
          <NavbarOption
            tittle="Desbloquear"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/escola/desbloquear"
          />
        </NavbarOption>

        {/* SIZE TWO - GESTOR ESCOLAR */}
        <NavbarOption tittle="Gestor Escolar" icon={true} subSize={SubSize.two}>
          {/* SIZE THREE - GESTOR ESCOLAR -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" reference="gestor-escolar" icon={true} subSize={SubSize.three}>
            {/* INSIDE SIZE THREE - ESCOLA -> CADASTRO -> OPÇÕES*/}
            <NavbarOption
              tittle="Identificação"
              icon={false}
              subSize={SubSize.four}
              href="/matricula-inicial/gestor-escolar/cadastro/identificacao"
            />
            <NavbarOption
              tittle="Caracterização"
              icon={false}
              subSize={SubSize.four}
              href="/matricula-inicial/gestor-escolar/cadastro/caracterizacao"
            />
            <NavbarOption
              tittle="Organização Escolar"
              icon={false}
              subSize={SubSize.four}
              href="/matricula-inicial/gestor-escolar/cadastro/organizacao-escolar"
            />
          </NavbarOption>
          <NavbarOption
            tittle="Pesquisar"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/gestor-escolar/pesquisar"
          />
          <NavbarOption
            tittle="Bloquear Acesso"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/gestor-escolar/bloquear-acesso"
          />
          <NavbarOption
            tittle="Desbloquear"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/gestor-escolar/desbloquear"
          />
        </NavbarOption>

        {/* SIZE TWO - REMANEJAMENTO */}
        <NavbarOption tittle="Remanejamento" icon={true} subSize={SubSize.two}>
          {/* SIZE THREE - REMANEJAMENTO -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" icon={true} subSize={SubSize.three} />
          <NavbarOption
            tittle="Pesquisar"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/gestor-escolar/pesquisar"
          />
          <NavbarOption
            tittle="Bloquear Acesso"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/gestor-escolar/bloquear-acesso"
          />
          <NavbarOption
            tittle="Desbloquear"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/gestor-escolar/desbloquear"
          />
        </NavbarOption>

        {/* SIZE TWO - TURMA */}
        <NavbarOption tittle="Turma" icon={true} subSize={SubSize.two}>
          {/* SIZE THREE - TURMA -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" icon={true} subSize={SubSize.three} />
          <NavbarOption
            tittle="Pesquisar"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/turma/pesquisar"
          />
          <NavbarOption
            tittle="Bloquear Acesso"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/turma/boquear-acesso"
          />
          <NavbarOption
            tittle="Desbloquear"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/turma/desbloquear"
          />
        </NavbarOption>

        {/* SIZE TWO - ALUNO */}
        <NavbarOption tittle="Aluno" icon={true} subSize={SubSize.two}>
          {/* SIZE THREE - ALUNO -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" icon={true} subSize={SubSize.three} />
          <NavbarOption
            tittle="Pesquisar"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/aluno/pesquisar"
          />
          <NavbarOption
            tittle="Bloquear Acesso"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/aluno/bloquear-acesso"
          />
          <NavbarOption
            tittle="Desbloquear"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/aluno/desbloquear"
          />
        </NavbarOption>

        {/* SIZE TWO - PROFISSIONAL ESCOLAR */}
        <NavbarOption tittle="Profissional Escolar" icon={true} subSize={SubSize.two}>
          {/* SIZE THREE - PROFISSIONAL ESCOLAR -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" icon={true} subSize={SubSize.three} />
          <NavbarOption
            tittle="Pesquisar"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/profissional-escolar/pesquisar"
          />
          <NavbarOption
            tittle="Bloquear Acesso"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/profissional-escolar/bloquear-acesso"
          />
          <NavbarOption
            tittle="Desbloquear"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/profissional-escolar/desbloquear"
          />
        </NavbarOption>

        {/* SIZE TWO - MIGRAÇÃO */}
        <NavbarOption tittle="Migração" icon={true} subSize={SubSize.two}>
          {/* SIZE THREE - MIGRAÇÃO -> OPÇÕES */}
          <NavbarOption tittle="Cadastro" icon={true} subSize={SubSize.three} />
          <NavbarOption
            tittle="Pesquisar"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/migracao/pesquisar"
          />
          <NavbarOption
            tittle="Bloquear Acesso"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/migracao/bloquear-acesso"
          />
          <NavbarOption
            tittle="Desbloquear"
            icon={false}
            subSize={SubSize.three}
            href="/matricula-inicial/migracao/desbloquear"
          />
        </NavbarOption>

        {/* SIZE TWO - STANDALONE - MIGRAÇÃO */}
        <NavbarOption tittle="Relatórios" icon={false} subSize={SubSize.two} href="/matricula-inicial/relatorios" />
      </NavbarOption>

      {/* SIZE ONE - USUÁRIO */}
      <NavbarOption tittle="Usuário" icon={true} subSize={SubSize.one}>
        {/* SIZE TWO - USUÁRIO → OPÇÕES*/}
        <NavbarOption tittle="Cadastro" icon={true} subSize={SubSize.three}>
          {/* INSIDE SIZE TWO - USUÁRIO -> CADASTRO -> OPÇÕES*/}
        </NavbarOption>
      </NavbarOption>
    </nav>
  );
}
