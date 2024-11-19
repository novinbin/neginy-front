"use client";


import RowNumber from "@/components/row-number";
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
    accessorKey: "business_info[business_name]",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نام کسب و کار</span>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>امتیاز</span>
      </div>
    ),
  },
 

  {
    id: "actions",
    header: "مشاهده جزئیات نظر",
    cell: ({ row }) => <CellAction data={row.original} />,
  },

  {
    accessorKey: "approved",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>وضعیت</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>
          {row?.original?.approved === true ? "تایید شده" : "در حال بررسی"}
        </span>
      </div>
    ),
  },
];
