import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import NavbarOptionButtons from "./NavbarOptionButtons";

interface NavbarOptionInterface extends React.PropsWithChildren {
  tittle: string;
  subSize: number;
  icon: boolean;
  href?: string;
}

export default function NavbarOption(props: NavbarOptionInterface) {
  const router = useRouter();
  const page = Array.isArray(router.query.slug) ? router.query.slug.join("/") : "";
  const querySelected = router.query.slug?.includes(
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
        page={page}
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
