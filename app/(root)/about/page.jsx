"use client";
import Image from "next/image";
import pen from "@/public/img/about/pen.jpg";
import rings from "@/public/img/about/rings.jpg";
import ring from "@/public/img/about/ring.jpg";
import photo from "@/public/img/about/photo.jpg";
import { axios } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useLinkConfigs } from "@/hooks/use-link-configs";
import { persianPriceFormat } from "@/lib/persian-price-format";

function About() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const useLinkConfig = useLinkConfigs();

  let data = useLinkConfig.mainPageData;

  const keys = ["aboutPhoto", "aboutDescription", "aboutName"];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const { aboutPhoto, aboutDescription, aboutName } = values;

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/packages`)
      .then((response) => {
        setPackages(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="bg-[#F5F2EE]">
        <div className="mx-auto w-11/12">
          <h2 className="pt-14 text-center font-bold max-md:pb-7 md:text-lg lg:pb-24 lg:text-3xl">
            درباره ما
          </h2>
          <div className="grid items-center justify-between max-md:gap-7 md:grid-cols-1 lg:grid-cols-2 lg:gap-2">
            <div className="flex w-full justify-center">
              <Image
                src={aboutPhoto ? aboutPhoto : pen}
                alt="pen"
                width={540}
                height={480}
                className="rounded-bl-[123px] rounded-br-[20px] rounded-tl-[59px] rounded-tr-[273px] max-md:h-60 max-md:w-full lg:h-[525px] lg:w-[475px]"
              />
            </div>
            <div>
              <h1 className="mb-9 text-xl font-bold max-md:text-base">
                {aboutName || ""}
              </h1>
              <div className="flex flex-col gap-7">
                <p className="text-justify leading-9">
                  {aboutDescription || ""}
                </p>
              </div>
              <div className="mt-10 flex w-full justify-end">
                <button className="rounded-lg bg-gold px-7 py-2 text-xl text-white max-md:text-base">
                  با ما در ارتباط باشید.
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h2 className="mt-28 pb-9 text-center text-xl font-bold">
              پکیج های ما
            </h2>

            <div className="grid grid-cols-3 items-center justify-between gap-32 pb-20 max-lg:grid-cols-2 max-md:grid-cols-1">
              {packages?.data?.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col justify-between self-stretch rounded-xl bg-white"
                >
                  <Image
                    src={p?.photo || rings}
                    alt="rings"
                    width={540}
                    height={480}
                    className="h-72 w-full rounded-t-xl"
                  />
                  <div className="mt-3 flex w-full flex-col items-center justify-center gap-1">
                    <h2 className="text-2xl font-bold max-md:text-lg">
                      {p?.name}
                    </h2>
                    <h4>{persianPriceFormat(+p?.price)} تومان</h4>
                  </div>
                  <div>
                    <ul className="mx-auto my-9 flex w-4/5 flex-col gap-6">
                      {p?.features?.map((feature, index) => (
                        <li
                          className="flex items-center gap-2"
                          key={`feature-${index}`}
                        >
                          <span className="inline-block h-4 w-4 rounded-full bg-gold"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full rounded-b-xl bg-gold p-4 text-center">
                    <a
                      href=""
                      className="w-full bg-gold text-center text-xl text-white max-md:text-base"
                    >
                      خرید ماهانه
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
