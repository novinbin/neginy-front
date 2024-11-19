"use client";

import { useEffect, useState } from "react";
import Header from "./header/header";
import SideBar from "./sidebar/sidebar";
import { axios } from "@/lib/axios";
import { useUser } from "@/hooks/use-user";
import LoadingPage from "@/components/loading-page";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";
import bg from "@/public/img/auth/bg.png";
import a from "@/public/img/dashboard/wedding-planner.jpg";
import Link from "next/link";
import { toast } from "sonner";
import ToastSuccess from "@/components/toast/toast-success";

const WeddingPlanerLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const userHook = useUser();
  const router = useRouter();

  const userRole = userHook?.userData?.data?.business_info?.approved;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setIsLoading(true);

    await axios
      .get("/api/self")
      .then((response) => {
        if (response.status === 200) {
          userHook.setUserData(response?.data);
          if (response?.data?.data?.role === "wedding_planer") {
            setIsAdmin(true);
          }
        }
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isAdmin && !isLoading) {
    router.push(routes.auth.signIn);
  }

  if (!isAdmin && !isLoading) {
    return null;
  }

  const signOut = async () => {
    setIsLoading(true);

    const fetchData = () => {
      return new Promise(async (resolve) => {
        await axios.post("/logout").finally(() => {
          resolve("خارج شدید");
          userHook.setUserData(false);
        });
      });
    };

    toast.promise(fetchData, {
      loading: "در حال خروج...",
      success: () => {
        router.push(routes.auth.signIn);
        return <ToastSuccess text={"خارج شدید"} />;
      },
      error: "Error",
    });
  };

  return isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <LoadingPage />
    </div>
  ) : userRole === false ? (
    <div
      className="!h-auto !w-full"
      style={{
        backgroundImage: `url(${a.src})`,
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <p className="rounded-lg bg-opacity-75 px-9 py-4 text-xl backdrop-blur-lg">
          پس از تایید درخواست شما توسط ادمین دسترسی پنل برای شما باز خواهد شد.
        </p>
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="mt-9 rounded-md bg-black px-4 py-2 text-white duration-700 hover:bg-white hover:text-black hover:duration-500"
          >
            بازگشت به خانه
          </Link>
          <div
            onClick={signOut}
            className="mt-9 rounded-md bg-red-500 px-4 py-2 text-white duration-700 hover:bg-white hover:text-black hover:duration-500"
          >
            خروج
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        height: "100%",
      }}
      className="flex min-h-screen w-full flex-row"
    >
      <SideBar />
      <div className="flex w-full flex-col lg:w-5/6">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-3">
          <div className="min-h-full rounded-lg p-3 py-5">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default WeddingPlanerLayout;
