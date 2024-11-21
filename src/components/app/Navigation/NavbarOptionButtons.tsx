import { MinusIcon, PlusIcon } from "@/components/utils/Icons";
import { SubSize } from "@/types/types";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface NavbarOptionButtonsInterface {
  tittle: string;
  subSize: number;
  icon: boolean;
  href?: string;
  handleOpenMenu: () => void;
  page: string;
  openMenu: boolean;
}

export default function NavbarOptionButtons(props: NavbarOptionButtonsInterface) {
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

  const paddingSize =
    props.subSize === SubSize.one
      ? "pl-0"
      : props.subSize === SubSize.two
      ? "pl-3"
      : props.subSize === SubSize.three
      ? "pl-5"
      : props.subSize === SubSize.four
      ? "pl-7"
      : "";

  return (
    <>
      {props.icon ? (
        <div
          className={twMerge(
            "flex px-4 py-1 cursor-pointer group transition-all",
            props.icon && props.openMenu ? "bg-secondary" : ""
          )}
          onClick={props.handleOpenMenu}
        >
          <div
            className={twMerge(
              "flex gap-2 items-center",
              "transition group-hover:scale-[105%] group-active:scale-90",
              paddingSize
            )}
          >
            <PlusIcon
              width={iconSize}
              height={iconSize}
              className={twMerge("hidden transition fill-foreground", !props.openMenu && "flex")}
            />
            <MinusIcon
              width={iconSize}
              height={iconSize}
              className={twMerge("hidden transition fill-foreground", props.openMenu && "flex")}
            />
            <h1 className={twMerge(props.subSize === SubSize.one && "text-[20px] font-bold")}>{props.tittle}</h1>
          </div>
        </div>
      ) : (
        <Link
          className={twMerge(
            "flex px-4 py-1 cursor-pointer transition-all hover:scale-[105%] active:scale-90",
            "/" + props.href === props.page && "text-tertiary bg-foreground"
          )}
          href={props.href ? props.href : ""}
        >
          <h1 className={paddingSize}>{props.tittle}</h1>
        </Link>
      )}
    </>
  );
}
