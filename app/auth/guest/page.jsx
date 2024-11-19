"use client";

import { axios } from "@/lib/axios";
import bg from "@/public/img/weddingCard/bg.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { userSchema } from "@/lib/validation/admin/user";
import useMount from "@/hooks/use-mount";
import Link from "next/link";
import { routes } from "@/routes/routes";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import { toast } from "sonner";

function GuestPage() {
  const mount = useMount();
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
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
    const {
      name,
      phone,
      email,
      state,
      city,
      national_code,
      shaba_number,
      password,
      password_confirmation,
      role,
    } = values;

    const selectedCityName = cityName.find(
      (cityItem) => cityItem.value === Number(city),
    )?.name;

    const selectedStateName = states.find(
      (stateItem) => stateItem.id === Number(state),
    )?.name;

    const encodedFormData = querystring.stringify({
      name,
      phone,
      email,
      state: selectedStateName,
      city: selectedCityName,
      national_code,
      shaba_number,
      password,
      password_confirmation,
      role,
    });

    await axios
      .post("/api/admin/users", encodedFormData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(
            <ToastSuccess text={"کاربر جدید با موفقیت اضافه شد"} />,
          );
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

  if (!mount) {
    return null;
  }
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex min-h-screen w-full items-center justify-center"
      >
        <Form {...form} className="bg-opacity-50 backdrop-opacity-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl bg-gradient-to-t from-[rgb(87,109,105,0.5)] to-[rgb(135,160,155,0.5)] px-20 py-9"
          >
            <h2 className="mb-9 text-center text-2xl font-bold">ورود مهمان </h2>

            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>لطفا کد عروسی را وارد کنید.</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="کد عروسی"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-7 flex w-full items-center justify-center gap-7">
              <SubmitButton
                className="mt-3 bg-[#F1F5F1] text-black hover:bg-[#f1f5f1] hover:text-black"
                loading={isSubmitting}
              >
                ورود
              </SubmitButton>
              <Link
                href="/"
                className="mt-3 rounded-md bg-[#F1F5F1] px-3 py-2 text-black"
              >
                برگشت به صفحه اصلی
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default GuestPage;
