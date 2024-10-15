import { MinusIcon, PlusIcon } from "@/components/utils/Icons";
import { SubSize } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface NavbarOptionInterface extends React.PropsWithChildren {
  tittle: string;
  subSize: number;
  icon: boolean;
  href?: string;
}

export default function NavbarOption(props: NavbarOptionInterface) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const iconSize =
    props.subSize === SubSize.one
      ? 25
      : props.subSize === SubSize.two
      ? 20
      : props.subSize === SubSize.three
      ? 15
      : props.subSize === SubSize.four
      ? 10
      : 0;

  return (
    <div
      className={twMerge(
        "flex flex-col w-full justify-start gap-1 tracking-wide overflow-hidden transition-all duration-500"
      )}
    >
      <div
        className={twMerge(
          "flex px-4 py-1 cursor-pointer group transition-all duration-500",
          props.icon && openMenu && "bg-secondary"
        )}
        onClick={handleOpenMenu}
      >
        <div
          className={twMerge(
            "flex gap-2 items-center",
            "transition group-hover:scale-[105%] group-active:scale-90",
            props.subSize === SubSize.one
              ? "pl-0"
              : props.subSize === SubSize.two
              ? "pl-3"
              : props.subSize === SubSize.three
              ? "pl-5"
              : props.subSize === SubSize.four && "pl-7"
          )}
        >
          {props.icon ? (
            <>
              <PlusIcon
                width={iconSize}
                height={iconSize}
                className={twMerge("hidden transition fill-foreground", !openMenu && "flex")}
              />
              <MinusIcon
                width={iconSize}
                height={iconSize}
                className={twMerge("hidden transition fill-foreground", openMenu && "flex")}
              />
              <h1 className={twMerge(props.subSize === SubSize.one && "text-[20px] font-bold")}>{props.tittle}</h1>
            </>
          ) : (
            <Link
              href={props.href ? props.href : ""}
              className={twMerge(props.subSize === SubSize.one && "text-[20px]")}
            >
              {props.tittle}
            </Link>
          )}
        </div>
      </div>
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
