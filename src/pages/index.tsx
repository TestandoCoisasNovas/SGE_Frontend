import Loading from "@/components/utils/Loading";
import { PageSelector } from "@/types/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoading } = useUser();
  const routerNavigation = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      routerNavigation.push("/" + PageSelector.HomePage);
    } else if (!isLoading && !user) {
      routerNavigation.push(PageSelector.LogIn);
    }
  }, [user, isLoading, routerNavigation]);

  return (
    <div className="flex flex-col min-h-screen">
      <Loading />
    </div>
  );
}
