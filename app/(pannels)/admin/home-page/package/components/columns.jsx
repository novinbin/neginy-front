"use client";
import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import { farsiNumber } from "@/lib/farsi-number";
import { persianPriceFormat } from "@/lib/persian-price-format";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <RowNumber number={row.index + 1} />;
    },
  },
  {
    accessorKey: "admin",
    header: "ادمین",
    cell: ({ row }) => farsiNumber(row?.original?.admin?.name),
  },
  {
    accessorKey: "name",
    header: "عنوان",
    cell: ({ row }) => farsiNumber(row?.original?.name),
  },
  {
    accessorKey: "price",
    header: "قیمت",
    cell: ({ row }) => persianPriceFormat(+row?.original?.price),
  },
  {
    accessorKey: "description",
    header: "توضیحات",
    cell: ({ row }) => row?.original?.description.slice(0, 22),
  },
  {
    accessorKey: "feature",
    header: "ویژگی",
    cell: ({ row }) => row?.original?.feature,
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row?.original} />,
  },
];
