"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import instageram from "@/public/img/svg-icon/instageram.svg";
import telegram from "@/public/img/svg-icon/telegram.svg";
import whatsapp from "@/public/img/svg-icon/whatsapp.svg";
import { routes } from "@/routes/routes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { useLinkConfigs } from "@/hooks/use-link-configs";

function Nav() {
  const userHook = useUser();
  const userRole = userHook?.userData?.data?.role || userHook?.userData?.role ;
  const useLinkConfig = useLinkConfigs();

  const getPanelLink = () => {
    switch (userRole) {
      case "admin":
        return routes.admin.dashboard;
      case "ceremony":
        return routes.ceremony.dashboard;
      case "studio":
        return routes.studio.dashboard;
      case "talar":
        return routes.talar.dashboard;
      case "user":
        return routes.user.dashboard;
      case "wedding_planer":
        return routes.weddingPlaner.dashboard;
      default:
        return routes.auth.signIn;
    }
  };

  const [footerData, setFooterData] = useState({
    address: "",
    phone: "",
    ig: "",
    whatsapp: "",
    telegram: "",
    email: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    useLinkConfig.mainPageData.forEach((prop) => {
      switch (prop.key) {
        case "footerPhone":
          setFooterData((prev) => ({ ...prev, phone: prop.value }));
          break;
        case "footerEmail":
          setFooterData((prev) => ({ ...prev, email: prop.value }));
          break;
        case "footerAddress":
          setFooterData((prev) => ({ ...prev, address: prop.value }));
          break;
        case "footerIg":
          setFooterData((prev) => ({ ...prev, ig: prop.value }));
          break;
        case "footerWhatsApp":
          setFooterData((prev) => ({ ...prev, whatsapp: prop.value }));
          break;
        case "footerTelegram":
          setFooterData((prev) => ({ ...prev, telegram: prop.value }));
          break;
        default:
          break;
      }
    });
  };

  const navLinks = [
    { id: 1, name: "خانه", link: "/" },
    { id: 2, name: "خدمات", link: "/services" },
    { id: 3, name: "ارتباط با ما", link: routes.landing.contact },
    { id: 4, name: "درباره ما", link: routes.landing.about },
  ];

  const sns = [
    { id: 1, img: instageram, name: "اینستاگرام", link: footerData.ig },
    { id: 2, img: telegram, name: "تلگرام", link: footerData.telegram },
    { id: 3, img: whatsapp, name: "واتس آپ", link: footerData.whatsapp },
  ];

  const signInBtn = [
    {
      id: 1,
      name: userHook.userData ? "پنل کاربری" : " ورود یا ثبت نام",
      link: getPanelLink(),
    },
    { id: 2, name: "ورود به عروسی", link: "/auth/guest" },
  ];

  return (
    <div>
      <div className="bg-[#68807A]">
        <div className="mx-auto flex h-20 w-4/5 items-center justify-between max-lg:hidden">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-9">
              {navLinks.map((navItem) => (
                <Link href={navItem.link} key={navItem.id}>
                  <p className="text-lg font-semibold text-white">
                    {navItem.name}
                  </p>
                </Link>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-4">
                  {sns.map((s) => (
                    <Link href={s.link} key={s.id}>
                      <Image
                        src={s.img}
                        width={100}
                        height={100}
                        alt={s.name}
                        className="h-5 w-5"
                      />
                    </Link>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {signInBtn.map((btn) => (
                    <Link href={btn.link} key={btn.id}>
                      <Button variant="outline">{btn.name}</Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-20 items-center justify-between px-4 lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu stroke="white" className="size-9" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription className="mt-9 flex flex-col gap-7">
                  {navLinks.map((navItem) => (
                    <Link href={navItem.link} key={navItem.id}>
                      <p className="text-lg font-semibold text-black">
                        {navItem.name}
                      </p>
                    </Link>
                  ))}
                  <Link href={getPanelLink()}>
                    <Button>
                      {userHook.userData ? "پنل کاربری" : " ورود یا ثبت نام"}
                    </Button>
                  </Link>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-3 max-lg:hidden">
            {signInBtn.map((btn) => (
              <Link href={btn.link} key={btn.id}>
                <Button variant="outline">{btn.name}</Button>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 lg:hidden">
            <Link href={getPanelLink()}>
              <Button variant="outline">ورود به عروسی</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
