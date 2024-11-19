"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { axios } from "@/lib/axios";
import LoadingPage from "@/components/loading-page";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import SearchForm from "./search-form";
import { useFactor } from "@/hooks/use-factor";

const ConnectFactorDialog = ({ isOpen, onClose, title, description }) => {
  const factorHook = useFactor();

  const [isMounted, setIsmounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    Result: [],
    Total: "",
  });
  const [searchData, setSearchData] = useState({
    fromDate: "",
    toDate: "",
    orderBy: "",
    limit: "",
    offset: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, searchData]);

  const fetchData = async () => {
    setIsLoading(true);

    await axios
      .get(
        `/api/employee/dasht/invoices?limit=${searchData?.limit || 10}&offset=${searchData?.offset || 0}&orderBy=${searchData?.orderBy || "Date"}&fromDate=${searchData?.fromDate || ""}&toDate=${searchData?.toDate || ""}`,
      )
      .then((response) => {
      
        setData(response.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-screen-xl"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <SearchForm searchData={searchData} setSearchData={setSearchData} />

        <div className="flex w-full justify-center gap-2">
          {isLoading ? (
            <LoadingPage />
          ) : (
            <div className="max-h-96 w-full overflow-auto rounded-lg border">
              <DataTable columns={columns} data={data.Result} />
            </div>
          )}
        </div>

        <Button
          disabled={isLoading}
          variant="outline"
          onClick={onClose}
          className="h-8 text-xs"
        >
          بستن
        </Button>
      </div>
    </Modal>
  );
};

export default ConnectFactorDialog;
