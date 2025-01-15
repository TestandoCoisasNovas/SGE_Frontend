import CompleteRegister from "@/components/home/CompleteRegister";
import Loading from "@/components/utils/Loading";
// import Loading from "@/components/utils/Loading";
import { PageSelector } from "@/types/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [needCompleteRegister, setNeedCompleteRegister] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && user) {
      if (user.cpf) {
        router.push(PageSelector.HomePage);
      } else {
        setNeedCompleteRegister(true);
      }
    } else if (!isLoading && !user) {
      router.push(PageSelector.LogIn);
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading || !needCompleteRegister ? <Loading width={50} /> : needCompleteRegister && <CompleteRegister />}
    </div>
  );
}
