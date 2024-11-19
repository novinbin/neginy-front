"use client";

import useMount from "@/hooks/use-mount";
import { persianPriceFormat } from "@/lib/persian-price-format";
import noPhoto from "@/public/img/404/no-photo.jpg";
import { BadgeDollarSignIcon, Scroll, Settings } from "lucide-react";
import Image from "next/image";

const Details = ({ data }) => {
  const mount = useMount();

  if (!mount) {
    return null;
  }

  return (
    <div className="">
      <div className="rounded-lg bg-white bg-opacity-90 p-4 py-7 shadow-lg">
        <div className="my-4 flex items-center gap-2">
          <Settings stroke="#d8a977" />
          <h2 className="mt-2">اطلاعات سرویس</h2>
        </div>
        <div>
          <h1 className="mb-4 text-center text-xl font-bold">
            نام سرویس :
            <span className="text-[#d8a977]"> {data?.data?.name} </span>
          </h1>
          <Image
            src={data?.data?.photo ? data?.data?.photo : noPhoto}
            alt={data?.data?.name}
            width={480}
            height={360}
            className="mx-auto w-1/3 rounded-md"
          />
        </div>
        <div className="my-7 flex items-center gap-4">
          <BadgeDollarSignIcon stroke="#b5b7b5" />
          <p>قیمت :</p>
          <p>{persianPriceFormat(+data?.data?.cost)} تومان</p>
        </div>
        <div className="col-span-full mb-9 flex items-center gap-4">
          <Scroll stroke="#b5b7b5" />
          <p>توضیحات :</p>
          <p>{data?.data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
