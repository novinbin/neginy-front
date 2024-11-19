"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import cal from "@/public/img/calender/bg-cal.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import jalaali from "jalaali-js";
import { useSearchParams, useRouter } from "next/navigation";
import { useConfig } from "@/hooks/use-config";
import { axios } from "@/lib/axios";
import { farsiNumber } from "@/lib/farsi-number";

function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const configHook = useConfig();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const [gregorianDateTitle, setGregorianDateTitle] = useState("");

  const weekDays = [
    { id: 1, day: "شنبه" },
    { id: 2, day: "یک شنبه" },
    { id: 3, day: "دو شنبه" },
    { id: 4, day: "سه شنبه" },
    { id: 5, day: "چهار شنبه" },
    { id: 6, day: "پنج شنبه" },
    { id: 7, day: "جمعه" },
  ];

  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const persianDate = jalaali.toJalaali(currentDate);
  const month = persianDate.jm;
  const year = persianDate.jy;

  const convertToPersianNumber = (number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
  };

  const getDaysInMonth = (year, month) => {
    return jalaali.jalaaliMonthLength(year, month);
  };

  const getStartDayOfMonth = (year, month) => {
    const gregorianDate = jalaali.toGregorian(year, month, 1);
    const startDay = new Date(
      gregorianDate.gy,
      gregorianDate.gm - 1,
      1,
    ).getDay();
    return startDay === 6 ? 0 : startDay + 1;
  };

  const generateCalendarDays = () => {
    const totalDays = getDaysInMonth(year, month);
    const startDay = getStartDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);
    const daysArray = [];

    for (let i = startDay - 1; i >= 0; i--) {
      daysArray.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      daysArray.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - daysArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    setDaysInMonth(daysArray);
  };

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const getGregorianRange = (year, month) => {
    const startOfMonth = jalaali.toGregorian(year, month, 1);
    const endOfMonth = jalaali.toGregorian(
      year,
      month,
      getDaysInMonth(year, month),
    );

    return {
      start: `${startOfMonth.gy}-${startOfMonth.gm}-${startOfMonth.gd}`,
      end: `${endOfMonth.gy}-${endOfMonth.gm}-${endOfMonth.gd}`,
    };
  };

  const updateUrlParams = () => {
    const { start, end } = getGregorianRange(year, month);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("start", start);
    searchParams.set("end", end);

    router.replace(`?${searchParams.toString()}`);
  };

  const handleNextMonth = () => {
    const nextMonthDate = jalaali.toGregorian(year, month + 1, 1);
    setCurrentDate(
      new Date(nextMonthDate.gy, nextMonthDate.gm - 1, nextMonthDate.gd),
    );
    updateUrlParams();
  };

  const handlePrevMonth = () => {
    const prevMonthDate = jalaali.toGregorian(year, month - 1, 1);
    setCurrentDate(
      new Date(prevMonthDate.gy, prevMonthDate.gm - 1, prevMonthDate.gd),
    );
    updateUrlParams();
  };

  useEffect(() => {
    const { start, end } = getGregorianRange(year, month);
    fetchDates(start, end);
  }, [currentDate, searchParams, configHook.refreshFlag]);

  const fetchDates = async (start, end) => {
    setIsLoading(true);
    await axios
      .get(`/api/ceremony/occupied-dates?start=${start}&end=${end}`)
      .then((response) => {
        const occupiedGregorianDates = response.data;

        occupiedGregorianDates.forEach((item) => {});

        const occupiedJalaliDates = occupiedGregorianDates.map((item) => {
          const [year, month, day] = item.date.split("-").map(Number);
          const jalaliDate = jalaali.toJalaali(year, month, day);
          return `${jalaliDate.jy}-${jalaliDate.jm}-${jalaliDate.jd}`;
        });

        setData(occupiedJalaliDates);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isDateOccupied = (day) => {
    const formattedDay = `${year}-${month}-${day}`;
    return data.includes(formattedDay);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    const jalaliToGregorian = jalaali.toGregorian(year, month, day);

    const gregorianDateString = `${jalaliToGregorian.gy}-${jalaliToGregorian.gm}-${jalaliToGregorian.gd}`;
    setGregorianDateTitle(gregorianDateString);

    if (isDateOccupied(day)) {
      setDialogType("delete");
    } else {
      setDialogType("edit");
    }
    setOpen(true);
  };

  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/ceremony/dashboard`)
      .then((response) => {
        setInfo(response.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const dashboardInfo = [
    {
      id: 1,
      name: " درخواست های در انتظار رسیدگی",
      data: info.pending_reservations,
    },
    {
      id: 2,
      name: "پرداخت شده و در انتظار برگزاری",
      data: info.paid_and_waiting,
    },
    { id: 3, name: "برگزاری های امروز", data: info.today_reservations },
    { id: 4, name: "برگزاری های ماه", data: info.month_reservations },
    { id: 5, name: "کل برگزاری ها", data: info.all_res },
  ];

  return (
    <div>
      <div className="mb-9 grid grid-cols-5 items-center justify-center gap-7 max-lg:grid-cols-3 max-md:grid-cols-1">
        {dashboardInfo?.map((info) => (
          <div
            key={info.id}
            className="flex h-28 w-full flex-col items-center justify-center gap-4 rounded-lg bg-[#F2F2F2] p-4 shadow-lg backdrop-blur-md"
          >
            <p className="text-center">{info.name}</p>
            <p>{farsiNumber(info?.data)}</p>
          </div>
        ))}
      </div>
      <div className="relative">
        <Image
          src={cal}
          alt="calender"
          width={480}
          height={360}
          className="h-[40rem] w-full rounded-2xl"
        />
        <div className="absolute top-9 w-full px-4">
          <div className="flex items-center justify-between gap-4">
            <ChevronRight
              className="size-12 cursor-pointer text-white"
              onClick={handlePrevMonth}
            />
            <p className="text-xl font-bold text-white">
              {convertToPersianNumber(year)} - {persianMonths[month - 1]}
            </p>
            <ChevronLeft
              className="size-12 cursor-pointer text-white"
              onClick={handleNextMonth}
            />
          </div>
        </div>

        <div className="absolute top-32 w-full">
          <div className="grid grid-cols-7 items-center justify-center gap-4 gap-y-9">
            {weekDays?.map((weekDay) => (
              <h2
                key={weekDay.id}
                className="flex items-center justify-center text-xl font-bold"
              >
                {weekDay.day}
              </h2>
            ))}
            <div className="col-span-full mx-auto w-11/12 border border-b border-white"></div>

            {daysInMonth.map((dayObj, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(dayObj.day)}
                className="flex w-full items-center justify-center"
              >
                <p
                  className={`cursor-pointer text-2xl font-bold ${
                    dayObj.isCurrentMonth
                      ? isDateOccupied(dayObj.day)
                        ? "flex h-10 w-10 !cursor-not-allowed items-center justify-center rounded-xl bg-[#630000] text-white"
                        : "!cursor-not-allowed text-black"
                      : "!cursor-not-allowed text-gray-400"
                  }`}
                >
                  {convertToPersianNumber(dayObj.day)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
