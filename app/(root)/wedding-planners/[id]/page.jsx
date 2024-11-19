import Image from "next/image";
import line from "@/public/img/weddingPlaner/line.png";
import a from "@/public/img/weddingPlaner/a.png";
import insta from "@/public/img/SNSIcon/insta.svg";
import phone from "@/public/img/SNSIcon/phone.svg";
import map from "@/public/img/SNSIcon/map.svg";

function page() {
  return (
    <div>
      <div className="bg-[#F5F2EE]">
        <div className="mx-auto w-11/12 py-20">
          <div className="grid grid-cols-2 items-center justify-center gap-9 max-md:grid-cols-1">
            <div className="flex w-full items-center justify-center">
              <div className="">
                <Image
                  src={a}
                  width={540}
                  height={480}
                  alt="wedding planner"
                  className=" w-64 "
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-[#5B5F62]">
                  رزومه شخصی
                </h1>
                <Image
                  src={line}
                  width={540}
                  height={480}
                  alt="line"
                  className="h-4 w-44"
                />
              </div>
              <div>
                <p className="my-9 text-justify leading-8">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم
                  ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم
                  ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم
                  ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                </p>
              </div>
              <div className="grid grid-cols-3 items-center justify-center gap-9">
                <div className="flex h-44 w-44 flex-col items-center justify-center gap-6 rounded-xl bg-white shadow-xl max-md:h-28 max-md:w-28">
                  <span className="text-2xl font-bold max-md:text-lg">
                    20 +
                  </span>
                  <span className="text-xl text-[#939597] max-md:text-base">
                    پروژه های موفق
                  </span>
                </div>
                <div className="flex h-44 w-44 flex-col items-center justify-center gap-6 rounded-xl bg-white shadow-xl max-md:h-28 max-md:w-28">
                  <span className="text-2xl font-bold max-md:text-lg">
                    16 +
                  </span>
                  <span className="text-xl text-[#939597] max-md:text-base">
                    کارمندان
                  </span>
                </div>
                <div className="flex h-44 w-44 flex-col items-center justify-center gap-6 rounded-xl bg-white shadow-xl max-md:h-28 max-md:w-28">
                  <span className="text-2xl font-bold max-md:text-lg">12</span>
                  <span className="text-xl text-[#939597] max-md:text-base">
                    سال تجربه
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 grid w-3/5 grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 items-center justify-center gap-9">
            <div className="flex items-center justify-center gap-2">
              <Image
                src={insta}
                alt="insta icon"
                width={360}
                height={240}
                className="h-9 w-9"
              />
              <p>instageram</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={phone}
                  alt="phone icon"
                  width={360}
                  height={240}
                  className="h-7 w-7"
                />
                <p>شماره تماس:</p>
              </div>
              <p>09123456789</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={map}
                  alt="map icon"
                  width={360}
                  height={240}
                  className="h-7 w-7"
                />
                <p>آدرس:</p>
              </div>
              <p>کرمان خیابان خواجو</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
