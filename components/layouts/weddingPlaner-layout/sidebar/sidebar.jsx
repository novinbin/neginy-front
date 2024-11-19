"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { navItems } from "../nav-items";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { farsiNumber } from "@/lib/farsi-number";
import Image from "next/image";
import logo from "@/public/img/logo/logo.svg";

const SideBar = () => {
  const pathname = usePathname();

  const [activeMenu, setActiveMenu] = useState(null);

  const changeActiveMenu = (index) => {
    activeMenu === index ? setActiveMenu(null) : setActiveMenu(index);
  };

  return (
    <div className="sticky top-0 h-screen w-0 overflow-hidden bg-[#CFBEAD] bg-opacity-35 shadow-lg backdrop-blur-md lg:w-1/6">
      <div className="flex h-full max-h-screen flex-col gap-2 pb-6">
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
              className="mt-5 h-20 w-40"
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
                      "flex items-center gap-3 rounded-lg p-2 transition-all duration-100 hover:bg-[#68807A]/90 hover:text-white",
                      pathname.endsWith(item.href) && "bg-[#68807A] text-white",
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
                  <span className="px-2 text-xs text-muted-foreground">
                    {item.title}
                  </span>
                )}

                {item.type === "subMenu" && (
                  <div>
                    <div
                      onClick={() => changeActiveMenu(index)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg bg-[#68807A] p-2 hover:bg-[#68807A]/90 hover:text-white",
                        activeMenu === index && "bg-[#68807A] text-white",
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
                                "transition-all duration-100",
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
                        activeMenu === index && "mt-2 max-h-96 opacity-100",
                      )}
                    >
                      {item.subMenu.map((subMenuItem, subMenuIndex) => (
                        <Link
                          key={subMenuIndex}
                          href={subMenuItem.href}
                          className={cn(
                            "flex items-center gap-x-2 rounded-lg p-2 transition-all duration-100 hover:bg-[#68807A]/90 hover:text-white",
                            pathname.endsWith(subMenuItem.href) &&
                              "bg-[#68807A] text-white",
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
      </div>
    </div>
  );
};

export default SideBar;
