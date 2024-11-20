"use client"

import PaginationComponent from "@/components/pagination";
import ToastError from "@/components/toast/toast-error";
import { axios } from "@/lib/axios";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function GiftsList() {

  const searchParams = useSearchParams()
  const search = searchParams.get('code')
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const [data1, setData1] = useState(false);
  const [data2, setData2] = useState(false);


  useEffect(() => {
    // fetchDefaultData();
    // fetchWeddingCard();
    fetchWeddingGiftsCard();
  }, [searchParams]);

  // const fetchDefaultData = async () => {
  //   setIsLoading(true);
  //   const formData = new FormData();
  //   formData.append("code", search);

  //   await axios
  //     .post(`api/login-guest`, formData)
  //     .then((response) => {
  //       setData(response?.data);
  //       console.log(response?.data)
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         <ToastError
  //           text={
  //             'این مراسم به شما تعلق ندارد'
  //           }
  //         />,
  //       );
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // const fetchWeddingCard = async () => {

  //   await axios
  //     .get(`api/get/weddingCard/${search}`)
  //     .then((response) => {
  //       setData1(response?.data);
  //       console.log(response?.data)
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         <ToastError
  //           text={
  //             'این مراسم به شما تعلق ندارد'
  //           }
  //         />,
  //       );
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const fetchWeddingGiftsCard = async () => {

    await axios
      .get(`api/get/gifts/${search}?page=${searchParams.get("page") || 1}`)
      .then((response) => {
        setData2(response?.data);
        console.log("data2", response?.data)
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              'این مراسم به شما تعلق ندارد'
            }
          />,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div>
      <div className="mx-auto mt-12 flex h-16 w-11/12 items-center gap-4 overflow-x-auto rounded-br-[99px] rounded-tl-[99px] bg-[#87A09B] bg-opacity-50 pr-20 backdrop-blur-md sm:pr-7 md:pr-12">
        <p>مجموع کل هدایا :</p>
        <p>{persianPriceFormat(+data2?.total_gifts)} تومان</p>
      </div>

      <div className="mx-auto mt-9 grid w-11/12 grid-cols-4 items-center justify-center overflow-x-auto rounded-lg backdrop-blur-md">
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          ردیف
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          نام و نام خانوادگی
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          تاریخ واریز
        </div>
        <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
          هدیه
        </div>
        {data2?.gifts?.data?.map((gift, index) => (
          <>
            <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
              {index + 1}
            </div>
            <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
              {`${gift?.guest_name} ${gift?.guest_family}`}
            </div>
            <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
              {farsiNumber(jaliliDate(gift?.created_at))}
            </div>
            <div className="flex items-center justify-center border border-[#DFE3DF] px-2 py-5">
              {persianPriceFormat(+gift?.gift_price)}
            </div>
          </>
        ))
        }
      </div>


      <PaginationComponent
        total={data2?.gifts?.total || 0}
        page={data2?.gifts?.current_page || 1}
        perPage={data2?.gifts?.per_page || 10}
      />
    </div>
  );
}

export default GiftsList;
