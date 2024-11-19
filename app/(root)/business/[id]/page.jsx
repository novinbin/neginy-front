"use client";

import Image from "next/image";
import detail from "@/public/img/WeddingHall/detail.png";
import { axios } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ToastError from "@/components/toast/toast-error";
import { Instagram, MapPin, Phone, Star } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import { farsiNumber } from "@/lib/farsi-number";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Detail({ params }) {
  const [data, setData] = useState({});

  const [dataTable, setDataTable] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/business/${params.id}`)
      .then((response) => {

        setData(response?.data);
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function clickToast() {
    toast.success(<ToastSuccess text={`سرویس مدنظر خود را انتخاب کنید.`} />);
  }

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/business/${params.id}/services`)
      .then((response) => {
        setDataTable(response?.data?.data);
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-[#F5F2EE]">
      <div className="mx-auto w-4/5 py-20">
        <div className="grid grid-cols-2 items-center justify-center gap-4 max-md:grid-cols-1">
          <div>
            <div className="flex w-full items-center justify-center">
              <div className="relative">
                <Image
                  src={detail}
                  width={540}
                  height={480}
                  alt="img"
                  className=""
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src={data?.data?.profile_photo}
                    width={540}
                    height={480}
                    alt="alt"
                    className="h-[17rem] w-[17rem] rounded-full max-md:h-[12rem] max-md:w-[12rem]"
                  />
                </div>
              </div>
            </div>
            <Carousel dir="ltr" className="mb-7">
              <CarouselContent>
                {Object.values(data?.data?.photos || {}).map((img, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Image
                      src={img}
                      alt={`photo-${index}`}
                      width={540}
                      height={480}
                      className="rounded-xl w-32 h-32 "
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>


          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-2xl">تالار {data?.data?.business_name}</h1>
            <div className="flex flex-col gap-3">
              <p className="text-justify leading-9">
                {data?.data?.introduction}
              </p>
            </div>
            <div className="flex w-full justify-end">
              <a
                href="#our-services"
                className="w-32 rounded-2xl bg-gold py-2 text-center text-lg text-white"
                onClick={() => clickToast()}
              >
                انتخاب سرویس
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Star fill="gold" stroke="gold" />
              <h2>
                {farsiNumber(data?.data?.rating?.rating)} از{" "}
                {farsiNumber(data?.data?.rating?.total_points)}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <MapPin />
              <h2>{data?.data?.address}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Instagram />
                <h2>{data?.data?.instagram}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Phone />
                <h2>{data?.data?.phone_1}</h2>
              </div>
            </div>
          </div>

          <div className="mt-20" id="our-services">
            <h2 className="mb-4 text-center text-xl font-bold">خدمات ما</h2>
            <div>
              <DataTable columns={columns} data={dataTable} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
