"use client";

import Image from "next/image";
import flower from "@/public/img/forums/flower.png";
import a from "@/public/img/onlinePayment/gift-table.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import Link from "next/link";
import { routes } from "@/routes/routes";

function PopularForums() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/halls?&filter=popular`)
 
      .then((response) => {
        setData(response?.data);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div className="mx-auto lg:py-20 max-lg:w-11/12 lg:w-4/5">
        <div className="lg:mb-9 max-lg:mb-4 flex items-center justify-center gap-4">
          <Image
            src={flower}
            alt="flower icon"
            width={100}
            height={100}
            className="h-16 w-16 max-md:h-11 max-md:w-11"
          />
          <p className="text-4xl text-[#A6978E] max-lg:text-xl max-md:text-lg">
            محبوب ترین تالار ها
          </p>
        </div>
        <div>
          <Carousel dir="ltr">
            <CarouselContent>
              {data?.data?.map((d) => (
                <CarouselItem
                  className="relative md:basis-1/2 lg:basis-1/3"
                  key={d.id}
                >
                  <div className="rounded-3xl rounded-bl-3xl bg-[#D9D6D3] pt-9 shadow-lg">
                    <p className="mb-9 border-b border-white pb-4 text-center text-xl max-lg:text-lg max-md:text-base">
                      {d?.business_name}
                    </p>
                    <div className="mx-auto h-4 w-3/4 rounded-t-3xl bg-[#757575]"></div>
                    <div className="mx-auto h-4 w-4/5 rounded-t-3xl bg-[#9E9D9D]"></div>
                    <Image
                      src={d?.profile_photo}
                      alt={d?.business_name}
                      width={540}
                      height={480}
                      className="max-lg:w-full !rounded-bl-3xl h-72 !rounded-t-[44px]"
                    />
                    <div className="absolute bottom-0 right-0 flex h-24 w-24 items-center justify-center rounded-tl-[44px] bg-[#F4F1ED]">
                      <Link
                        href={routes.weddingHall.all(d?.id)}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3E3A2E] text-white"
                      >
                        مشاهده
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default PopularForums;
