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
    accessorKey: "name",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نام سرویس </span>
      </div>
    ),
  },

  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نقش</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>
          {row?.original?.business_type === "admin"
            ? "ادمین"
            : row?.original?.business_type === "talar"
              ? "تالار"
              : row?.original?.business_type === "ceremony"
                ? "تشریفات"
                : row?.original?.business_type === "studio"
                  ? "آتلیه"
                  : row?.original?.business_type === "wedding_planer"
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
];
