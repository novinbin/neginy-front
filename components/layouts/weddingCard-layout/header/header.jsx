"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "../nav-items";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  CircleUserRound,
  ChevronLeft,
  LogOut,
  Menu,
} from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { axios } from "@/lib/axios";
import { routes } from "@/routes/routes";
import { toast } from "sonner";
import Image from "next/image";
import { farsiNumber } from "@/lib/farsi-number";
import ToastSuccess from "@/components/toast/toast-success";
import logo from "@/public/img/logo/logo.svg";
import home from "@/public/img/svg-icon/home.svg";
import backImg from "@/public/img/svg-guest/backArrow.svg";

const Header = () => {
  const userHook = useUser();

  const searchParams = useSearchParams()
  const search = searchParams.get('code')

  const router = useRouter();
  const pathname = usePathname();

  const sheetRef = useRef(null);

  const [activeMenu, setActiveMenu] = useState(null);
  const [navbar, setNavbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeActiveMenu = (index) => {
    activeMenu === index ? setActiveMenu(null) : setActiveMenu(index);
  };

  useEffect(() => {
    sheetRef?.current?.click();
  }, [pathname, searchParams]);

  const changeNavBg = () => {
    if (window.scrollY > 70) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeNavBg);
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 items-center gap-4 rounded-lg bg-[#DFE3DF] px-4 shadow-lg transition-all duration-300 lg:h-[60px] lg:px-6",
        navbar && "",
      )}
    >
      <div className="mx-auto flex w-11/12 items-center justify-between">
        <div>
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2"
          >
            <Image
              src={home}
              alt="home svg icon"
              width={250}
              height={100}
              className="h-9 w-9"
            />
          </Link>
        </div>

        <Link href={`/wedding-card/dashboard?code=${search}`}>
          <Image
            src={backImg}
            width={360}
            height={240}
            alt="arrow back icon"
            className="h-9 w-9"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
