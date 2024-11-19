"use client";

import Link from "next/link";
import DataTableHeader from "@/components/data-table-header";
import { routes } from "@/routes/routes";
import { useConfig } from "@/hooks/use-config";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";
import LoadingPage from "@/components/loading-page";
import PaginationComponent from "@/components/pagination";

function HomePagePackage() {
  const configHook = useConfig();
  const searchParams = useSearchParams();

  const [data, setData] = useState([]);
  const [accesses, setAccesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, [searchParams, configHook.refreshFlag]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/user/bought-packages?page=${searchParams.get("page") || 1}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAccess();
  }, []);

  const fetchAccess = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/user/accesses`)
      .then((response) => {
        setAccesses(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-full max-h-full w-full flex-col items-center overflow-y-auto">
      <DataTableHeader title="نمایش تاریخچه پکیج های خریداری شده">
        <d iv className="flex items-center gap-4">
          <Link
            href={routes.user.package.all}
            className="rounded-lg bg-[#A7988F] px-4 py-2 text-white"
          >
            پکیج جدید
          </Link>
        </d>
      </DataTableHeader>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="w-full">
          {data?.data?.length > 0 ? (
            <div className="grid grid-cols-4 gap-12 max-lg:grid-cols-2 max-md:grid-cols-1">
              <div className="col-span-3 w-full max-lg:order-2 max-lg:col-span-full">
                <div className="grid w-full grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {data?.data?.map((d, index) => (
                    <div
                      className="flex h-full flex-col justify-between gap-2 rounded-xl border border-zinc-500 bg-[#d4b694] bg-opacity-50 px-4 pt-7 backdrop-blur-md"
                      key={index}
                    >
                      <ul>
                        <p className="mb-3 text-center font-bold">
                          {d?.package_name}
                        </p>
                        {d?.features?.map((f, index) => (
                          <li dir="rtl" key={index}>
                            <span className="">
                              {farsiNumber(index + 1)} -{" "}
                            </span>
                            <span className="">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="col-span-full">
                        <p className="pb-4 pt-9 text-center text-zinc-500">
                          {farsiNumber(jaliliDate(d?.created_at).slice(0, 10))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <PaginationComponent
                  total={data?.meta.total || 0}
                  page={data?.meta.current_page || 1}
                  perPage={data?.meta.per_page || 10}
                />
              </div>

              <div className="col-span-1 mx-auto w-full rounded-3xl bg-[#DFE3DF] px-4 py-9 shadow-md backdrop-blur-lg max-lg:order-1 max-lg:col-span-full">
                <h2 className="mb-7 text-center text-xl font-bold">
                  دسترسی های فعال
                </h2>
                <ul className="flex flex-col gap-4">
                  {accesses?.data?.features?.map((feature, index) => (
                    <li className="" key={index}>
                      {farsiNumber(index + 1)} - {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-center gap-2 pb-4 pt-9 text-center text-[#525252]">
                  <p>آخرین ویرایش :</p>
                  <p>{farsiNumber(jaliliDate(accesses?.data?.updated_at))}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-auto">
              <div className="relative flex h-12 w-24 items-center justify-center">
                <div className="absolute mx-auto my-auto">پکیج جدید</div>
                <Link
                  href={routes.user.package.all}
                  className="pulse h-full w-full rounded border-4 border-double border-black bg-transparent text-black"
                ></Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePagePackage;
