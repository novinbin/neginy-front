"use client";

import Image from "next/image";
import crown from "@/public/img/work-sample/crown.png";
import a from "@/public/img/work-sample/work.jpg";

function WorkSamples({ data }) {
  const keys = ["formalityPhoto", "formalityName", "formalityDescription"];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const { formalityPhoto, formalityName, formalityDescription } = values;

  return (
    <div>
      <div className="relative">
        <div className="mx-auto grid grid-cols-2 items-center justify-between gap-7 max-lg:w-11/12 max-lg:grid-cols-1 lg:w-4/5 lg:py-20">
          <div className="max-lg:order-2">
            <div className="relative flex items-center gap-4 lg:py-6">
              <p className="text-xl text-[#857F7F] max-lg:text-lg max-md:text-base">
                تجربه مراسمی رویایی
              </p>
              <div className="lg:mt-3 w-11 border border-[#8C6E47]"></div>
              <Image
                src={crown}
                width={100}
                height={100}
                alt="crown icon"
                className="absolute -right-28 -top-20 w-72 -rotate-12"
              />
            </div>
            <p className="text-3xl max-lg:text-xl max-md:text-lg">
              {formalityName || ""}
            </p>
            <p className="lg:mt-11 text-justify text-lg leading-9 text-[#857F7F] max-lg:text-base max-md:text-sm">
              {formalityDescription || ""}
            </p>
          </div>
          <div className="lg:my-52">
            <div className="relative max-lg:order-1">
              <div className="oval absolute right-9 top-5 -rotate-45 bg-[#B2A298] max-lg:hidden"></div>
              <Image
                src={formalityPhoto || a}
                alt="table wedding with two glass on it with flowers"
                width={540}
                height={480}
                className="w-full rounded-l-2xl shadow-xl max-lg:h-[15rem] max-lg:rounded-xl lg:absolute lg:-top-60 lg:left-0 lg:h-[30rem] lg:rounded-br-[400rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkSamples;
