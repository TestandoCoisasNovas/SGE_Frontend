import { InitialSchoolData } from "@/types/constValues";
import { School } from "@/types/types";
import { Select } from "flowbite-react";
import { useState } from "react";

interface SchoolSearcherInterface {
  handler: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  schoolGET?: School[] | null;
}

export default function SchoolSearcher({ handler, schoolGET }: SchoolSearcherInterface) {
  const [selectedSchool, setSelectedSchool] = useState<School>(InitialSchoolData);

  return (
    <div className="flex flex-col w-full items-center max-w-[500px]">
      <h1 className="text-center text-lg font-bold text-extraColor">ESCOLHA UMA ESCOLA</h1>
      <Select
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
        {schoolGET?.length !== 0 ? (
          schoolGET?.map((value) => {
            return (
              <option key={value.id} value={value.nomeEscola}>
                {value.nomeEscola}
              </option>
            );
          })
        ) : (
          <option disabled value="null">
            Nenhuma escola disponível!
          </option>
        )}
      </Select>
    </div>
  );
}
