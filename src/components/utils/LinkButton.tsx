import Link from "next/link";

interface LinkButtonInterface extends React.PropsWithChildren {
  href: string;
}

export default function LinkButton(props: LinkButtonInterface) {
  return (
    <Link href={props.href} className="transition hover:scale-110 active:scale-95">
      {props.children}
    </Link>
  );
}
