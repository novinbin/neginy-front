
"use client"
import Image from "next/image";
import pic from "@/public/img/svg-guest/pic-vid.png";
import a from "@/public/img/svg-guest/pic.svg";
import b from "@/public/img/svg-guest/video.svg";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ToastError from "@/components/toast/toast-error";
import { axios } from "@/lib/axios";

function PicVideo() {

  const searchParams = useSearchParams()
  const search = searchParams.get('code')
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const [data1, setData1] = useState(false);
  const [data2, setData2] = useState(false);


  useEffect(() => {

    fetchWeddingGiftsCard();
  }, [searchParams]);


  const fetchWeddingGiftsCard = async () => {

    await axios
      .get(`api/get/gallery/${search}`)
      .then((response) => {
        setData2(response?.data);
        console.log("data2", response?.data)
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              'این مراسم به شما تعلق ندارد'
            }
          />,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex items-center justify-center lg:mt-32">
      <div className="mx-auto flex  w-11/12  gap-9 items-center justify-center">
        <Link
          href={routes.weddingCard.gallery.pictures}
          className="relative flex w-full items-center justify-center"
        >
          <div className="absolute lg:h-[30rem] lg:w-[30rem] max-lg:h-64 max-lg:w-64 rounded-xl bg-[#DED3DE] bg-opacity-50"></div>
          <Image
            src={pic}
            alt=""
            width={540}
            height={540}
            className="lg:h-[33rem] lg:w-[33rem] rounded-xl max-lg:h-72 max-lg:w-72"
          />
          <Image
            src={a}
            alt=""
            width={540}
            height={540}
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-xl"
          />
        </Link>

      </div>
    </div>
  );
}

export default PicVideo;
