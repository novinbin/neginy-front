"use client";

import Image from "next/image";
import flowerFrame from "@/public/img/services/flower-frame.svg";
import hand from "@/public/img/services/bride-hand.husband-hand.png";
import coupleMetting from "@/public/img/services/couple-meeting.png";
import weddingRings from "@/public/img/services/wedding-rings.png";

function Services({ data }) {
  const keys = [
    "servicesPhotoOne",
    "servicesPhotoTwo",
    "servicesPhotoThree",
    "servicesGalleryDescription",
    "servicesDescription",
  ];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const {
    servicesPhotoOne,
    servicesPhotoTwo,
    servicesPhotoThree,
    servicesGalleryDescription,
    servicesDescription,
  } = values;

  return (
    <div>
      <div className="mx-auto max-lg:w-11/12 lg:mt-20 lg:w-4/5">
        <div>
          <h2 className="text-center text-7xl font-extrabold max-lg:text-2xl max-md:text-xl">
            خدمات ما
          </h2>
          <p className="text-center text-lg max-lg:mt-2 max-lg:text-base max-md:text-sm lg:mt-4">
            {servicesGalleryDescription || ""}
          </p>
        </div>
        <div className="max-lg:mt-4 lg:mt-7"></div>
        <div>
          <div className="grid w-full grid-cols-1 items-center justify-between gap-9 lg:grid-cols-2">
            <div className="flex flex-col gap-9">
              <div className="flex flex-col max-lg:gap-2 lg:gap-5">
                <p className="text-2xl font-medium max-lg:text-lg max-md:text-base">
                  گالری اختصاصی
                </p>
                <p className="leading-9 text-[#666] max-md:text-sm">
                  {servicesDescription || ""}
                </p>
              </div>

              <div className="flex w-full items-center justify-center">
                <div>
                  <div className="relative">
                    <Image
                      src={flowerFrame}
                      alt="it is flower frame with two white flower around frame"
                      width={360}
                      height={240}
                      className=" lg:h-[444px] lg:w-[444px] object-contain lg:mt-14  "
                    />
                    <Image
                      src={servicesPhotoOne || weddingRings}
                      alt="couple rings with flowers"
                      width={360}
                      height={240}
                      className="absolute lg:left-[152px] lg:top-[88px] max-lg:top-[22px] max-lg:right-[6.25rem] mt-14 lg:h-40 lg:w-40 max-lg:w-36 max-lg:h-36   rounded-2xl max-md:left-[120px]"
                    />
                  </div>
                  <p className="text-center text-7xl capitalize text-[#ECE9E5] max-lg:hidden">
                    new gallery
                  </p>
                </div>
              </div>
            </div>
            <div className="max-md:hidden">
              <div className="flex w-full flex-col items-center justify-center">
                <div className="relative">
                  <Image
                    src={flowerFrame}
                    alt="it is flower frame with two white flower around frame"
                    width={360}
                    height={240}
                    className="h-[444px] w-[444px]"
                  />
                  <Image
                    src={servicesPhotoTwo || hand}
                    alt="the bride hand with the groom hand"
                    width={360}
                    height={240}
                    className="absolute left-[152px] top-36 h-40 w-40 rounded-2xl max-md:left-[120px]"
                  />
                </div>
                <div className="relative">
                  <Image
                    src={flowerFrame}
                    alt="it is flower frame with two white flower around frame"
                    width={360}
                    height={240}
                    className="h-[444px] w-[444px]"
                  />
                  <Image
                    src={servicesPhotoThree || coupleMetting}
                    alt="the groom waiting outside of room waiting for bride"
                    width={360}
                    height={240}
                    className="absolute left-[152px] top-36 h-40 w-40 rounded-2xl max-md:left-[120px]"
                  />
                </div>
                <p className="text-center text-7xl capitalize text-[#ECE9E5]">
                  memorable moments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
