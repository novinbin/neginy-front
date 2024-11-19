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
import { usePathname, useRouter } from "next/navigation";
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

const Header = () => {
  const userHook = useUser();



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
  }, [pathname]);

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
        "sticky top-0 z-50 mx-2 flex h-14 items-center gap-4 rounded-lg bg-[#DFE3DF]  px-4 shadow-lg transition-all duration-300 lg:h-[60px] lg:px-6",
        navbar && "",
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className=" shrink-0 text-black bg-transparent hover:bg-black hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col  p-1 px-2"
        >
          <div className="flex items-center px-3 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 font-semibold"
            >
              <Image
                src={logo}
                alt="logo"
                width={250}
                height={100}
                className="mt-4 h-16 w-40"
              />
            </Link>
          </div>
          <ScrollArea dir="rtl" className="mt-5 flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className={cn("my-1", item.type === "text" && "mt-3")}
                >
                  {item.type === "link" && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "bg--light flex items-center gap-3 rounded-lg p-2 hover:bg-white",
                        pathname.endsWith(item.href) && "bg-white",
                      )}
                     
                    >
                      {item?.icon(18, 1.5)}
                      {item.title}
                      {item.quantity && (
                        <Badge className="mr-auto flex shrink-0 items-center justify-center rounded-full pt-1">
                          {farsiNumber(item.quantity)}
                        </Badge>
                      )}
                    </Link>
                  )}

                  {item.type === "text" && (
                    <span className="px-2 text-xs text-muted-foreground/60">
                      {item.title}
                    </span>
                  )}

                  {item.type === "subMenu" && (
                    <div>
                      <div
                        onClick={() => changeActiveMenu(index)}
                        className={cn(
                          "bg-yellow-light flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-white",
                          activeMenu === index && "bg-white",
                        )}
                      >
                        <span className="text-xs">{item.icon()}</span>
                        <div className="relative flex w-full items-center justify-between">
                          <span>{item.title}</span>
                          {item.subMenu.length !== 0 && (
                            <span>
                              <ChevronLeft
                                size={18}
                                strokeWidth={1.5}
                                className={cn(
                                  "transition-all duration-300",
                                  activeMenu === index && "-rotate-90",
                                )}
                              />
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "text-paragraph mr-4 flex max-h-0 flex-col gap-y-2 overflow-hidden text-xs font-normal opacity-50 transition-all duration-300",
                          activeMenu === index && "mt-2 max-h-40 opacity-100",
                        )}
                      >
                        {item.subMenu.map((subMenuItem, subMenuIndex) => (
                          <Link
                            key={subMenuIndex}
                            href={subMenuItem.href}
                            className={cn(
                              "bg-yellow-light flex items-center gap-x-2 rounded-lg p-2 transition-all duration-300 hover:bg-white",
                              pathname.endsWith(subMenuItem.href) && "bg-white",
                            )}
                          >
                            <span>{subMenuItem.icon()}</span>
                            <span>{subMenuItem.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

     

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="mr-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90">
            <CircleUserRound size={24} />
            <div className="flex items-center gap-1">
             
              <span>{farsiNumber(userHook?.userData?.data?.name)}</span>
            
            </div>
            <ChevronDown size={20} strokeWidth={3} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="flex w-full flex-col rtl:items-end"
        >
          <DropdownMenuLabel>اکانت من</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full text-right">
            <Link className="w-full" href={""}>
              مشخصات کاربری
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="w-full cursor-pointer">
            <div className="flex w-full items-center gap-x-2 rtl:justify-end">
              <LogOut size={14} strokeWidth={1.5} className="rtl:rotate-180" />
              <span>خروج</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
