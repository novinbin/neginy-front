"use client";

import bg from "@/public/img/managerPanel/bg.png";
import title from "@/public/img/managerPanel/title.svg";
import Image from "next/image";
import a from "@/public/img/heroSection/heroSection.webp";
import { CommandDialog } from "cmdk";
function ManagerPanel({ data }) {
  const keys = ["panelPhoto", "panelDescription", "panelServiesDescription"];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const { panelPhoto, panelDescription, panelServiesDescription } = values;

  return (
    <div className="lg:py-9">
      <div className="relative max-lg:hidden">
        <Image src={bg} alt="bg" width={360} height={240} className="w-full" />

        <div className="absolute left-44 top-32">
          <h2 className="mb-7 text-left text-3xl font-bold">
            پنل تخصصی برای مدیریت مراسم ها
          </h2>
          <p className="mr-auto w-1/2 text-justify">{panelDescription || ""}</p>
        </div>
      </div>
      <div className="relative bg-[#E3E1DF]">
        <div className="absolute -top-9 left-72 w-96 max-lg:-top-9 max-lg:left-1/2 max-lg:hidden max-lg:-translate-x-1/2">
          <div className="relative flex items-center justify-center">
            <Image
              src={title}
              alt="title"
              width={480}
              height={360}
              className=""
            />
            <p className="absolute text-white max-lg:text-sm">
              فرصت استثنایی برای گسترش کسب و کار خود
            </p>
          </div>
        </div>
        <div className="mx-auto grid w-4/5 grid-cols-2 items-center justify-center gap-4 max-lg:grid-cols-1">
          <div className="relative max-lg:hidden">
            <div className="absolute -top-32 left-1/2 flex -translate-x-1/2 items-center justify-center">
              <div className="flex size-56 rotate-45 items-center justify-center rounded-lg bg-[#CDA274]">
                <div className="absolute bottom-5 left-5 flex size-56 items-center justify-center rounded-lg border-4 border-[#F0CEA0]">
                  <Image
                    src={panelPhoto || a}
                    alt="img"
                    width={260}
                    height={140}
                    className="h-52 w-52 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:my-20 max-lg:my-4">
            <h2 className="mb-7 text-2xl font-bold">
              چرا در این سایت خدمات خود را عرضه کنیم؟
            </h2>
            <p className="text-justify">{panelServiesDescription || ""} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerPanel;
