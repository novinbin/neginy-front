"use client";

import useMount from "@/hooks/use-mount";
import { farsiNumber } from "@/lib/farsi-number";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { routes } from "@/routes/routes";
import {
  BookOpenText,
  Building,
  MapPinIcon,
  Phone,
  School,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { jaliliDate } from "@/lib/jalali-date";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userReservationSchema } from "@/lib/validation/user/date";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import HallDetailsModal from "@/components/dialogs/hall-details";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/submit-button";
import queryString from "query-string";

const Details = ({ data }) => {
  const [loading2, setLoading2] = useState(false);
  const [open2, setOpen2] = useState(false);

  const form = useForm({
    resolver: zodResolver(userReservationSchema),
    defaultValues: {
      user_description: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { user_description } = values;

    const encodedFormData = queryString.stringify({
      user_description,
    });

    await axios
      .post(
        `/api/user/reservations/${data.data.id}/add-description`,
        encodedFormData,
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <ToastSuccess text={"توضیحات شما با موفقیت ثبت شد."} />,
          );
          reset();
          setOpen2(false);
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

  const mount = useMount();

  if (!mount) {
    return null;
  }

  return (
    <div>
      <HallDetailsModal
        isOpen={open2}
        loading={loading2}
        onClose={() => setOpen2(false)}
        title="توضیحات"
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={control}
                name="user_description"
                render={({ field }) => (
                  <FormItem className="col-span-3 mt-4">
                    <FormLabel>توضیحات جدید</FormLabel>
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
      </HallDetailsModal>
      <div className="grid justify-between gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="flex flex-col gap-7">
            <div className="grid grid-cols-3 items-center justify-center gap-7 max-lg:grid-cols-1">
              <div
                className={`flex h-20 w-full flex-col items-center justify-center rounded-lg ${data?.data?.status === "در انتظار تایید" ? "text-yellow-500" : data?.data?.status === "رد شده" ? "text-red-500" : data?.data?.status === "کنسل شده" ? "text-red-500" : data?.data?.status === "در انتظار پرداخت" ? "text-yellow-500" : data?.data?.status === "تایید و پرداخت شده" ? "text-green-500" : " "} bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
              >
                <p className="text-base text-stone-500">وضعیت : </p>
                <p className="py-2 text-center text-lg font-bold">
                  {data?.data?.status}
                </p>
              </div>
              <div
                className={`h-20 w-full rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
              >
                <p className="flex flex-col gap-2 py-2 text-center">
                  <p className="text-base text-stone-500">حدود قیمت : </p>
                  <p className="text-lg font-bold">
                    {data?.data?.price === null
                      ? "در انتظار سرویس دهنده"
                      : persianPriceFormat(+data?.data?.price)}
                  </p>
                </p>
              </div>

              <div
                className={`h-20 w-full rounded-lg bg-[#eee] bg-opacity-50 shadow-md backdrop-blur-md`}
              >
                <p className="flex flex-col gap-2 py-2 text-center">
                  <p className="text-base text-stone-500"> تاریخ رزرو : </p>
                  <p className="text-lg font-bold">
                    {farsiNumber(
                      jaliliDate(data?.data?.reserve_date.slice(0, 10)),
                    )}
                  </p>
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-[#eee] bg-opacity-50 p-9 shadow-sm backdrop-blur-md">
              <div>
                <div className="mb-7 flex items-center justify-between">
                  <h2 className="font-bold">توضیحات درخواست شما :</h2>
                  <div
                    className="cursor-pointer rounded-md bg-[#d4b694] px-3 py-1 text-white transition-all duration-200"
                    onClick={() => {
                      setOpen2(true);
                    }}
                  >
                    افزودن توضیحات جدید
                  </div>
                </div>

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
            <div className="rounded-xl bg-[#eee] bg-opacity-50 p-9 shadow-sm backdrop-blur-md">
              <div className="">
                <h2 className="pb-4 font-bold">توضیحات سرویس دهنده : </h2>
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
            </div>
          </div>
        </div>

        <div className="col-span-1 max-lg:col-span-2">
          <div className="flex flex-col items-center gap-7">
            <div className="grid w-full items-center justify-between gap-4 rounded-2xl border border-zinc-300 bg-[#eee] bg-opacity-50 p-4 backdrop-blur-xl max-lg:grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-medium">سرویس دهنده :</h1>
                <div className="flex items-center gap-4">
                  <School stroke="#d4b694" />
                  <p className="text-lg font-normal">
                    {data?.data?.business?.business_name}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Building stroke="#d4b694" />
                  <p className="text-lg font-normal">
                    {data?.data?.business?.business_type === "talar"
                      ? "تالار"
                      : data?.data?.business?.business_type === "stodio"
                        ? "آتلیه"
                        : data?.data?.business?.business_type === "ceremony"
                          ? "تشریفات"
                          : ""}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <Image
                  src={data?.data?.business?.profile_photo}
                  alt={data?.data?.business?.business_name}
                  width={480}
                  height={360}
                  className="h-28 w-28 rounded-full shadow-xl"
                />
              </div>

              <div className="col-span-full mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Phone stroke="#d4b694" />
                  <p>{farsiNumber(data?.data?.business?.phone_1)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone stroke="#d4b694" />
                  <p>{farsiNumber(data?.data?.business?.phone_2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <MapPinIcon stroke="#d4b694" />
                  <p>{data?.data?.business?.address}</p>
                </div>
                <div className="my-2 flex w-full justify-end">
                  <Link
                    href={
                      data?.data?.business?.business_type === "talar"
                        ? routes.weddingHall.all(data?.data?.business?.id)
                        : data?.data?.business?.business_type === "stodio"
                          ? routes.studios.all(data?.data?.business?.id)
                          : data?.data?.business?.business_type === "ceremony"
                            ? routes.ceremonies.all(data?.data?.business?.id)
                            : ""
                    }
                    className="rounded-lg bg-[#d4b694] px-4 py-2"
                  >
                    مشاهده پروفایل
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 items-center justify-between gap-4 rounded-2xl border border-zinc-300 bg-[#eee] bg-opacity-50 p-4 backdrop-blur-xl">
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
                  {farsiNumber(jaliliDate(data?.data?.created_at.slice(0, 10)))}
                </p>
              </p>
              <p className="flex flex-col gap-2 py-2 text-center">
                <p className="text-stone-500">آخرین بروزرسانی : </p>
                <p>
                  {farsiNumber(jaliliDate(data?.data?.updated_at.slice(0, 10)))}
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
