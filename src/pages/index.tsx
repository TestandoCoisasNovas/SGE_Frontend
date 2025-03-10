import Loading from "@/components/utils/Loading";
import { PageSelector } from "@/types/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(PageSelector.HomePage);
    } else if (!isLoading && !user) {
      router.push(PageSelector.LogIn);
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Loading />
    </div>
  );
}
