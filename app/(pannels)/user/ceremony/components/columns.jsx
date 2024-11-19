"use client";

import SearchTable from "@/components/search-table";
import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import { farsiNumber } from "@/lib/farsi-number";
import StatusAction from "./status-action";
import FilterTable from "@/components/filter-table";
import { jaliliDate } from "@/lib/jalali-date";

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
        <span>نام عروس و داماد</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row?.original?.bride_groom}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>تاریخ</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{farsiNumber(
                      jaliliDate(row?.original?.date),
                    )}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "ادرس",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{farsiNumber(row?.original?.address)}</span>
      </div>
    ),
  },
  {
    accessorKey: "national_code",
    header: "کد مهمانی",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row?.original?.code}</span>
      </div>
    ),
  },


  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  }
];
