"use client";

import useMount from "@/hooks/use-mount";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";
import {
  BadgeInfo,
  Banknote,
  Calendar,
  DatabaseIcon,
  Earth,
  EarthLock,
  GalleryHorizontalIcon,
  Gift,
  Home,
  HomeIcon,
  Info,
  Instagram,
  Landmark,
  Locate,
  Mail,
  MailIcon,
  MapPin,
  NotebookPen,
  Phone,
  School,
  Server,
  Star,
  University,
  User,
  UserCog,
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
          <User stroke="#d8a977" />
          <h2 className="mt-2 text-lg font-bold">اطلاعات کاربر</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <div className="flex items-center gap-4">
            <User stroke="#b5b7b5" />
            <p>نام عروس و داماد :</p>
            <p>{data?.data?.bride_groom}</p>
          </div>
          <div className="flex items-center gap-4">
            <MailIcon stroke="#b5b7b5" />
            <p>پیامک سالگرد</p>
            <p>
              {data?.data?.has_anniversary_sms ? "فعال" : "غیر فعال"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <MailIcon stroke="#b5b7b5" />
            <p> تعداد پیامک سالگرد </p>
            <p>
              {data?.data?.anniversary_sms}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <GalleryHorizontalIcon stroke="#b5b7b5" />
            <p> سرویس گالری</p>
            <p>
              {data?.data?.has_gallery ? "فعال" : "غیر فعال"}
            </p>
          </div>
          {/* <div className="flex items-center gap-4">
            <MailIcon stroke="#b5b7b5" />
            <p>سرویس پیامک دعوت </p>
            <p>
              {data?.data?.has_guest_invite_sms ? "فعال" : "غیر فعال"}
            </p>
          </div> */}
          <div className="flex items-center gap-4">
            <Gift stroke="#b5b7b5" />
            <p> سرویس هدیه انلاین</p>
            <p>
              {data?.data?.has_online_gift ? "فعال" : "غیر فعال"}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Gift stroke="#b5b7b5" />
            <p> تعداد هدیه های پرداخت شده</p>
            <p>
              {data?.data?.online_gift }
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Calendar stroke="#b5b7b5" />
            <p>تاریخ</p>
            <p>{jaliliDate(data?.data?.date)}</p>
          </div>
          <div className="flex items-center gap-4">
            <Locate stroke="#b5b7b5" />
            <p>ادرس</p>
            <p>{farsiNumber(data?.data?.address)}</p>
          </div>
          <div className="flex items-center gap-4">
            <Info stroke="#b5b7b5" />
            <p>کد عروسی</p>
            <p>{farsiNumber(data?.data?.code)}</p>
          </div>
         
        </div>
      </div>

      {data?.data?.business_info && (
        <div className="mt-9 rounded-lg bg-white bg-opacity-90 p-4 py-7 shadow-lg">
          <div className="my-4 flex items-center gap-2">
            <School stroke="#d8a977" />
            <h2 className="mt-2 text-lg font-bold">اطلاعات کسب و کار</h2>
          </div>
          <div className="grid items-center gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center gap-2">
              <BadgeInfo stroke="#b5b7b5" />
              <p>وضعیت :</p>
              <p
                className={`${data?.data?.business_info?.approved ? "text-green-500" : "text-red-500"}`}
              >
                {data?.data?.business_info?.approved
                  ? `تایید شده`
                  : "تایید نشده"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <University stroke="#b5b7b5" />
              <p>نام کسب و کار :</p>
              <p>{data?.data?.business_info?.business_name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Landmark stroke="#b5b7b5" />
              <p>نوع :</p>
              <p>
                {data?.data?.role === "studio"
                  ? "آتلیه"
                  : data?.data?.role === "talar"
                    ? "تالار"
                    : data?.data?.role === "ceremony"
                      ? "تشریفات"
                      : data?.data?.role === "wedding_planer"
                        ? "ودینگ پلنر"
                        : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Star stroke="#b5b7b5" />
              <p> امتیاز :</p>
              <p>
                {farsiNumber(data?.data?.business_info?.rating?.total_points)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Mail stroke="#b5b7b5" />
              <p>ایمیل :</p>
              <p>{data?.data?.business_info?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Earth stroke="#b5b7b5" />
              <p>استان :</p>
              <p>{data?.data?.business_info?.city}</p>
            </div>
            <div className="flex items-center gap-2">
              <EarthLock stroke="#b5b7b5" />
              <p>شهرستان :</p>
              <p>{data?.data?.business_info?.state}</p>
            </div>
            <div className="flex items-center gap-2">
              <Instagram stroke="#b5b7b5" />
              <p>اینستاگرام :</p>
              <p>{data?.data?.business_info?.instagram}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone stroke="#b5b7b5" />
              <p>شماره تماس اول :</p>
              <p>{farsiNumber(data?.data?.business_info?.phone_1)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone stroke="#b5b7b5" />
              <p>شماره تماس دوم :</p>
              <p>{farsiNumber(data?.data?.business_info?.phone_2)}</p>
            </div>
            <div className="col-span-full">
              <div className="flex items-center gap-2">
                <MapPin stroke="#b5b7b5" />
                <p>آدرس :</p>
                <p>{data?.data?.business_info?.address}</p>
              </div>
            </div>
            <div className="col-span-full">
              <div className="flex items-center gap-2">
                <NotebookPen stroke="#b5b7b5" />
                <p>توضیحات :</p>
                <p>{data?.data?.business_info?.introduction}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
