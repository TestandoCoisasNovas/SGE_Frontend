import { Managers, SchoolDataType } from "@/types/types";

interface SchoolSearcherInterface {
  baseInfo: Managers;
  handler: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  infosGET?: SchoolDataType[] | null;
}

export default function SchoolSearcher({ baseInfo, handler, infosGET }: SchoolSearcherInterface) {
  return (
    <div className="flex flex-col w-full items-center max-w-[500px]">
      <h1 className="text-xl font-bold">ESCOLHA UMA ESCOLA</h1>
      <select className="text-center" name="escola" value={baseInfo.escola.nomeEscola} onChange={handler}>
        <option hidden disabled value="">
          Selecione uma Opção
        </option>
        {infosGET?.map((value) => {
          return (
            <option key={value.id} value={value.nomeEscola}>
              {value.nomeEscola}
            </option>
          );
        })}
      </select>
    </div>
  );
}
