"use client";
import Image from "next/image";
import a from "@/public/img/dashboard/studio.jpg";
import camera from "@/public/img/svg-guest/camera.svg";
import gift from "@/public/img/svg-guest/gift.svg";
import listGifts from "@/public/img/svg-guest/list-gifts.svg";
import weddingCard from "@/public/img/svg-guest/wedding-card.svg";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { routes } from "@/routes/routes";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import ToastError from "@/components/toast/toast-error";
import { jaliliDate } from "@/lib/jalali-date";
import { farsiNumber } from "@/lib/farsi-number";

const DashboardPage = ({ }) => {
  const searchParams = useSearchParams()
  const search = searchParams.get('code')
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const [data1, setData1] = useState(false);


  useEffect(() => {
    fetchDefaultData();
    fetchWeddingCard();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("code", search);

    await axios
      .post(`api/login-guest`, formData)
      .then((response) => {
        setData(response?.data);
        console.log(response?.data)
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
  const fetchWeddingCard = async () => {

    await axios
      .get(`api/get/weddingCard/${search}`)
      .then((response) => {
        setData1(response?.data);
        console.log(response?.data)
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


  const guestImg = [
    { id: 1, img: weddingCard, link: data1.card_photo ?? "" },
    { id: 2, img: listGifts, link: routes.weddingCard.gifts },
    { id: 3, img: gift, link: routes.weddingCard.bank },
    { id: 4, img: camera, link: routes.weddingCard.gallery.root },
  ];


  return (
    <div className="">
      <div>
        <div>
          <div className="flex items-center justify-center">
            <Image
              src={data?.data?.photo ?? camera}
              alt="wedding img"
              width={480}
              height={360}
              className="mt-9 h-52 w-52 rounded-full"
            />
          </div>
          <div className="mx-auto mt-9 grid w-11/12 items-center justify-between gap-9 md:grid-cols-1 lg:grid-cols-2">
            <div className="grid grid-cols-2 items-center !justify-center gap-y-14">
              {guestImg.map((guest) => (
                <div key={guest.id}>
                  <Link
                    href={guest.link}
                    className="flex w-full items-center justify-center"
                  >
                    <Image
                      src={guest.img}
                      alt="icon"
                      width={540}
                      height={480}
                      className="h-52 w-52"
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-9 max-lg:mt-20">
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-2xl font-bold">وصال</p>
                <p className="text-xl">{data?.data?.bride_groom}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-2xl font-bold">تاریخ </p>
                <p className="text-xl">{farsiNumber(jaliliDate(data?.data?.date))}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-2xl font-bold">تالار</p>
                <div className="flex items-center justify-center gap-2">
                  <MapPin

                    stroke="#C68E52"
                    className="size-7"
                  />
                  <p className="text-xl">
                    {data?.data?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
