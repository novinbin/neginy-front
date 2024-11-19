"use client";
import Image from "next/image";
import hero from "@/public/img/heroSection/heroSection.webp";
import logo from "@/public/img/logo/logo.svg";

function HeroSection({ data }) {
  let heroPhoto = data?.find((item) => item.key === "photo")?.value;

  return (
    <div>
      <div className="relative">
        <Image
          src={heroPhoto ? heroPhoto : hero}
          alt="groom and bride both have flower next to each other"
          width={1080}
          height={720}
          className="w-full lg:h-screen"
          loading="lazy"
        />
        <div className="absolute bottom-1/4 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 max-md:hidden">
          <div className="mt-1 w-11 border border-[#999]"></div>
          <p className="whitespace-nowrap text-[#999]">
            تشریفات عروسی و خدمات مجالس
          </p>
          <div className="mt-1 w-11 border border-[#999]"></div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-md:pb-12">
          <Image alt="Royal wedding" src={logo} width={540} height={480} />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
