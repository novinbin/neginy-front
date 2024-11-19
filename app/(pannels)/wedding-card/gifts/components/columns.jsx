"use client";

import SearchTable from "@/components/search-table";
import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";

import { farsiNumber } from "@/lib/farsi-number";
import StatusAction from "./status-action";
import FilterTable from "@/components/filter-table";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <RowNumber number={row.index + 1} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نام و نام خانوادگی</span>
        <SearchTable queryTitle="name" />
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>شماره تماس</span>
        <SearchTable queryTitle="phone" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{farsiNumber(row?.original?.phone)}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "ایمیل",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{farsiNumber(row?.original?.email)}</span>
      </div>
    ),
  },
  {
    accessorKey: "national_code",
    header: "کدملی",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{farsiNumber(row?.original?.national_code)}</span>
      </div>
    ),
  },

  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نقش</span>
        <FilterTable queryTitle="role" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>
          {row?.original?.role === "admin"
            ? "ادمین"
            : row?.original?.role === "talar"
              ? "تالار"
              : row?.original?.role === "ceremony"
                ? "تشریفات"
                : row?.original?.role === "studio"
                  ? "آتلیه"
                  : row?.original?.role === "wedding_planer"
                    ? "ودینگ پلنر"
                    : "کاربر"}
        </span>
      </div>
    ),
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  {
    id: "status",
    header: "وضعیت کاربر",
    cell: ({ row }) => <StatusAction data={row.original} />,
  },
];
