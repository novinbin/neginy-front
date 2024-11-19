"use client";

import a from "@/public/img/onlinePayment/payment-gift.png";
import Image from "next/image";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { routes } from "@/routes/routes";

function OnlinePayment({ data }) {
  const keys = ["onlineGiftsPhoto", "onlineGiftsDescription"];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const { onlineGiftsPhoto, onlineGiftsDescription } = values;

  return (
    <div>
      <div className="mx-auto max-lg:w-11/12 lg:w-4/5">
        <div className="grid grid-cols-1 items-center justify-between lg:grid-cols-2 gap-6">
          <div className="lg:m-9 max-lg:order-2">
            <div className="flex flex-col items-center justify-between lg:gap-6 max-lg:gap-1">
              <div className="flex flex-col justify-between lg:gap-6 max-lg:gap-2">
                <div className="lg:mt-4 flex flex-col lg:gap-7 max-lg:gap-1">
                  <p className="text-lg text-[#666] max-lg:text-base">
                    تازه ترین روش پرداخت هدیه
                  </p>
                  <p className="text-4xl font-medium max-lg:text-xl max-md:text-lg">
                    پرداخت آنلاین <span className="text-[#7097A2]">هدیه</span>
                  </p>
                </div>
                <p className="mt-7 text-justify leading-9 max-lg:text-base max-md:mt-2 max-md:text-sm">
                  {onlineGiftsDescription}
                </p>
                <div className="flex w-full gap-4 rounded-xl max-lg:justify-center">
                  <Link href={routes.auth.guest} className="flex gap-4 rounded-lg border border-[#5D8A98] bg-[#5D8A98] px-4 py-1 max-lg:my-4">
                    <MoveRightIcon stroke="#fff" className="mt-1" />
                    <p className="text-xl text-white max-lg:text-lg">
                      ورود به عروسی
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:m-9 max-lg:order-1">
            <div>
              <Image
                src={onlineGiftsPhoto || a}
                alt="table with full of gifts for bride and groom"
                width={540}
                height={480}
                className="w-full rounded-lg max-lg:h-[222px] lg:h-[444px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlinePayment;
