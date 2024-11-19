"use client";

import SearchTable from "@/components/search-table";
import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";
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
        <span>نام اشتراک</span>
        <SearchTable queryTitle="name" />
      </div>
    ),
  },

  {
    accessorKey: "business_type",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نقش</span>
        <FilterTable queryTitle="role" />
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
    id: "price",
    header: "قیمت",
    cell: ({ row }) => <div>{persianPriceFormat(+row.original.price)}</div>,
  },
  {
    id: "month_count",
    header: "تعداد ماه ها",
    cell: ({ row }) => <div>{farsiNumber(row.original.month_count)}</div>,
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
