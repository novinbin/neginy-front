"use client";

import LoadingPage from "@/components/loading-page";
import { useLinkConfigs } from "@/hooks/use-link-configs";
import { useUser } from "@/hooks/use-user";
import { axios } from "@/lib/axios";
import { mainPageKeys } from "@/lib/main-page-keys";
import { routes } from "@/routes/routes";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const userHook = useUser();
  const useLinkConfig = useLinkConfigs();
  const router = useRouter();
  const pathname = usePathname();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/config/${mainPageKeys}`);
      useLinkConfig.setLinkPageData(response?.data?.data);
    } catch (err) {
    }
  };

  const userInfo = async () => {
    try {
      const response = await axios.get("/api/self");
      if (response.status === 200) {
        userHook.setUserData(response?.data);
        redirectUser(response.data.data.role);
      }
    } catch (err) {
      userHook.setUserData(false);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectUser = (role) => {
    const roleRoutes = {
      admin: routes.admin.dashboard,
      user: routes.user.dashboard,
      talar: routes.talar.dashboard,
      ceremony: routes.ceremony.dashboard,
      studio: routes.studio.dashboard,
      wedding_planer: routes.weddingPlaner.dashboard,
    };

    if (pathname.endsWith(routes.auth.signIn) || pathname.endsWith(routes.auth.signUp)) {
      const redirectPath = roleRoutes[role];
      if (redirectPath) {
        router.push(redirectPath);
      }
    }
  };

  useEffect(() => {
    fetchData();
    userInfo();
  }, []);

  return isLoading ? (
    <div className="flex h-screen w-[100vw] items-center justify-center text-[#68807A]">
      <div className="animate-spin">
        <LoaderCircle size={48} />
      </div>
    </div>
  ) : (
    <main>{children}</main>
  );
};

export default AuthProvider;
