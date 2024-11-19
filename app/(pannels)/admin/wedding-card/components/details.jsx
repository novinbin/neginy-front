"use client";

import useMount from "@/hooks/use-mount";
import { farsiNumber } from "@/lib/farsi-number";
import {
  BadgeInfo,
  Banknote,
  Earth,
  EarthLock,
  Info,
  Instagram,
  Mail,
  Phone,
  School,
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
          <h2 className="mt-2">اطلاعات کاربر</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <div className="flex items-center gap-4">
            <User stroke="#b5b7b5" />
            <p>نام و نام خانوادگی :</p>
            <p>{data?.data?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <UserCog stroke="#b5b7b5" />
            <p>نوع کاربر :</p>
            <p>
              {data?.data?.role === "talar"
                ? "تالار"
                : data?.data?.role === "ceremony"
                  ? "تشریفات"
                  : data?.data?.role === "studio"
                    ? "آتلیه"
                    : data?.data?.role === "wedding_planer"
                      ? "ودینگ پلنر"
                      : "کاربر"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Mail stroke="#b5b7b5" />
            <p>ایمیل :</p>
            <p>{data?.data?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone stroke="#b5b7b5" />
            <p>شماره تماس :</p>
            <p>{farsiNumber(data?.data?.phone)}</p>
          </div>
          <div className="flex items-center gap-4">
            <Info stroke="#b5b7b5" />
            <p>کدملی :</p>
            <p>{farsiNumber(data?.data?.national_code)}</p>
          </div>
          <div className="flex items-center gap-4">
            <Banknote stroke="#b5b7b5" />
            <p>شماره شبا :</p>
            <p>{farsiNumber(data?.data?.shaba_number)}</p>
          </div>
        </div>
      </div>

      {data?.data?.business_info && (
        <div className="mt-9 rounded-lg bg-white bg-opacity-90 p-4 py-7 shadow-lg">
          <div className="my-4 flex items-center gap-2">
            <School stroke="#d8a977" />
            <h2 className="mt-2">اطلاعات کسب و کار</h2>
          </div>
          <div className="grid items-center gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-4">
              <University stroke="#b5b7b5" />
              <p>نام کسب و کار :</p>
              <p>{data?.data?.business_info?.business_name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail stroke="#b5b7b5" />
              <p>ایمیل کسب و کار :</p>
              <p>{data?.data?.business_info?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Earth stroke="#b5b7b5" />
              <p>استان کسب و کار :</p>
              <p>{data?.data?.business_info?.city}</p>
            </div>
            <div className="flex items-center gap-4">
              <EarthLock stroke="#b5b7b5" />
              <p>شهرستان کسب و کار :</p>
              <p>{data?.data?.business_info?.state}</p>
            </div>
            <div className="flex items-center gap-4">
              <Instagram stroke="#b5b7b5" />
              <p>اینستاگرام کسب و کار :</p>
              <p>{data?.data?.business_info?.instagram}</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone stroke="#b5b7b5" />
              <p>شماره تماس اول کسب و کار :</p>
              <p>{farsiNumber(data?.data?.business_info?.phone_1)}</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone stroke="#b5b7b5" />
              <p>شماره تماس دوم کسب و کار :</p>
              <p>{farsiNumber(data?.data?.business_info?.phone_2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
