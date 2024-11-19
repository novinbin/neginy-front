"use client";

import useMount from "@/hooks/use-mount";
import { farsiNumber } from "@/lib/farsi-number";
import { BookOpenText, Earth, Mail, Map, Phone, School } from "lucide-react";
import Image from "next/image";
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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const Details = ({ data }) => {
  const mount = useMount();
  const [showTextarea, setShowTextarea] = useState(false);
  const router = useRouter();

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
    formState: { isSubmitting, errors },
  } = form;

  useEffect(() => {
    if (data) {
      reset({
        business_description: "",
        date: new Date(data?.data?.reserve_date),
        status: data?.data?.status,
        price: data?.data?.price,
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (errors.business_description) {
      setShowTextarea(true);
    }
  }, [errors.business_description]);

  const onSubmit = async (values) => {
    const { status, price, date, business_description } = values;

    const formattedDate = date.toISOString().split("T")[0];
    const encodedFormData = queryString.stringify({
      business_description,
      date: formattedDate,
      status,
      price,
    });

    await axios
      .post(`/api/talar/reservations/${data.data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(<ToastSuccess text={"با موفقیت ثبت شد"} />);
          reset();
          router.refresh();
        }
      })
      .catch((error) => {
        toast.error(
          <ToastError text={error?.response?.data?.message || "خطای داخلی"} />,
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
                      render={({ field }) => (
                        <FormItem className="w-11/12">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <p className="text-center text-base text-stone-500">
                                وضعیت
                              </p>
                              <SelectTrigger className="mx-auto w-11/12">
                                <SelectValue
                                  placeholder="وضعیت"
                                  value={field.value || data?.data?.status}
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
                                <SelectItem value="رد شده">رد شده</SelectItem>
                                <SelectItem value="در انتظار تایید">
                                  در انتظار تایید
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-primary" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div
                    className={`flex h-28 w-full items-center justify-center rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
                  >
                    <div className="flex w-11/12 flex-col gap-2 py-2 text-center">
                      <p className="text-base text-stone-500">
                        حدود قیمت : (تومان)
                      </p>
                      <div className="text-lg font-bold">
                        <FormField
                          control={control}
                          name="price"
                          render={({ field }) => (
                            <FormItem className="mx-auto w-11/12">
                              <FormControl>
                                <Input
                                  type="number"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex h-28 w-full items-center justify-center rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
                  >
                    <div className="flex w-11/12 flex-col gap-2 py-2 text-center">
                      <p className="text-base text-stone-500">تاریخ رزرو :</p>
                      <div>
                        <FormField
                          control={control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="w-11/12">
                              <FormControl>
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
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#eee] bg-opacity-50 p-9 shadow-sm">
                  <h2 className="pb-4 font-bold">
                    توضیحات درخواست {data?.data?.user?.name} :
                  </h2>
                  <div>
                    {data?.data?.user_description?.length > 0 ? (
                      data.data.user_description.map((desc, index) => (
                        <p key={index}>
                          {Object.entries(desc)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ")}
                        </p>
                      ))
                    ) : (
                      <p>توضیحاتی ثبت نشده است.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl bg-[#eee] bg-opacity-50 p-9 shadow-sm">
                  <div className="flex items-center justify-between gap-9">
                    <h2 className="pb-4 font-bold">توضیحات سرویس دهنده :</h2>
                    <div
                      onClick={handleAddDescription}
                      className="cursor-pointer rounded-lg bg-[#d4b694] px-4 py-2 text-white"
                    >
                      افزودن توضیحات
                    </div>
                  </div>
                  <div>
                    {data?.data?.business_description?.length > 0 ? (
                      data.data.business_description.map((desc, index) => (
                        <p key={index}>
                          {Object.entries(desc)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ")}
                        </p>
                      ))
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
                          <FormItem>
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
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Details;
