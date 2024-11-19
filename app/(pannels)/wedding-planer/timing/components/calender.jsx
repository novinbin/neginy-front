"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import cal from "@/public/img/calender/bg-cal.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import jalaali from "jalaali-js";
import { useSearchParams, useRouter } from "next/navigation";
import { useConfig } from "@/hooks/use-config";
import { axios } from "@/lib/axios";
import DeleteDateDialog from "@/components/dialogs/delete-date-dialog";
import EditDateDialog from "@/components/dialogs/edit-date-dialog";
import { toast } from "sonner";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";

function Calender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
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
      .get(`/api/wedding-planner/occupied-dates?start=${start}&end=${end}`)
      .then((response) => {
        const occupiedGregorianDates = response.data;

      

        const occupiedJalaliDates = occupiedGregorianDates.map((item) => {
          const [year, month, day] = item.date.split("-").map(Number);
          const jalaliDate = jalaali.toJalaali(year, month, day);
          return `${jalaliDate.jy}-${jalaliDate.jm}-${jalaliDate.jd}`;
        });

        setData(occupiedJalaliDates);
      })
      .catch((err) => {
      })
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

  const onEditConfirm = async () => {
    try {
      setLoading2(true);

      const response = await axios.post(`/api/wedding-planner/occupied-dates`, {
        date: gregorianDateTitle,
      });

      if (response.status === 201) {
        toast.success(<ToastSuccess text={"تاریخ با موفقیت ویرایش شد"} />);

        const jalaliDate = jalaali.toJalaali(new Date());
        const updatedDate = new Date(response.data.date);
        setCurrentDate(updatedDate);

        configHook.setRefreshFlag(!configHook.refreshFlag);
      } else {
      }
    } catch (error) {
      toast.error(
        <ToastError
          text={
            error?.response?.data?.message ||
            defaultMessages.errors.internalError
          }
        />,
      );
    } finally {
      setLoading2(false);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading2(true);

      const response = await axios.delete(
        `/api/wedding-planner/occupied-dates?date=${gregorianDateTitle}`,
      );

      if (response.status === 204) {
        toast.success(<ToastSuccess text={"تاریخ با موفقیت حذف شد"} />);
        configHook.setRefreshFlag(!configHook.refreshFlag);
      } else {
      }
    } catch (error) {
      toast.error(
        <ToastError
          text={
            error?.response?.data?.message ||
            defaultMessages.errors.internalError
          }
        />,
      );
    } finally {
      setLoading2(false);
      setOpen(false);
    }
  };


  return (
    <div>
      <DeleteDateDialog
        isOpen={open && dialogType === "delete"}
        loading={loading2}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        title={`تاریخ: ${gregorianDateTitle}`}
        description="شما این تاریخ را پر شده اعلام کردید.  ایا میخواهید ان را دوباره فعال کنید؟"
      />
      <EditDateDialog
        isOpen={open && dialogType === "edit"}
        loading={loading2}
        onClose={() => setOpen(false)}
        onConfirm={onEditConfirm}
        title={`تاریخ: ${gregorianDateTitle}`}
        description="از ویرایش آیتم مورد نظر مطمئن هستید؟"
      />
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
                        ? "flex h-10 w-10 items-center justify-center rounded-xl bg-[#630000] text-white"
                        : "text-black"
                      : "text-gray-400"
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

export default Calender;
