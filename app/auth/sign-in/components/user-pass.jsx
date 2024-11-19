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
import { Input } from "@/components/ui/input";
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
import Link from "next/link";

const UserPass = () => {
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 w-full space-y-3">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تماس</FormLabel>
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز ورود</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="رمز ورود"
                  className="focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        <div className="flex w-full items-center justify-center">
          <SubmitButton
            className="!mt-5 w-20 bg-[#68807A]"
            loading={isSubmitting}
          >
            ورود
          </SubmitButton>
        </div>

        <div className="lg:hidden">
          <div className="mt-9">
            <Link
              href={routes.auth.signUp}
              className="rounded-xl bg-[#d8a977] px-9 py-2 text-white"
            >
              ثبت نام در سایت
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserPass;
