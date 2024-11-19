"use client";

import useMount from "@/hooks/use-mount";
import { farsiNumber } from "@/lib/farsi-number";
import { persianPriceFormat } from "@/lib/persian-price-format";
import {
  BadgeDollarSign,
  BadgeInfo,
  CalendarCog,
  FolderPen,
  School,
} from "lucide-react";

const Details = ({ data }) => {
  const mount = useMount();

  if (!mount) {
    return null;
  }

  return (
    <div className="rounded-lg border border-white p-9 backdrop-blur-sm">
      <div className="grid items-center justify-center gap-y-9 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-3">
            <FolderPen stroke="#d8a977" />
            <p>نام پکیج</p>
          </div>
          <p>{data.name}</p>
        </div>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-3">
            <School stroke="#d8a977" />
            <p>کسب و کار</p>
          </div>
          <p>{data.business_type}</p>
        </div>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-3">
            <CalendarCog stroke="#d8a977" />
            <p>تعداد ماه ها</p>
          </div>
          <p>{farsiNumber(data.month_count)}</p>
        </div>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-3">
            <BadgeDollarSign stroke="#d8a977" />
            <p>قیمت پکیج</p>
          </div>
          <p>{persianPriceFormat(+data.price)}</p>
        </div>
        <div className="col-span-full flex flex-col gap-4">
          <div className="flex gap-3">
            <BadgeInfo stroke="#d8a977" />
            <p>ویژگی های پکیج</p>
          </div>
          <p className="flex flex-wrap items-center gap-4">
            {data?.properties?.map((property, index) => (
              <ul key={property.id} className="flex items-center gap-2">
                <span>{farsiNumber(index + 1)} - </span> <li>{property}</li>
              </ul>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
