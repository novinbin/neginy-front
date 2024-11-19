"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
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
import {  User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { editServicesSchema } from "@/lib/validation/admin/services";

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
    data?.business_type === "admin"
      ? "مدیر"
      : data?.business_type === "talar"
        ? "تالار"
        : data?.business_type === "ceremony"
          ? "تشریفات"
          : data?.business_type === "studio"
            ? "آتلیه"
            : data?.business_type === "wedding_planer"
              ? "ودینگ پلنر"
              : "کاربر",
  );

  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(editServicesSchema),
    defaultValues: {
      name: data?.name,
      business_type: data?.business_type,
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
      .post(`/api/admin/services/${data.id}`, encodedFormData)
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

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نام سرویس</FormLabel>
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
              name="business_type"
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
                            onClick={() => {
                              setRole(item.title);
                              field.onChange(item.value);
                            }}
                            className={cn(
                              "!w-full cursor-pointer rounded-3xl",
                              role === item.title && "bg-stone-500 text-white",
                            )}
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
              className="mt-3 bg-[#BCC8BC] text-black hover:bg-black hover:text-[#bcc8bc]"
              loading={isSubmitting}
            >
              ویرایش
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
