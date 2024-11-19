"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import jalaali from "jalaali-js";
import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";
import { useConfig } from "@/hooks/use-config";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";
import Link from "next/link";
import detail from "@/public/img/WeddingHall/detail.png";
import { useUser } from "@/hooks/use-user";
import ReserveDialog from "@/components/dialogs/reserve-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDateSchema } from "@/lib/validation/user/date";
import queryString from "query-string";
import LoadingPage from "@/components/loading-page";

function Calender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCalender, setIsLoadingCalender] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const configHook = useConfig();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const [gregorianDateTitle, setGregorianDateTitle] = useState("");
  const [business, setBusiness] = useState([]);
  const params = useParams();

  const user = useUser();

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

  const form = useForm({
    resolver: zodResolver(userDateSchema),
    defaultValues: {
      user_description: "",
    },
    mode: "onSubmit",
  });

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
    setIsLoadingCalender(true);
    await axios
      .get(
        `/api/business/${params.id}/occupied-dates?start=${start}&end=${end}`,
      )
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
        setIsLoadingCalender(false);
      });
  };

  const isDateOccupied = (day) => {
    const formattedDay = `${year}-${month}-${day}`;
    return data.includes(formattedDay);
  };

  const handleDateClick = (day) => {
    if (user?.userData?.data?.role !== "user") {
      toast.error(
        <ToastError text="برای رزرو تاریخ ابتدا وارد حساب کاربری شوید." />,
      );
      return;
    }

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

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { user_description } = values;
    const service_id = params.reserve;

    const encodedFormData = queryString.stringify({
      user_description,
      service_id,
      date: gregorianDateTitle,
    });


    await axios
      .post("/api/user/reservations", encodedFormData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(<ToastSuccess text={"تاریخ شما با موفقیت ثبت شد."} />);
          reset();
          setOpen(false);
          router.push("/");
        }
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      });
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/business/${params.id}`)
      .then((response) => {
        setBusiness(response?.data);
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-[#F5F2EE]">
      <div className="mx-auto w-11/12">
        <ReserveDialog
          isOpen={open && dialogType === "edit"}
          loading={loading2}
          onClose={() => setOpen(false)}
          title={`رزرو`}
          description="آیا از رزرو این تاریخ مطمئن هستید؟"
        >
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                <FormField
                  control={control}
                  name="user_description"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>توضیحات</FormLabel>
                      <FormControl>
                        <Textarea
                          autoComplete="off"
                          placeholder="حداقل ۲ کاراکتر"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <SubmitButton className="mt-3" loading={isSubmitting}>
                ارسال
              </SubmitButton>
            </form>
          </Form>
        </ReserveDialog>

        {isLoadingCalender ? (
          <LoadingPage />
        ) : (
          <div className="py-20">
            <div className="mx-auto flex flex-col gap-4 pb-9 max-lg:w-full lg:w-4/5 xl:w-3/5">
              <h2 className="font-bold">انتخاب تاریخ</h2>
              <p className="text-stone-500">
                تاریخ مورد نظر خود را انتخاب کنید و توضیحات لازمه را اضافه
                نمایید.
              </p>
            </div>
            <div className="mx-auto border-b border-l border-r border-[#DFC7AC] bg-opacity-40 p-4 max-lg:w-full lg:w-4/5 xl:w-3/5">
              <div className="">
                <div className="mb-9 flex items-center justify-between gap-4">
                  <ChevronRight
                    className="size-12 cursor-pointer text-zinc-700"
                    onClick={handlePrevMonth}
                  />
                  <p className="text-xl font-bold text-zinc-700">
                    {convertToPersianNumber(year)} - {persianMonths[month - 1]}
                  </p>
                  <ChevronLeft
                    className="size-12 cursor-pointer text-zinc-700"
                    onClick={handleNextMonth}
                  />
                </div>
              </div>

              <div className="">
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
                              : "flex h-10 w-10 items-center justify-center rounded-xl bg-[#DFC7AC] bg-opacity-30 text-black"
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
        )}

        <div className="mx-auto w-10/12 py-52">
          <div className="grid grid-cols-2 items-center justify-between gap-9 max-lg:grid-cols-1">
            <div>
              <div className="flex w-full items-center justify-center">
                <div className="relative">
                  <Image
                    src={detail}
                    width={540}
                    height={480}
                    alt="img"
                    className=""
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image
                      src={business?.data?.profile_photo}
                      width={540}
                      height={480}
                      alt="alt"
                      className="h-[17rem] w-[17rem] rounded-full max-md:h-[12rem] max-md:w-[12rem]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-7 text-xl font-bold">
                تالار {business?.data?.business_name}
              </h2>
              <p className="text-right leading-7">
                {business?.data?.introduction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calender;
