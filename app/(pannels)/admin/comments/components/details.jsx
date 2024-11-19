"use client";

import useMount from "@/hooks/use-mount";
import { farsiNumber } from "@/lib/farsi-number";
import {
  BadgeInfo,
  BookOpenText,
  Info,
  Mail,
  MessageCircle,
  Phone,
  Star,
  User,
  Landmark,
  PhoneCall,
  Earth,
  EarthLock,
} from "lucide-react";

const Details = ({ data }) => {
  const mount = useMount();

  if (!mount) {
    return null;
  }

  return (
    <div className="">
      <div className="rounded-lg bg-white bg-opacity-90 p-4 py-7 shadow-lg">
        <div className="my-4 flex items-center gap-2">
          <Info stroke="#d8a977" />
          <h2 className="mt-2 text-lg font-bold">اطلاعات کاربر </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <div className="flex items-center gap-4">
            <User stroke="#b5b7b5" />
            <p>نام و نام خانوادگی کاربر :</p>
            <p>{data?.data?.user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail stroke="#b5b7b5" />
            <p>ایمیل :</p>
            <p>{data?.data?.user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone stroke="#b5b7b5" />
            <p>شماره تماس :</p>
            <p>{farsiNumber(data?.data?.user?.phone)}</p>
          </div>
        </div>
      </div>

      {data?.data && (
        <div className="mt-9 rounded-lg bg-white bg-opacity-90 p-4 py-7 shadow-lg">
          <div className="my-4 flex items-center gap-2">
            <MessageCircle stroke="#d8a977" />
            <h2 className="mt-2 text-lg font-bold">اطلاعات نظر</h2>
          </div>
          <div className="grid items-center gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center gap-4">
              <BadgeInfo stroke="#b5b7b5" />
              <p>وضعیت :</p>
              <p
                className={`${data?.data?.approved ? "text-green-500" : "text-red-500"}`}
              >
                {data?.data?.approved ? `تایید شده` : "تایید نشده"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Star stroke="#b5b7b5" />
              <p>امتیاز :</p>
              <p>{data?.data?.rating}</p>
            </div>
            <div className="col-span-full">
              <div className="flex items-center gap-4">
                <BookOpenText stroke="#b5b7b5" />
                <p>توضیحات :</p>
                <p>{data?.data?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {data?.data?.business_info && (
        <div className="mt-9 rounded-lg bg-white bg-opacity-90 p-4 py-7 shadow-lg">
          <div className="my-4 flex items-center gap-2">
            <Landmark stroke="#d8a977" />
            <h2 className="mt-2 text-lg font-bold">اطلاعات کسب و کار</h2>
          </div>
          <div className="grid items-center gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center gap-4">
              <BadgeInfo stroke="#b5b7b5" />
              <p>نام :</p>
              <p className={`${data?.data?.business_info?.business_name}`}>
                {data?.data?.business_info?.business_name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <PhoneCall stroke="#b5b7b5" />
              <p>شماره تماس :</p>
              <p>{data?.data?.business_info?.phone_1}</p>
            </div>
            <div className="flex items-center gap-4">
              <EarthLock stroke="#b5b7b5" />
              <p>شهر :</p>
              <p>{data?.data?.business_info?.city}</p>
            </div>
            <div className="flex items-center gap-4">
              <Earth stroke="#b5b7b5" />
              <p>استان :</p>
              <p>{data?.data?.business_info?.state}</p>
            </div>
            <div className="col-span-full">
              <div className="flex items-center gap-4">
                <BookOpenText stroke="#b5b7b5" />
                <p>توضیحات :</p>
                <p>{data?.data?.business_info?.introduction}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Star stroke="#b5b7b5" />
              <p>تعداد کامنت های ثبت شده تاکنون :</p>
              <p>{data?.data?.business_info?.rating?.comments_count}</p>
            </div>
            <div className="flex items-center gap-4">
              <Star stroke="#b5b7b5" />
              <p>میانگین امتیاز</p>
              <p>{data?.data?.business_info?.rating?.total_points}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
