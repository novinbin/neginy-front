"use client";

import bg from "@/public/img/footer/footer.png";
import { PhoneIcon, MapPinIcon } from "lucide-react";
import whatsapp from "@/public/img/SNSIcon/whatsapp.svg";
import insta from "@/public/img/SNSIcon/instaW.svg";
import telegram from "@/public/img/SNSIcon/telegram.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLinkConfigs } from "@/hooks/use-link-configs";
import "./footer.css";

function Footer() {

  const useLinkConfig = useLinkConfigs();

  let data = useLinkConfig.mainPageData;

  const keys = [
    "footerAddress",
    "footerPhone",
    "footerIg",
    "footerWhatsApp",
    "footerTelegram",
    "footerEmail",
  ];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const {
    footerAddress,
    footerPhone,
    footerIg,
    footerWhatsApp,
    footerTelegram,
    footerEmail,
  } = values;


  return (
    <div>
      <div
        className="h-96"
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-16 py-9">
          <h2 className="updock-regular text-center text-7xl font-bold capitalize text-white">
            royal wedding
          </h2>
          <div className="flex w-full items-center justify-center gap-20 max-lg:flex-col">
            <div className="flex items-center gap-4">
              <p className="text-white">شماره تماس</p>
              <PhoneIcon stroke="#fff" />
              <p className="text-white">{footerPhone || ""}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white">آدرس</p>
              <MapPinIcon stroke="#fff" />
              <p className="text-white">{footerAddress || ""}</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-9">
            <Link href={footerWhatsApp || ""}>
              <Image
                src={whatsapp}
                width={100}
                height={100}
                alt="whatsapp icon"
                className="h-10 w-10 cursor-pointer border-b border-white pb-2"
              />
            </Link>
            <Link href={footerTelegram || ""}>
              <Image
                src={telegram}
                width={100}
                height={100}
                alt="telegram icon"
                className="h-10 w-10 cursor-pointer border-b border-white pb-2"
              />
            </Link>
            <Link href={footerIg || ""}>
              <Image
                src={insta}
                width={100}
                height={100}
                alt="instagram icon"
                className="h-10 w-10 cursor-pointer border-b border-white pb-2"
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button variant="outline" className="border-none bg-[#888C92]">
              ثبت سفارش
            </Button>
          </div>
          <div>
            <p className="mb-7 text-center text-2xl font-bold text-white">صفحات</p>
            <div className="flex items-center justify-center gap-9">
              <Link href="/">
                <p className="text-lg font-semibold text-white">خانه</p>
              </Link>
              <Link href="/">
                <p className="text-lg text-white">خدمات</p>
              </Link>
              <Link href="/">
                <p className="text-lg text-white">ارتباط با ما</p>
              </Link>
              <Link href="/">
                <p className="text-lg text-white">درباره ما</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
