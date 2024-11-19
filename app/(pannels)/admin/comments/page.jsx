"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import PaginationComponent from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import { toast } from "sonner";

const UsersPage = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCities();
  }, [searchParams, loading]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(
        `/api/admin/comments?page=${searchParams.get("page") || 1}&approved=${searchParams.get("approved") || ""}`,
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

  const changeAccess = async (accessValue) => {
    setLoading(true);

    try {
      const response = await axios.post(`/api/admin/approve-all/comments`, {
        approved: accessValue,
      });

      if (response.status === 204) {
        setData(response.data);
        toast.success(<ToastSuccess text={"نظر با موفقیت تایید شد"} />);
      }
    } catch (error) {
      toast.error(
        <ToastError text={error?.response?.data?.message || "خطایی رخ داد"} />,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-0 lg:px-10">
      <DataTableHeader title="نظرات کاربران">
        <Button
          onClick={() => changeAccess(true)}
          className="mt-3 bg-[#BCC8BC] text-black hover:bg-black hover:text-[#bcc8bc]"
        >
          تایید همه نظرات
        </Button>
      </DataTableHeader>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <DataTable columns={columns} data={data.data} />
          <PaginationComponent
            total={data.meta.total || 0}
            page={data.meta.current_page || 1}
            perPage={data.meta.per_page || 10}
          />
        </>
      )}
    </div>
  );
};

export default UsersPage;
