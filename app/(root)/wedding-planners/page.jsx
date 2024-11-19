"use client";
import a from "@/public/img/weddingPlaner/weddingPlaner.png";
import Image from "next/image";
import twitter from "@/public/img/SNSIcon/twitter.svg";
import insta from "@/public/img/SNSIcon/insta.svg";
import facebook from "@/public/img/SNSIcon/facebook.svg";
import b from "@/public/img/WeddingHall/flower.png";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfig } from "@/hooks/use-config";
import { axios } from "@/lib/axios";
import PaginationComponent from "@/components/pagination";
import Link from "next/link";
import LoadingPage from "@/components/loading-page";
import { routes } from "@/routes/routes";

function WeddingPlanners() {
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
      .get(`/api/halls?page=${searchParams.get("page") || 1}}`)
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
      <div className="mx-auto w-11/12 py-20">
        <h1 className="mb-12 text-center text-4xl font-bold max-lg:text-xl max-md:text-lg">
          لیست ودینگ پلنرا
        </h1>
        <div className="grid grid-cols-4 items-center justify-center gap-9 max-lg:grid-cols-2">
          <div className="rounded-3xl bg-white shadow-lg">
            <Image
              src={a}
              alt="image wedding planer"
              width={540}
              height={480}
              className="h-44 rounded-t-3xl"
            />
            <h2 className="mb-4 mt-9 text-center text-2xl max-lg:text-xl max-md:text-lg">
              john smith
            </h2>
            <p className="text-center text-[#737373] max-lg:text-base">
              profetional
            </p>
            <div className="my-5 flex items-center justify-center gap-4 pb-7">
              <Image
                src={twitter}
                width={100}
                height={100}
                alt="twitter icon"
                className="h-9 w-9 max-lg:h-7 max-lg:w-7 max-md:h-5 max-md:w-5"
              />
              <Image
                src={insta}
                width={100}
                height={100}
                alt="instageram icon"
                className="h-9 w-9 max-lg:h-7 max-lg:w-7 max-md:h-5 max-md:w-5"
              />
              <Image
                src={facebook}
                width={100}
                height={100}
                alt="facebook icon"
                className="h-9 w-9 max-lg:h-7 max-lg:w-7 max-md:h-5 max-md:w-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeddingPlanners;
