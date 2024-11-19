"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { editUserSchema } from "@/lib/validation/admin/user";
import ToastSuccess from "@/components/toast/toast-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Landmark, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const accessTypes = [
  {
    title: "مدیر",
    value: "admin",
  },
  {
    title: "تالار",
    value: "talar",
  },
  {
    title: "تشریفات",
    value: "ceremony",
  },
  {
    title: "آتلیه",
    value: "studio",
  },
  {
    title: "ودینگ پلنر",
    value: "wedding_planer",
  },
  {
    title: "کاربر",
    value: "user",
  },
];

const EditForm = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(
    data?.data?.role === "admin"
      ? "مدیر"
      : data?.data?.role === "talar"
        ? "تالار"
        : data?.data?.role === "ceremony"
          ? "تشریفات"
          : data?.data?.role === "studio"
            ? "آتلیه"
            : data?.data?.role === "wedding_planer"
              ? "ودینگ پلنر"
              : "کاربر",
  );

  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: data?.data?.name,
      phone: data?.data?.phone,
      email: data?.data?.email,

      national_code: data?.data?.national_code,
      role: role,
      business_name: data?.data?.business_info?.business_name,
      phone_1: data?.data?.business_info?.phone_1,
      phone_2: data?.data?.business_info?.phone_2,
      address: data?.data?.business_info?.address,
      city: data?.data?.business_info?.city,
      state: data?.data?.business_info?.state,
      email: data?.data?.business_info?.email,
      instagram: data?.data?.business_info?.instagram,
      introduction: data?.data?.business_info?.introduction,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const encodedFormData = querystring.stringify({
      ...values,
    });

    await axios
      .post(`/api/admin/users/${data.data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <ToastSuccess text={"اطلاعات کاربر با موفقیت ویرایش شد"} />,
          );
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

  const onSubmitBusinessInfo = async (values) => {
    const encodedFormData = querystring.stringify({
      ...values,
    });

    await axios
      .post(`/api/admin/users/${data.data.id}/business-info`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <ToastSuccess
              text={"اطلاعات کسب و کار کاربر با موفقیت ویرایش شد"}
            />,
          );
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

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border border-white px-9 backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="my-9 flex items-center justify-center gap-2">
            <User stroke="#d8a977" className="size-7" />
            <h2 className="mt-2">اطلاعات کاربری</h2>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نام و نام خانوادگی</FormLabel>
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
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="۰۹"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="national_code"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>کد ملی</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="۱۰ رقم"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>ایمیل</FormLabel>
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
            <FormField
              control={control}
              name="role"
              className="col-span-3 !w-full lg:col-span-1"
              render={({ field }) => (
                <FormItem className="col-span-3 !w-full lg:col-span-1">
                  <FormLabel>نوع کسب و کار</FormLabel>
                  <FormControl>
                    <DropdownMenu dir="rtl" className="!w-full bg-white">
                      <DropdownMenuTrigger asChild className="!w-full bg-white">
                        <Button
                          disabled={loading}
                          variant="white"
                          className="flex !w-full justify-between gap-1 border-2 border-white text-xs"
                        >
                          {loading ? (
                            <LoaderIcon
                              className="animate-spin text-primary"
                              size={15}
                              strokeWidth={1.5}
                            />
                          ) : (
                            <>
                              {role}
                              <ChevronDown
                                size={15}
                                className="text-primary"
                                strokeWidth={1.5}
                              />
                            </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="flex !w-96 flex-col gap-1">
                        {accessTypes.map((item) => (
                          <DropdownMenuItem
                            key={item.title}
                            className={cn(
                              "!w-full cursor-pointer rounded-3xl",
                              role === item.title && "bg-primary/70",
                            )}
                            onClick={() => {
                              setRole(item.title);
                              field.onChange(item.value);
                            }}
                          >
                            {item.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-center py-7">
            <SubmitButton
              className="mt-3 bg-[#BCC8BC] text-black"
              loading={isSubmitting}
            >
              ویرایش
            </SubmitButton>
          </div>
        </form>
      </Form>

      {data?.data?.business_info && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitBusinessInfo)} className="">
            <div className="my-9 flex items-center justify-center gap-2">
              <Landmark stroke="#d8a977" className="size-7" />
              <h2 className="mt-2">اطلاعات کسب و کار</h2>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={control}
                name="business_name"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>نام کسب و کار</FormLabel>
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
                name="phone_1"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>شماره تماس اول</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        autoComplete="off"
                        placeholder="۰۹"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phone_2"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>شماره تماس دوم</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        autoComplete="off"
                        placeholder="۰۹"
                        {...field}
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
                  <FormItem className="col-span-3 lg:col-span-2">
                    <FormLabel>آدرس</FormLabel>
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
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>ایمیل</FormLabel>
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
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>استان</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="حداقل ۲ کاراکتر"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>شهر</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="حداقل ۲ کاراکتر"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="instagram"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>اینستاگرام</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="اینستاگرام"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="introduction"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>توضیحات</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="توضیحات"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full items-center justify-center py-7">
              <SubmitButton
                className="mt-3 bg-[#BCC8BC] text-black"
                loading={isSubmitting}
              >
                ویرایش
              </SubmitButton>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default EditForm;
