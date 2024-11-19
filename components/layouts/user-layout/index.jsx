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

const UserLayout = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const userHook = useUser();
  const router = useRouter();

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
          if (response?.data?.data?.role === "user") {
            setIsAdmin(true);
          }
        }
      })
      .catch((err) => {
      })
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

  return isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <LoadingPage />
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
          <div className="min-h-full rounded-lg  p-3 py-5 ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
