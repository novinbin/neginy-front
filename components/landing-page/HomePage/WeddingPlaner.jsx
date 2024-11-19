"use client";

import Image from "next/image";
import a from "@/public/img/weddingPlaner/weddingPlaner.png";
import twitter from "@/public/img/SNSIcon/twitter.svg";
import insta from "@/public/img/SNSIcon/insta.svg";
import facebook from "@/public/img/SNSIcon/facebook.svg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const weddingPlaner = [
  {
    id: 1,
    img: a,
    name: "Julian Jameson",
    text: "Profession",
    icontwitter: twitter,
    iconinsta: insta,
    iconfacebook: facebook,
  },
  {
    id: 2,
    img: a,
    name: "Julian Jameson",
    text: "Profession",
    icontwitter: twitter,
    iconinsta: insta,
    iconfacebook: facebook,
  },
  {
    id: 3,
    img: a,
    name: "Julian Jameson",
    text: "Profession",
    icontwitter: twitter,
    iconinsta: insta,
    iconfacebook: facebook,
  },
  {
    id: 4,
    img: a,
    name: "Julian Jameson",
    text: "Profession",
    icontwitter: twitter,
    iconinsta: insta,
    iconfacebook: facebook,
  },
];

function WeddingPlaner({ data }) {
  const keys = ["plannerDescription"];
  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const { plannerDescription } = values;

  return (
    <div>
      <div className="mx-auto lg:mt-20 max-lg:w-11/12 lg:w-4/5">
        <h2 className="lg:mb-9 max-lg:mb-4 text-xl font-bold max-lg:text-lg max-md:text-base">
          معرفی ودینگ پلنرها
        </h2>
        <p className="lg:mb-20 max-lg:mb-4 w-1/2 text-justify leading-9 max-lg:w-full max-lg:text-base max-md:text-sm">
          {plannerDescription || ""}
        </p>

        <Carousel dir="ltr">
          <CarouselContent>
            {weddingPlaner?.map((planer) => (
              <CarouselItem
                key={planer.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="rounded-3xl bg-white shadow-lg">
                  <Image
                    src={planer.img}
                    alt="image wedding planer"
                    width={540}
                    height={480}
                    className="h-72 rounded-t-3xl max-lg:h-56 max-md:h-48"
                  />
                  <h2 className="mb-4 mt-9 text-center text-2xl max-lg:text-xl max-md:text-lg">
                    {planer.name}
                  </h2>
                  <p className="text-center text-[#737373] max-lg:text-base">
                    {planer.text}
                  </p>
                  <div className="my-5 flex items-center justify-center gap-4 pb-7">
                    <Image
                      src={planer.icontwitter}
                      width={100}
                      height={100}
                      alt="twitter icon"
                      className="h-9 w-9 max-lg:h-7 max-lg:w-7 max-md:h-5 max-md:w-5"
                    />
                    <Image
                      src={planer.iconinsta}
                      width={100}
                      height={100}
                      alt="instageram icon"
                      className="h-9 w-9 max-lg:h-7 max-lg:w-7 max-md:h-5 max-md:w-5"
                    />
                    <Image
                      src={planer.iconfacebook}
                      width={100}
                      height={100}
                      alt="facebook icon"
                      className="h-9 w-9 max-lg:h-7 max-lg:w-7 max-md:h-5 max-md:w-5"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default WeddingPlaner;
