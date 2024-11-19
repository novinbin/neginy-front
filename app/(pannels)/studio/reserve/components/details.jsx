"use client";

import useMount from "@/hooks/use-mount";
import { farsiNumber } from "@/lib/farsi-number";
import { BookOpenText, Earth, Mail, Map, Phone, School } from "lucide-react";
import Image from "next/image";
import { jaliliDate } from "@/lib/jalali-date";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import { panelReservationSchema } from "@/lib/validation/panel/reservation";
import queryString from "query-string";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const Details = ({ data }) => {
  const mount = useMount();

  const [showTextarea, setShowTextarea] = useState(false);

  const form = useForm({
    resolver: zodResolver(panelReservationSchema),
    defaultValues: {
      business_description: "",
      date: "",
      status: "",
      price: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { status, price, date, business_description } = values;

    const formattedDate = date.toISOString().split('T')[0];
    const encodedFormData = queryString.stringify({
      business_description,
      date: formattedDate,
      status,
      price,
    });

    await axios
      .post(`/api/studio/reservations/${data.data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(<ToastSuccess text={" با موفقیت ثبت شد"} />);
          reset();
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

  const handleAddDescription = () => {
    setShowTextarea(!showTextarea);
  };

  if (!mount) {
    return null;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid justify-between gap-4 sm:grid-cols-1 lg:grid-cols-3">
            <div className="col-span-2">
              <div className="flex flex-col gap-7">
                <div className="grid grid-cols-3 items-center justify-center gap-7 max-lg:grid-cols-1">
                  <div
                    className={`flex h-28 w-full flex-col items-center justify-center rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
                  >
                    <FormField
                      control={control}
                      name="status"
                      className="col-span-full"
                      render={({ field }) => (
                        <FormItem className="col-span-full">
                          <FormControl className="col-span-full">
                            <Controller
                              control={control}
                              name="status"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue
                                      placeholder="وضعیت"
                                      value={data?.data?.status}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="تایید و پرداخت شده">
                                      تایید و پرداخت شده
                                    </SelectItem>
                                    <SelectItem value="در انتظار پرداخت">
                                      در انتظار پرداخت
                                    </SelectItem>
                                    <SelectItem value="کنسل شده">
                                      کنسل شده
                                    </SelectItem>
                                    <SelectItem value="رد شده">
                                      رد شده
                                    </SelectItem>
                                    <SelectItem value="در انتظار تایید">
                                      در انتظار تایید
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FormControl>
                          <FormMessage className="text-primary" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div
                    className={`flex h-28 w-full items-center justify-center rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
                  >
                    <p className="flex flex-col gap-2 py-2 text-center">
                      <p className="text-base text-stone-500">
                        حدود قیمت : (تومان )
                      </p>
                      <p className="text-lg font-bold">
                        <FormField
                          control={control}
                          name="price"
                          render={({ field }) => (
                            <FormItem className="mx-auto w-1/2">
                              <FormControl>
                                <Input
                                  type="number"
                                  autoComplete="off"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </p>
                    </p>
                  </div>

                  <div
                    className={`flex h-28 w-full items-center justify-center rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
                  >
                    <p className="flex flex-col gap-2 py-2 text-center">
                      <p className="text-base text-stone-500"> تاریخ رزرو : </p>
                      <div>
                        <FormField
                          control={control}
                          name="date"
                          className=""
                          render={({ field }) => (
                            <FormItem className="!z-50 mx-auto w-1/2">
                              <FormControl className="!z-50">
                                <DatePicker
                                  value={getValues("date")}
                                  onChange={(date) => {
                                    date?.isValid
                                      ? setValue("date", new Date(date))
                                      : "";
                                  }}
                                  format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                                  calendar={persian}
                                  locale={persian_fa}
                                  calendarPosition="bottom-right"
                                  style={{
                                    width: "100%",
                                    paddingTop: "19px",
                                    paddingBottom: "19px",
                                    borderColor: "rgb(226 232 240)",
                                    zIndex: "2",
                                  }}
                                  className="!z-50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-[#eee] bg-opacity-50 p-9 shadow-sm">
                  <div className="">
                    <h2 className="pb-4 font-bold">
                      توضیحات درخواست {data?.data?.user?.name} :
                    </h2>

                    <div>
                      {data?.data?.user_description ? (
                        typeof data?.data?.user_description === "string" ? (
                          <p>{data?.data?.user_description}</p>
                        ) : (
                          Object.entries(data?.data?.user_description).map(
                            ([key, value]) => (
                              <p key={key}>{`${key}: ${value}`}</p>
                            ),
                          )
                        )
                      ) : (
                        <p>توضیحاتی ثبت نشده است.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-[#eee] bg-opacity-50 p-9 shadow-sm">
                  <div className="">
                    <div className="flex items-center justify-between gap-9">
                      <h2 className="pb-4 font-bold">توضیحات سرویس دهنده : </h2>
                      <div
                        onClick={handleAddDescription}
                        className="cursor-pointer rounded-lg bg-[#d4b694] px-4 py-2 text-white"
                      >
                        افزودن توضیحات
                      </div>
                    </div>

                    <div>
                      {data?.data?.business_description ? (
                        typeof data?.data?.business_description === "string" ? (
                          <p>{data?.data?.business_description}</p>
                        ) : (
                          Object.entries(data?.data?.business_description).map(
                            ([key, value]) => (
                              <p key={key}>{`${key}: ${value}`}</p>
                            ),
                          )
                        )
                      ) : (
                        <p>توضیحاتی ثبت نشده است.</p>
                      )}
                    </div>
                    {showTextarea && (
                      <div className="mt-4">
                        <FormField
                          control={control}
                          name="business_description"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormControl>
                                <Textarea
                                  autoComplete="off"
                                  placeholder="توضیحات خود را اینجا بنویسید"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <SubmitButton loading={isSubmitting} className="my-9">
                  ارسال
                </SubmitButton>
              </div>
            </div>

            <div className="col-span-1 max-lg:col-span-2">
              <div className="flex flex-col items-center gap-7">
                <div className="grid w-full items-center justify-between gap-4 rounded-2xl border border-zinc-300 bg-[#eee] bg-opacity-50 p-4 max-lg:grid-cols-1 lg:grid-cols-2">
                  <div className="col-span-full mt-4 flex flex-col gap-4">
                    <h1 className="text-xl font-medium">اطلاعات کاربر :</h1>
                    <div className="flex items-center gap-4">
                      <School stroke="#d4b694" />
                      <p className="text-lg font-normal">
                        {data?.data?.user?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone stroke="#d4b694" />
                      <p>{farsiNumber(data?.data?.user?.phone)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Earth stroke="#d4b694" />
                      <p>{data?.data?.user?.city}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Map stroke="#d4b694" />
                      <p>{data?.data?.user?.state}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail stroke="#d4b694" />
                      <p>{data?.data?.user?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="grid w-full grid-cols-2 items-center justify-between gap-4 rounded-2xl border border-zinc-300 bg-[#eee] bg-opacity-50 p-4">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-medium">سرویس :</h1>
                    <div className="flex items-center gap-4">
                      <School stroke="#d4b694" />
                      <p className="text-lg font-normal">
                        {data?.data?.bus_service?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <Image
                      src={data?.data?.bus_service?.photo}
                      alt={data?.data?.bus_service?.name}
                      width={480}
                      height={360}
                      className="h-28 w-28 rounded-full shadow-xl"
                    />
                  </div>

                  <div className="col-span-full mt-4 flex flex-col gap-4">
                    <div className="flex gap-4">
                      <BookOpenText stroke="#d4b694" />
                      <p>{data?.data?.bus_service?.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-wrap items-center justify-between rounded-2xl border border-zinc-300 bg-[#eee] bg-opacity-50 p-4 backdrop-blur-md">
                  <p className="flex flex-col gap-2 py-2 text-center">
                    <p className="text-stone-500">تاریخ ثبت درخواست : </p>
                    <p>
                      {farsiNumber(
                        jaliliDate(data?.data?.created_at.slice(0, 10)),
                      )}
                    </p>
                  </p>
                  <p className="flex flex-col gap-2 py-2 text-center">
                    <p className="text-stone-500">آخرین بروزرسانی : </p>
                    <p>
                      {farsiNumber(
                        jaliliDate(data?.data?.updated_at.slice(0, 10)),
                      )}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Details;
