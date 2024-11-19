"use client";


import { Eye} from "lucide-react";

import Link from "next/link";
import { routes } from "@/routes/routes";




const CellAction = ({ data }) => {




  return (
    <div className="flex items-center justify-center gap-1">
      <Link href={routes.talar.comments.details(data.id)}>
        <div className="cursor-pointer rounded-md p-1 transition-all duration-200 hover:bg-muted">
          <Eye size={18} strokeWidth={1.5} className="text-blue-500" />
        </div>
      </Link>
    </div>
  );
};

export default CellAction;
