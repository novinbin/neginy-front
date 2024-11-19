"use client";

import SearchTable from "@/components/search-table";
import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import noPhoto from "@/public/img/404/no-photo.jpg";
import { farsiNumber } from "@/lib/farsi-number";
import Image from "next/image";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import SelectAction from "./select-action";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <RowNumber number={row.index + 1} />;
    },
  },
  {
    id: "photo",
    header: "عکس",
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-center py-3">
        {row?.original?.photo ? (
          <Image
            src={row.original.photo}
            width={480}
            height={360}
            alt={row.original.name}
            className="h-20 w-20 rounded-sm"
          />
        ) : (
          <Image
            src={noPhoto}
            width={480}
            height={360}
            alt={row.original.name}
            className="h-20 w-20 rounded-sm"
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>عنوان سرویس</span>
      </div>
    ),
  },
  {
    id: "cost",
    header: "قیمت",
    cell: ({ row }) => <div>{persianPriceFormat(+row.original.cost)}</div>,
  },
  {
    id: "actions",
    header: "جزئیات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  {
    id: "select",
    header: "انتخاب سرویس",
    cell: ({ row }) => <SelectAction data={row.original} />,
  },
];