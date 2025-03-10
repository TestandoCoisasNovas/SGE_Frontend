import { useDataBase } from "@/context/DB_DataContext";
import { FloatingLabel, Modal, ModalBody, Table } from "flowbite-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import EditSchool from "../Forms/EditSchool";
import { Address, School } from "@/types/types";
import { InitialAddressData, InitialSchoolData } from "@/types/constValues";

export function SchoolTable() {
  const { schoolGET, employeeGET } = useDataBase();

  // SCHOOLS SEARCH, SELECT AND FILTER
  const [searchedSchool, setSearchedSchool] = useState<string>("");
  const filteredSchools = schoolGET?.filter((school) =>
    school.nomeEscola.toLowerCase().includes(searchedSchool.toLowerCase())
  );
  const [selectedSchoolData, setSelectedSchoolData] = useState<School>(InitialSchoolData);
  const [selectedSchoolAddress, setSelectedSchoolAddress] = useState<Address>(InitialAddressData);

  // SCHOOLS EDIT
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="overflow-x-auto">
      <Table
        hoverable={filteredSchools?.length === 0 ? false : true}
        theme={{
          head: {
            base: "group/head text-md uppercase text-extraColor",
            cell: {
              base: "bg-gray-500 px-6 pt-2 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
            },
          },
          row: {
            base: "group/row bg-foreground border-extraColor text-white dark:text-gray-400 dark:border-gray-700 dark:bg-gray-800",
            hovered: "hover:bg-tertiary dark:hover:bg-gray-600",
          },
        }}
      >
        <Table.Head className="text-center text-lg">
          <Table.HeadCell />
          <Table.HeadCell>PESQUISAR ESCOLA</Table.HeadCell>
          <Table.HeadCell />
          <Table.HeadCell />
          <Table.HeadCell />
        </Table.Head>
        <Table.Head>
          <Table.HeadCell>
            <FloatingLabel
              label="NOME DA ESCOLA"
              variant="standard"
              color={searchedSchool === "" ? "default" : filteredSchools?.length === 0 ? "error" : "success"}
              sizing="sm"
              helperText="Você pode pesquisar clicando aqui!"
              className="m-0"
              alt="pesquisar"
              theme={{
                input: {
                  default: {
                    standard: {
                      sm: twMerge(
                        "peer block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent",
                        "px-0 py-2.5 text-xs text-gray-900 focus:border-white focus:outline-none focus:ring-0",
                        "dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                      ),
                    },
                  },
                  success: {
                    standard: {
                      sm: twMerge(
                        "peer block w-full appearance-none border-0 border-b-2 border-tertiary bg-transparent",
                        "px-0 py-2.5 text-xs text-gray-900 focus:border-tertiary focus:outline-none focus:ring-0",
                        "dark:border-green-500 dark:text-white dark:focus:border-green-500"
                      ),
                    },
                  },
                  error: {
                    standard: {
                      sm: twMerge(
                        "peer block w-full appearance-none border-0 border-b-2 border-red-600 bg-transparent",
                        "px-0 py-2.5 text-xs text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0",
                        "dark:border-red-500 dark:text-white dark:focus:border-red-500"
                      ),
                    },
                  },
                },
                label: {
                  default: {
                    standard: {
                      sm: twMerge(
                        "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-xs text-extraColor",
                        "transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
                        "peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-background",
                        "peer-focus:dark:text-blue-500"
                      ),
                    },
                  },
                  success: {
                    standard: {
                      sm: twMerge(
                        "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-xs text-tertiary",
                        "transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
                        "peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-green-500"
                      ),
                    },
                  },
                  error: {
                    standard: {
                      sm: twMerge(
                        "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-xs text-red-600",
                        "transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
                        "peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-red-500"
                      ),
                    },
                  },
                },
                helperText: {
                  default: "mt-2 text-[10px] text-extraColor dark:text-gray-400",
                  success: "mt-2 text-[10px] text-tertiary dark:text-green-400",
                  error: "mt-2 text-[10px] text-red-600 dark:text-red-400",
                },
              }}
              onChange={(e) => setSearchedSchool(e.target.value)}
            />
          </Table.HeadCell>
          <Table.HeadCell className="uppercase">Diretor</Table.HeadCell>
          <Table.HeadCell className="uppercase">Telefone</Table.HeadCell>
          <Table.HeadCell className="uppercase">Situação</Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredSchools && filteredSchools.length > 0 ? (
            filteredSchools.map((school) => {
              return (
                <Table.Row key={school.id}>
                  <Table.Cell className="max-w-[400px] font-bold text-gray-900 dark:text-white">
                    {school.nomeEscola}
                  </Table.Cell>
                  {/* cspell: disable-next-line */}
                  <Table.Cell className="max-w-80">
                    {employeeGET?.map((found) =>
                      // cspell: disable-next-line
                      found.cpf === school.diretorResponsavel?.cpf
                        ? found.nome
                        : "Diretor Não Designado ou Não Inserido no Sistema!"
                    )}
                  </Table.Cell>
                  <Table.Cell>{school.telefone}</Table.Cell>
                  {/* cspell: disable-next-line */}
                  <Table.Cell>{school.situacao}</Table.Cell>
                  <Table.Cell>
                    <h1
                      className="font-medium text-cyan-200 hover:underline dark:text-cyan-500 cursor-pointer select-none"
                      onClick={() => (
                        setOpenModal(true), setSelectedSchoolData(school), setSelectedSchoolAddress(school.endereco)
                      )}
                    >
                      Abrir/Editar
                    </h1>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={5}
                className="text-center font-bold animate-pulse py-4 text-extraColor dark:text-red-500"
              >
                Nenhuma escola encontrada!
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Modal
        show={openModal}
        onClose={() => (
          setOpenModal(false), setSelectedSchoolData(InitialSchoolData), setSelectedSchoolAddress(InitialAddressData)
        )}
        size="7xl"
      >
        <Modal.Header>Editar Escola</Modal.Header>
        <ModalBody>
          <EditSchool selectedSchoolData={selectedSchoolData} selectedSchoolAddress={selectedSchoolAddress} />
        </ModalBody>
      </Modal>
    </div>
  );
}
