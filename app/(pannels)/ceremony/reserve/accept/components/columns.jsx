"use client";

import SearchTable from "@/components/search-table";
import RowNumber from "@/components/row-number";
import { Eye } from "lucide-react";
import { persianPriceFormat } from "@/lib/persian-price-format";
import Link from "next/link";
import CellAction from "./cell-action";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <RowNumber number={row.index + 1} />;
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1 ">
        <span>نام کاربر</span>
      </div>
    ),
    cell: ({ row }) => (
      <Link href="" className="flex items-center justify-center">
        <span>{row?.original?.user?.name}</span>
      </Link>
    ),
  },
  {
    accessorKey: "bus_service.name",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>سرویس</span>
      </div>
    ),
  },
  {
    accessorKey: "reserve_date",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>تاریخ درخواستی</span>
      </div>
    ),
  },

  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>قیمت</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>
          {row?.original?.price === null
            ? "تعریف نشده"
            : persianPriceFormat(+row?.original?.price)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>وضعیت</span>
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={`${row.original.status === "در انتظار تایید" ? "text-yellow-500" : row.original.status === "رد شده" ? "text-red-500" : row.original.status === "کنسل شده" ? "text-red-500" : row.original.status === "در انتظار پرداخت" ? "text-yellow-500" : row.original.status === "تایید و پرداخت شده" ? "text-green-500" : "text-black"} flex items-center justify-center`}
      >
        <span>{row?.original?.status}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
