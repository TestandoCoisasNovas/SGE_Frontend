import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import NavbarOptionButtons from "./NavbarOptionButtons";

interface NavbarOptionInterface extends React.PropsWithChildren {
  tittle: string;
  subSize: number;
  reference?: string;
  icon: boolean;
  href?: string;
}

export default function NavbarOption(props: NavbarOptionInterface) {
  const router = useRouter();

  const querySelected = router.asPath.includes(
    `${props.reference}/` +
      props.tittle
        .toLowerCase()
        .replace(" ", "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
  );

  useEffect(() => {
    if (querySelected) {
      setOpenMenu(true);
    }
  }, [querySelected]);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div
      className={twMerge(
        "flex flex-col w-full justify-start gap-1 tracking-wide overflow-hidden transition-all duration-500"
      )}
    >
      <NavbarOptionButtons
        openMenu={openMenu}
        handleOpenMenu={handleOpenMenu}
        page={router.asPath}
        tittle={props.tittle}
        subSize={props.subSize}
        icon={props.icon}
        href={props.href}
      />
      <div
        className={twMerge(
          "flex-col transition-all duration-500 ease-in-out overflow-hidden",
          openMenu ? "max-h-[2000px] flex" : "max-h-0"
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
