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
import { z } from "zod";
import { useRouter } from 'next/navigation'

function GuestPage() {
  const mount = useMount();
  const router = useRouter()


  const form = useForm({
    resolver: zodResolver(z.object({
      code: z.string().min(3, "کد حداقل سه کارکتر است")
    })),
    defaultValues: {
      code: "",
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
      code
    } = values;

    router.push(`/wedding-card/dashboard?code=${code}`)
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
              name="code"
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
