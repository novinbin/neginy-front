"use client";

import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import StatusAction from "./status-action";
import FilterApprove from "@/components/filter-approve";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <RowNumber number={row.index + 1} />;
    },
  },

  {
    accessorKey: "business_info.business_name",
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
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  {
    id: "status",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>وضعیت</span>
        <FilterApprove queryTitle="approved" />
      </div>
    ),
    cell: ({ row }) => <StatusAction data={row.original} />,
  },
];
