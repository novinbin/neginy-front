"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { signInSchema } from "@/lib/validation/auth/sign-in";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";
import { routes } from "@/routes/routes";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import bank from "@/public/img/svg-guest/bank-gift.svg";
import { Input } from "@/components/ui/input";
import b from "@/public/img/img-editor/card.jpg";

function GuestBank() {
  const userHook = useUser();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { password, phone } = values;

    const encodedFormData = querystring.stringify({
      phone,
      password,
    });

    await axios
      .post("/login", encodedFormData)
      .then(async (response) => {
        if (response.status === 204 || response.status === 200) {
          await axios.get("/api/self").then((res) => {
            userHook.setUserData(res?.data?.data);

            res.data?.data?.role === "talar" &&
              router.push(routes.talar.dashboard);
            res.data?.data?.role === "ceremony" &&
              router.push(routes.ceremony.dashboard);
            res.data?.data?.role === "studio" &&
              router.push(routes.studio.dashboard);
            res.data?.data?.role === "wedding_planer" &&
              router.push(routes.weddingPlaner.dashboard);
            res.data?.data?.role === "user" &&
              router.push(routes.user.dashboard);
            res.data?.data?.role === "admin" &&
              router.push(routes.admin.dashboard);

            toast.success(
              <ToastSuccess text={defaultMessages.login.default} />,
            );
          });
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
  return (
    <div>
      <div className="mx-auto mt-9 grid items-center justify-center gap-7 max-lg:grid-cols-1 sm:w-full md:w-full lg:w-10/12 lg:grid-cols-2">
        <div className="flex w-full items-center justify-center max-lg:hidden">
          <Image
            src={bank}
            alt="gift icon"
            width={540}
            height={480}
            className=""
          />
        </div>
        <div className="mx-auto w-3/4 max-lg:w-full rounded-xl bg-[#68807A] bg-opacity-50 p-9">
          <Form {...form} className="">
            <h2 className="text-center text-xl font-bold">مشخصات میهمان</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-3 w-full space-y-3"
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="حداقل ۳ کاراکتر"
                        className="focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام خانوادگی : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="حداقل ۳ کاراکتر"
                        className="focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام پدر :</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="حداقل ۳ کاراکتر"
                        className="focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تماس :</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="09"
                        className="focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مبلغ هدیه (تومان) : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="09"
                        className="focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />

              <div>
                <h2 className="mt-7 mb-4 font-bold">انتخاب درگاه پرداخت :</h2>

                <div className="flex flex-row items-center justify-center gap-7">
                  <Image
                    src={b}
                    alt="gift icon"
                    width={540}
                    height={480}
                    className="h-16 w-16 rounded-lg"
                  />
                  <Image
                    src={b}
                    alt="gift icon"
                    width={540}
                    height={480}
                    className="h-16 w-16 rounded-lg"
                  />
                  <Image
                    src={b}
                    alt="gift icon"
                    width={540}
                    height={480}
                    className="h-16 w-16 rounded-lg"
                  />
                  <Image
                    src={b}
                    alt="gift icon"
                    width={540}
                    height={480}
                    className="h-16 w-16 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <SubmitButton
                  className="!mt-5 w-20 bg-[#68807A]"
                  loading={isSubmitting}
                >
                  پرداخت
                </SubmitButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default GuestBank;
