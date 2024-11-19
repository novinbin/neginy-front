import { Button } from "@/components/ui/button";
import Image from "next/image";
import scan from "@/public/img/scan/scan.png";

function Scan() {
  return (
    <div>
      <div className="mx-auto lg:py-48 max-lg:pt-[7.5rem] max-lg:pb-9 max-lg:w-11/12 lg:w-4/5">
        <div className="relative flex h-72 flex-col items-center justify-center gap-9 rounded-xl bg-[#CBD0D6]">
          <div className="absolute -top-28">
            <div className="relative">
              <div className="absolute right-0 w-9 border-t-2 border-[#A7988F]"></div>
              <div className="absolute left-0 w-9 border-t-2 border-[#A7988F]"></div>
              <div className="absolute bottom-0 right-0 w-9 border-b-2 border-[#A7988F]"></div>
              <div className="absolute bottom-0 left-0 w-9 border-b-2 border-[#A7988F]"></div>
              <div className="absolute bottom-0 right-0 h-9 border-r-2 border-[#A7988F]"></div>
              <div className="absolute right-0 top-0 h-9 border-r-2 border-[#A7988F]"></div>
              <div className="absolute bottom-0 left-0 h-9 border-l-2 border-[#A7988F]"></div>
              <div className="absolute left-0 top-0 h-9 border-l-2 border-[#A7988F]"></div>

              <Image
                src={scan}
                alt="scan barcode"
                width={540}
                height={480}
                className="h-52 w-52 p-6"
              />
            </div>
          </div>

          <p className="mt-20 text-xl">کد هدیه خود را اسکن کنید.</p>
          <Button variant="outline" className="bg-[#888C92] text-white">
            ثبت سفارش
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Scan;
