import { PageSelector } from "@/types/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Navbar, Dropdown, Avatar, Sidebar, NavbarToggle, DarkThemeToggle, Flowbite } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { CgLogOut, CgProfile } from "react-icons/cg";
import { FaCog, FaSchool } from "react-icons/fa";
import { PiChalkboardTeacherFill } from "react-icons/pi";

export default function Navigation() {
  const { user } = useUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Collapse change text color
  enum collapseSelect {
    school = "Escola",
    user = "Usuário",
  }
  const [openCollapse, setOpenCollapse] = useState<{ [key: string]: boolean }>({
    school: false,
    user: false,
  });
  const toggleCollapse = (key: string) => {
    setOpenCollapse((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Flowbite
      theme={{
        theme: {
          navbar: {
            root: {
              base: "fixed top-0 w-full z-50 bg-white px-2 py-2.5 sm:px-4 select-none bg-foreground",
              rounded: {
                on: "rounded",
                off: "",
              },
              bordered: {
                on: "border",
                off: "",
              },
              inner: {
                base: "mx-auto flex flex-wrap items-center justify-between",
                fluid: {
                  on: "",
                  off: "container",
                },
              },
            },
            brand: {
              base: "flex items-center",
            },
            collapse: {
              base: "w-full md:block md:w-auto",
              list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
              hidden: {
                on: "hidden",
                off: "",
              },
            },
            link: {
              base: "block py-2 pl-3 pr-4 md:p-0",
              active: {
                on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
                off: twMerge(
                  "border-b border-gray-100 text-gray-700 hover:bg-gray-50",
                  "dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                  "md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                ),
              },
              disabled: {
                on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
                off: "",
              },
            },
            toggle: {
              base: twMerge(
                "inline-flex items-center rounded-lg p-2 text-sm text-extraColor",
                "hover:bg-gray-100",
                "focus:outline-none focus:ring-2 focus:ring-gray-200",
                "dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
              ),
              icon: "h-6 w-6 shrink-0",
            },
          },
          dropdown: {
            floating: {
              header: "block px-4 py-2 text-sm text-extraColor",
              divider: "my-1 h-px bg-extraColor",
              item: {
                base: twMerge(
                  "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm",
                  "text-extraColor hover:bg-tertiary focus:outline-none"
                ),
              },
            },
          },
          sidebar: {
            root: {
              base: "h-full transition-all",
              collapsed: {
                on: "w-16",
                off: "w-64",
              },
              inner: "h-full overflow-y-auto overflow-x-hidden bg-foreground px-3 py-4",
            },

            item: {
              base: "flex items-center justify-center rounded-lg p-2 text-background dark:text-extraColor hover:bg-tertiary",
            },
            collapse: {
              label: {
                base: "ml-3 flex-1 whitespace-nowrap text-left",
                icon: {
                  base: "h-6 w-6 transition delay-0 ease-in-out",
                  open: {
                    on: "rotate-180 text-background dark:text-extraColor",
                    off: "text-extraColor dark:text-background",
                  },
                },
              },
              button: twMerge(
                "group flex w-full items-center rounded-lg p-2 text-base font-normal text-extraColor",
                "transition hover:bg-tertiary"
              ),

              icon: {
                base: "h-6 w-6 text-extraColor transition",
                open: {
                  off: "text-extraColor dark:text-background",
                  on: "text-background dark:text-extraColor",
                },
              },
            },
          },
        },
      }}
    >
      <Navbar fluid>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <NavbarToggle onClick={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex items-center">
              <Image
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="SGE Logo"
                width={30}
                height={30}
              />
              <span className="self-center text-xl font-semibold text-white">SGE Edu</span>
            </div>
          </div>
          <div className="flex gap-4 items-center transition-all">
            <DarkThemeToggle
              className="transition-all hover:scale-110 active:scale-90 group"
              theme={{
                root: {
                  icon: "h-5 w-5 shrink-0 fill-background group-hover:fill-extraColor",
                },
              }}
            />

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  className="hover:scale-110 transition-all "
                  alt="User settings"
                  img={user?.picture ? user?.picture : ""}
                  rounded
                  bordered
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user?.name}</span>
                <span className="block truncate text-sm font-medium">{user?.email}</span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} href={PageSelector.MeuPerfil + "/" + PageSelector.Editar} icon={CgProfile}>
                Meus Dados
              </Dropdown.Item>
              <Dropdown.Item as={Link} href={PageSelector.MeuPerfil + "/" + PageSelector.Preferências} icon={FaCog}>
                Preferências
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => window.location.assign(PageSelector.LogOut)} icon={CgLogOut}>
                Desconectar
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </Navbar>

      <Sidebar
        className={twMerge(
          "fixed top-0 left-0 mt-14 z-40 w-64 h-screen",
          "transition-all duration-500 md:translate-x-0 -translate-x-full",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              icon={FaSchool}
              open={openCollapse.school}
              onClick={() => toggleCollapse("school")}
              label={collapseSelect.school}
              className={twMerge(
                openCollapse.school ? "text-background dark:text-extraColor" : "text-extraColor dark:text-background"
              )}
            >
              <Sidebar.Item as={Link} href={PageSelector.Escola + "/" + PageSelector.Identificação}>
                Identificação
              </Sidebar.Item>
              <Sidebar.Item as={Link} href={PageSelector.Escola + "/" + PageSelector.Caracterização}>
                Caracterização
              </Sidebar.Item>
              <Sidebar.Item as={Link} href={PageSelector.Escola + "/" + PageSelector.OrgEscolar}>
                Organização Escolar
              </Sidebar.Item>
              <Sidebar.Item as={Link} href={PageSelector.Escola + "/" + PageSelector.Administrativo}>
                Administrativo
              </Sidebar.Item>
              <Sidebar.Item as={Link} href={PageSelector.Escola + "/" + PageSelector.Pesquisar_Editar}>
                Pesquisar / Editar
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse
              icon={PiChalkboardTeacherFill}
              open={openCollapse.user}
              onClick={() => toggleCollapse("user")}
              label={collapseSelect.user}
              className={twMerge(
                openCollapse.user ? "text-background dark:text-extraColor" : "text-extraColor dark:text-background"
              )}
            >
              <Sidebar.Item as={Link} href={PageSelector.Usuário + "/" + PageSelector.Funcionário}>
                Cadastro de Funcionário
              </Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </Flowbite>
  );
}
