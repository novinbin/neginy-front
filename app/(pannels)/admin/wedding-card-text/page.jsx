/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import PaginationComponent from "@/components/pagination";
import { useConfig } from "@/hooks/use-config";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { routes } from "@/routes/routes";
import WedText from "./components/wed-text";

const UsersPage = () => {
  const configHook = useConfig();
  const searchParams = useSearchParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, [searchParams, configHook.refreshFlag]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admin/card-texts?page=${searchParams.get("page") || 1}}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="px-0 lg:px-10">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="mx-auto flex w-11/12 items-end justify-between rounded-lg bg-[#E7D7CA] bg-opacity-40 px-4 py-7">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold">متن کارت عروسی</h2>
              <p className="text-xl">
                در این صفحه می توانید اطلاعات مربوط به متن کارت عروسی را ببینید
              </p>
            </div>
            <Link
              href={routes.admin.weddingCardText.create}
              className="rounded-xl bg-[#E7D7CA] px-4 py-2"
            >
              افزودن متن
            </Link>
          </div>
          <div className="mx-auto my-9 w-11/12">
            <WedText data={data.data} />
          </div>
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
