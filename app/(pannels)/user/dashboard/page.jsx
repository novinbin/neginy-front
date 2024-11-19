"use client";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import Dropzone from "react-dropzone";
import Image from "next/image";
import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ToastSuccess from "@/components/toast/toast-success";
import { aboutSchema } from "@/lib/validation/admin/config";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useMount from "@/hooks/use-mount";
import ToastError from "@/components/toast/toast-error";
import queryString from "query-string";
import { Package, Upload } from "lucide-react";
import { userSchema } from "@/lib/validation/admin/user";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Checkbox } from "@/components/ui/checkbox";
import { userGuestSchema } from "@/lib/validation/user/invite";
import { defaultMessages } from "@/lib/default-messages";
import DateObject from "react-date-object";

const DashboardPage = () => {
  const mount = useMount();

  const convertToPersianDate = (dateString) => {
    const date = new Date(dateString);
    return new DateObject(date, { calendar: persian }).toString('YYYY/MM/DD');
  };

  // Function to convert a Persian date back to a Gregorian date
  const convertToGregorianDate = (persianDate) => {
    const dateObject = new DateObject(persianDate, { calendar: persian });
    return dateObject.toDate().toISOString(); // Converts to ISO string
  };

  const form = useForm({
    resolver: zodResolver(userGuestSchema),
    defaultValues: {
      bride_groom: "",
      date: "",
      address: "",
      photo: null,
      weddingCard: null,
      has_gallery: false,
      gifts_visible: false,
      has_online_gift: false,
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
    const {
      bride_groom,
      date,
      address,
      gifts_visible,
      photo,
      weddingCard,
      has_gallery,
      has_online_gift,
    } = values;

    const formData = new FormData();
    formData.append("bride_groom", bride_groom);
    formData.append("date", convertToPersianDate(date));
    formData.append("address", address);
    formData.append("gifts_visible", gifts_visible);
    formData.append("has_gallery", has_gallery);
    formData.append("has_online_gift", has_online_gift);
    if (photo) {
      formData.append("photo", photo);
    }

    if (weddingCard) {
      formData.append("weddingCard", weddingCard);
    }

    try {
      const response = await axios.post("/api/user/weddings/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success(<ToastSuccess text={"با موفقیت ثبت شد."} />);
        reset();
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
    }
  };

  const onDrop = useCallback(
    (files) => {
      setValue("photo", files[0], { shouldValidate: true });
    },
    [setValue],
  );

  const onDropWeddingCard = useCallback(
    (files) => {
      setValue("weddingCard", files[0], { shouldValidate: true });
    },
    [setValue],
  );

  if (!mount) {
    return null;
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid gap-2 max-lg:grid-cols-1 lg:grid-cols-2">
            <FormField
              control={control}
              name="bride_groom"
              render={({ field }) => (
                <FormItem className="max-lg:col-span-full max-lg:w-full lg:w-[300px]">
                  <FormLabel>نام و نام خانوادگی عروس و داماد</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="date"
              className=""
              render={({ field }) => (
                <FormItem className="!z-50 w-full max-lg:col-span-full lg:w-[300px]">
                  <FormLabel className="mt-2 block w-full">
                    تاریخ ازدواج
                  </FormLabel>
                  <FormControl className="!z-50 w-full">
                    <DatePicker
                      className="col-span-full w-full"
                      value={getValues("date")}
                      onChange={(date) => {
                        date?.isValid ? setValue("date", new Date(date)) : "";
                      }}
                      format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      style={{
                        width: "300px",
                        paddingTop: "19px",
                        paddingBottom: "19px",
                        borderColor: "rgb(226 232 240)",
                        zIndex: "2",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>آدرس</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="info@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-full">
              <div className="grid grid-cols-3 items-center justify-center gap-4">
                <FormField
                  control={form.control}
                  name="gifts_visible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3 space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>نمایش هدایا</FormLabel>
                        <FormDescription>
                          نمایش هدایای عروسی به مهمانان
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="has_gallery"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3 space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>گالری عروسی</FormLabel>
                        <FormDescription>
                          نمایش گالری عروسی به مهمانان
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="has_online_gift"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3 space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>پرداخت هدیه</FormLabel>
                        <FormDescription>
                          امکان پرداخت هدیه مهمانان به عروس و داماد به صورت
                          آنلاین
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={control}
              name="photo"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 1}
                      maxFiles={1}
                      onDrop={onDrop}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center text-muted-foreground">
                              <span>آپلود تصویر عروس و داماد</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("photo") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(getValues("photo"))}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="weddingCard"
              className="col-span-full"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 1}
                      maxFiles={1}
                      onDrop={onDropWeddingCard}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center text-muted-foreground">
                              <span>آپلود تصویر کارت عروسی</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("weddingCard") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("weddingCard"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                          </div>
                        </section>
                      )}
                    </Dropzone>
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
    </div>
  );
};

export default DashboardPage;
