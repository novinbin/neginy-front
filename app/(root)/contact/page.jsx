"use client";

import { useLinkConfigs } from "@/hooks/use-link-configs";
import { axios } from "@/lib/axios";
import dessert from "@/public/img/contact/dessert.jpg";
import gifts from "@/public/img/contact/gifts.jpg";
import rings from "@/public/img/contact/rings.jpg";
import table from "@/public/img/contact/table.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

function Contact() {
  const useLinkConfig = useLinkConfigs();

  let data = useLinkConfig.mainPageData;

  const keys = [
    "footerPhone",
    "footerEmail",
    "footerAddress",
    "footerIg",
    "contactDescription",
    "contactPhotoOne",
    "contactPhotoTwo",
    "contactPhotoThree",
    "contactPhotoFour",
  ];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const {
    footerPhone,
    footerEmail,
    footerAddress,
    footerIg,
    contactDescription,
    contactPhotoOne,
    contactPhotoTwo,
    contactPhotoThree,
    contactPhotoFour,
  } = values;

  return (
    <div>
      <div className="bg-[#F5F2EE]">
        <div className="mx-auto w-4/5">
          <div className="pt-20">
            <h1 className="mb-12 text-center text-2xl font-semibold">
              با ما در ارتباط باشید
            </h1>
            <div className="grid items-center justify-center gap-14 pb-14 md:grid-cols-1 lg:grid-cols-2">
              <div>
                <p className="text-justify leading-9">
                  {contactDescription || ""}
                </p>
                <div className="flex flex-col gap-4 pt-9">
                  <p>
                    <span className="font-bold">آدرس : </span>
                    <span className="text-[#292F36]">
                      {footerAddress || ""}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">ایمیل : </span>
                    <span className="text-[#292F36]">{footerEmail || ""}</span>
                  </p>
                  <p>
                    <span className="font-bold">شماره تلفن : </span>
                    <span className="text-[#292F36]">{footerPhone || ""}</span>
                  </p>
                  <p>
                    <span className="font-bold">اینستاگرام : </span>
                    <span className="text-[#292F36]">{footerIg || ""}</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 justify-center gap-4">
                <div className="flex flex-col gap-4">
                  <Image
                    src={contactPhotoOne || table}
                    alt="table img"
                    width={540}
                    height={480}
                    className="h-80 w-96 rounded-tr-[120px]"
                  />
                  <Image
                    src={contactPhotoTwo || dessert}
                    alt="dessert img"
                    width={540}
                    height={480}
                    className="h-60 w-96"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Image
                    src={contactPhotoThree || rings}
                    alt="rings img"
                    width={540}
                    height={480}
                    className="h-60 w-96"
                  />
                  <Image
                    src={contactPhotoFour || gifts}
                    alt="gifts img"
                    width={540}
                    height={480}
                    className="h-80 rounded-bl-[326px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
