import { InitialSchoolData } from "@/types/constValues";
import { SchoolDataType } from "@/types/types";
import { useState } from "react";

interface SchoolSearcherInterface {
  handler: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  schoolGET?: SchoolDataType[] | null;
}

export default function SchoolSearcher({ handler, schoolGET }: SchoolSearcherInterface) {
  const [selectedSchool, setSelectedSchool] = useState<SchoolDataType>(InitialSchoolData);

  return (
    <div className="flex flex-col w-full items-center max-w-[500px]">
      <h1 className="text-xl font-bold">ESCOLHA UMA ESCOLA</h1>
      <select
        className="text-center"
        name="escola"
        value={selectedSchool.nomeEscola}
        onChange={(e) => {
          handler(e);
          setSelectedSchool(schoolGET?.find((school) => school.nomeEscola === e.target.value) || InitialSchoolData);
        }}
      >
        <option hidden disabled value="">
          Selecione uma Opção
        </option>
        {schoolGET?.map((value) => {
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
