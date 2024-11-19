"use client";

import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import { routes } from "@/routes/routes";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/public/img/dashboard/service.png";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { toJalaali } from "jalaali-js";
import { farsiNumber } from "@/lib/farsi-number";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <RowNumber number={row.index + 1} />;
    },
  },

  {
    id: "business[profile_photo]",
    header: "پروفایل سرویس دهنده",
    cell: ({ row }) => (
      <Link
        href={
          row.original.business.business_type === "talar"
            ? routes.weddingHall.all(row.original.business.id)
            : row.original.business.business_type === "ceremony"
              ? routes.ceremonies.all(row.original.business.id)
              : row.original.business.business_type === "stodio"
                ? routes.studios.all(row.original.business.id)
                : ""
        }
      >
        <div className="flex w-full items-center justify-center gap-4">
          <Image
            src={
              row.original.business.profile_photo
                ? row.original.business.profile_photo
                : defaultImage
            }
            alt={row.original.business.business_name}
            width={540}
            height={480}
            className="h-12 w-12 rounded-full"
          />
          <span className="text-lg">{row.original.business.business_name}</span>
        </div>
      </Link>
    ),
  },

  {
    id: "bus_service[name]",
    header: "سرویس درخواستی",
    cell: ({ row }) => <span>{row.original.bus_service.name}</span>,
  },
  {
    id: "price",
    header: "قیمت",
    cell: ({ row }) => (
      <span>
        {persianPriceFormat(
          +row.original.price ? +row.original.price : "مشخص نشده",
        )}
      </span>
    ),
  },
  {
    id: "created_at",
    header: "تاریخ ثبت",
    cell: ({ row }) => {
      const date = row.original.created_at.slice(0, 10);
      const [year, month, day] = date.split("-");
      const jalaaliDate = toJalaali(+year, +month, +day);
      return (
        <span>
          {farsiNumber(jalaaliDate.jy)}-{farsiNumber(jalaaliDate.jm)}-
          {farsiNumber(jalaaliDate.jd)}
        </span>
      );
    },
  },
  {
    id: "reserve_date",
    header: "تاریخ رزرو ",
    cell: ({ row }) => {
      const date = row.original.reserve_date.slice(0, 10);
      const [year, month, day] = date.split("-");
      const jalaaliDate = toJalaali(+year, +month, +day);
      return (
        <span>
          {farsiNumber(jalaaliDate.jy)}-{farsiNumber(jalaaliDate.jm)}-
          {farsiNumber(jalaaliDate.jd)}
        </span>
      );
    },
  },

  {
    id: "status",
    header: "وضعیت",
    cell: ({ row }) => (
      <span
        className={`${row.original.status === "در انتظار تایید" ? "text-yellow-500" : row.original.status === "رد شده" ? "text-red-500" : row.original.status === "کنسل شده" ? "text-red-500" : row.original.status === "در انتظار پرداخت" ? "text-yellow-500" : row.original.status === "تایید و پرداخت شده" ? "text-green-500" : "text-black"}`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
