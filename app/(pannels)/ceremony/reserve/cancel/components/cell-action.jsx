"use client";

import Link from "next/link";
import { routes } from "@/routes/routes";

const CellAction = ({ data }) => {
  return (
    <div className="flex items-center justify-center gap-1 py-2">
      <Link href={routes.ceremony.reserve.details(data.id)}>مشاهده و ویرایش درخواست</Link>
    </div>
  );
};

export default CellAction;
