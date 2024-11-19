"use client";

import SearchTable from "@/components/search-table";
import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";
import StatusAction from "./status-action";
import FilterTable from "@/components/filter-table";
import { Button } from "@/components/ui/button";

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
        <SearchTable queryTitle="business_info[business_name]" />
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
    accessorKey: "description",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>توضیحات</span>
      </div>
    ),
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
