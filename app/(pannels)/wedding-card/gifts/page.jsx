"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import PaginationComponent from "@/components/pagination";
import { useConfig } from "@/hooks/use-config";
import { useSearchParams } from "next/navigation";
import GiftsList from "./components/gifts-list";

const UsersPage = () => {

  const [isLoading, setIsLoading] = useState(true);



  return (
    <div className="px-0 lg:px-10">

      <h2 className="mt-9 text-center text-xl font-bold">لیست هدایا</h2>

      <>
        <GiftsList />
      </>
    
    </div>
  );
};

export default UsersPage;
