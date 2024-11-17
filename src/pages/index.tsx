import Footer from "@/components/home/Footer";
import Login from "@/components/home/Login";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const router = useRouter();

  // SHOWUP ANIMATION
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    // Clear the Timer after unmount
    return () => clearTimeout(timer);
  }, [router.asPath]);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>SGE Edu - Login</title>
      </Head>
      <div className="flex flex-1">
        <div
          className={twMerge(
            "flex flex-col m-auto items-center transform transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          )}
        >
          <Login />
        </div>
      </div>
      <Footer />
    </div>
  );
}
