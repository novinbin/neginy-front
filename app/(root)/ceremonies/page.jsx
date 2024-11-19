"use client";
import Image from "next/image";
import a from "@/public/img/WeddingHall/1.jpg";
import b from "@/public/img/WeddingHall/flower.png";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfig } from "@/hooks/use-config";
import { axios } from "@/lib/axios";
import PaginationComponent from "@/components/pagination";
import Link from "next/link";
import LoadingPage from "@/components/loading-page";
import { routes } from "@/routes/routes";

function WeddingHall() {
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
      .get(`/api/ceremonies?page=${searchParams.get("page") || 1}}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-[#F5F2EE]">
      <div className="mx-auto w-11/12">
        <h1 className="py-20 text-center text-2xl">تشریفات</h1>
        <div className="grid items-center justify-center gap-9 pb-20 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              {data?.data?.map((talar) => (
                <div
                  className="relative rounded-2xl bg-[#DFC7AC]"
                  key={talar.id}
                >
                  <Link href={routes.ceremonies.all(talar?.id)}>
                    <Image
                      src={talar?.profile_photo}
                      width={540}
                      height={480}
                      alt={talar?.business_name}
                      className="h-52 w-full rounded-t-2xl"
                    />
                    <div className="relative">
                      <div className="absolute left-1/2 top-1/2 z-40 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center py-9">
                        <button className="flex justify-center rounded-xl bg-black bg-opacity-40 px-9 py-2 text-white">
                          {talar?.business_name}
                        </button>
                      </div>
                      <div className="-z-30">
                        <Image
                          src={b}
                          width={540}
                          height={480}
                          alt="wedding hall"
                          className="z-0 h-28 w-full"
                        />
                      </div>
                    </div>
                    <div className="mx-auto w-11/12">
                      <p className="pb-9 pt-4 font-bold">{talar?.address}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="py-9">
          <PaginationComponent
            total={data?.meta?.total || 0}
            page={data?.meta?.current_page || 1}
            perPage={data?.meta?.per_page || 10}
          />
        </div>
      </div>
    </div>
  );
}

export default WeddingHall;
