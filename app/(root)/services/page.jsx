"use client";

import Image from "next/image";
import React from "react";
import Search from "./components/Search";
import Link from "next/link";
import Services from "./components/Services";
import { useLinkConfigs } from "@/hooks/use-link-configs";
import rings from "@/public/img/contact/rings.jpg";

const ServicesComponent = () => {
  const useLinkConfig = useLinkConfigs();

  let data = useLinkConfig.mainPageData;

  const keys = [
    "servePhotoOne",
    "servePhotoTwo",
    "servePhotoThree",
    "servePhotoFour",
  ];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const { servePhotoOne, servePhotoTwo, servePhotoThree, servePhotoFour } =
    values;

  const servisec = [
    {
      id: 1,
      name: "آتلیه ها",
      link: "/studios",
      src: servePhotoOne ?? "img/WeddingHall/1.jpg",
    },
    {
      id: 2,
      name: "تالار ها",
      link: "/wedding-hall",
      src: servePhotoTwo ?? "img/WeddingHall/2.jpg",
    },
    {
      id: 3,
      name: "تشریفات",
      link: "/ceremonies",
      src: servePhotoThree ?? "img/WeddingHall/3.jpg",
    },
    {
      id: 4,
      name: "ودینگ پلنر",
      link: "/wedding-planners",
      src: servePhotoFour ?? "img/WeddingHall/4.jpg",
    },
  ];

  return (
    <>
      <Search />
      <div className="container mx-auto mb-32 mt-10 h-screen min-h-fit p-4">
        <h2 className="mb-4 text-center text-2xl font-bold">کسب و کارها</h2>
        <div className="mx-auto mb-1 w-1/2 border-b-2 border-gray-500"></div>
        <div className="mx-auto mb-12 w-[40%] border-b-2 border-gray-500"></div>
        <div className="mb-4 grid grid-cols-1 justify-items-center gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {servisec.map((item, index) => (
            <Link key={index + item.id} href={item.link}>
              <div className="relative overflow-hidden rounded-lg bg-gray-200 md:h-60 md:w-60 lg:h-72 lg:w-72">
                <Image
                  src={item.src}
                  alt={item.name}
                  className="h-full w-full"
                  width={300}
                  height={300}
                />
                <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[#000000dc] from-40% to-[#ffffff00] to-100% text-center text-xl">
                  <p className="absolute bottom-14 w-full text-center text-4xl font-normal text-white md:bottom-5 md:text-2xl">
                    {item.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className="mb-2 mt-12 text-center text-2xl font-bold">خدمات</h2>
        <div className="mx-auto mb-1 w-1/2 border-b-2 border-gray-500"></div>
        <div className="mx-auto mb-12 w-[40%] border-b-2 border-gray-500"></div>
        <Services />
      </div>
    </>
  );
};

export default ServicesComponent;
