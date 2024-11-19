"use client";

import useMount from "@/hooks/use-mount";
import { farsiNumber } from "@/lib/farsi-number";
import { persianPriceFormat } from "@/lib/persian-price-format";
import {
  BookOpenText,
  Earth,
  Mail,
  Map,
  Phone,
  School,
} from "lucide-react";
import Image from "next/image";
import { jaliliDate } from "@/lib/jalali-date";

const Details = ({ data }) => {

  const mount = useMount();

  if (!mount) {
    return null;
  }

  let cleanedDescription = data?.data?.user_description
    ?.replaceAll(/\n/g, " ")
    ?.replaceAll(/<br\s*\/?>/gi, " ");

  return (
    <div>
      <div className="grid justify-between gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="flex flex-col gap-7">
            <div className="grid grid-cols-3 items-center justify-center gap-7 max-lg:grid-cols-1">
              <div
                className={`flex h-20 w-full flex-col items-center justify-center rounded-lg ${data?.data?.status === "در انتظار تایید" ? "text-yellow-500" : data?.data?.status === "رد شده" ? "text-red-500" : data?.data?.status === "کنسل شده" ? "text-red-500" : data?.data?.status === "در انتظار پرداخت" ? "text-yellow-500" : data?.data?.status === "تایید و پرداخت شده" ? "text-green-500" : " "} bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
              >
                <p className="text-base text-stone-500">وضعیت : </p>
                <p className="py-2 text-center text-lg font-bold">
                  {data?.data?.status}
                </p>
              </div>
              <div
                className={`h-20 w-full rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
              >
                <p className="flex flex-col gap-2 py-2 text-center">
                  <p className="text-base text-stone-500">حدود قیمت : </p>
                  <p className="text-lg font-bold">
                    {data?.data?.price === null
                      ? "در انتظار سرویس دهنده"
                      : persianPriceFormat(+data?.data?.price)}
                  </p>
                </p>
              </div>

              <div
                className={`h-20 w-full rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
              >
                <p className="flex flex-col gap-2 py-2 text-center">
                  <p className="text-base text-stone-500"> تاریخ رزرو : </p>
                  <p className="text-lg font-bold">
                    {farsiNumber(
                      jaliliDate(data?.data?.reserve_date.slice(0, 10)),
                    )}
                  </p>
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-[#eee] bg-opacity-50 p-9 shadow-sm backdrop-blur-md">
              <div>
                <h2 className="pb-4 font-bold">
                  توضیحات درخواست {data?.data?.user?.name} :
                </h2>

                <p>{cleanedDescription}</p>
              </div>
            </div>
            <div className="rounded-xl bg-[#eee] bg-opacity-50 p-9 shadow-sm backdrop-blur-md">
              <div className="">
                <h2 className="pb-4 font-bold">توضیحات سرویس دهنده : </h2>
                <p>{data?.data?.business_description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 max-lg:col-span-2">
          <div className="flex flex-col items-center gap-7">
            <div className="grid w-full items-center justify-between gap-4 rounded-2xl border border-zinc-300 bg-[#eee] bg-opacity-50 p-4 backdrop-blur-xl max-lg:grid-cols-1 lg:grid-cols-2">
              <div className="col-span-full mt-4 flex flex-col gap-4">
                <h1 className="text-xl font-medium">اطلاعات کاربر :</h1>
                <div className="flex items-center gap-4">
                  <School stroke="#d4b694" />
                  <p className="text-lg font-normal">
                    {data?.data?.user?.name}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone stroke="#d4b694" />
                  <p>{farsiNumber(data?.data?.user?.phone)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Earth stroke="#d4b694" />
                  <p>{data?.data?.user?.city}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Map stroke="#d4b694" />
                  <p>{data?.data?.user?.state}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail stroke="#d4b694" />
                  <p>{data?.data?.user?.email}</p>
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 items-center justify-between gap-4 rounded-2xl border border-zinc-300 bg-[#eee] bg-opacity-50 p-4 backdrop-blur-xl">
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-medium">سرویس :</h1>
                <div className="flex items-center gap-4">
                  <School stroke="#d4b694" />
                  <p className="text-lg font-normal">
                    {data?.data?.bus_service?.name}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <Image
                  src={data?.data?.bus_service?.photo}
                  alt={data?.data?.bus_service?.name}
                  width={480}
                  height={360}
                  className="h-28 w-28 rounded-full shadow-xl"
                />
              </div>

              <div className="col-span-full mt-4 flex flex-col gap-4">
                <div className="flex gap-4">
                  <BookOpenText stroke="#d4b694" />
                  <p>{data?.data?.bus_service?.description}</p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center justify-between rounded-2xl border border-zinc-300 bg-[#eee] bg-opacity-50 p-4 backdrop-blur-md">
              <p className="flex flex-col gap-2 py-2 text-center">
                <p className="text-stone-500">تاریخ ثبت درخواست : </p>
                <p>
                  {farsiNumber(jaliliDate(data?.data?.created_at.slice(0, 10)))}
                </p>
              </p>
              <p className="flex flex-col gap-2 py-2 text-center">
                <p className="text-stone-500">آخرین بروزرسانی : </p>
                <p>
                 
                  {farsiNumber(
                    jaliliDate(data?.data?.updated_at.slice(0, 10)),
                  )}
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
