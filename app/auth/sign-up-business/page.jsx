"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import bg from "@/public/img/auth/bg.png";
import logo from "@/public/img/logo/logo.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUpBusinessSchema } from "@/lib/validation/auth/sign-up-business";

const LoginPage = () => {
  const userHook = useUser();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpBusinessSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      role: "",
      password: "",
      password_confirmation: "",
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values) => {
    const { name, phone, password, password_confirmation, email, role } =
      values;

    if (password !== password_confirmation) {
      return toast.error(<ToastError text="تکرار رمز ورود صحیح نمیباشد" />);
    }

    const encodedFormData = querystring.stringify({
      name,
      phone,
      password,
      password_confirmation,
      email,
      role,
    });

    await axios
      .post("/register", encodedFormData)
      .then(async (response) => {
        if (response.status === 201) {
          await axios.get("/api/self").then((res) => {
            userHook.setUserData(res?.data);

            res.data.data.role === "talar" &&
              router.push(routes.auth.signUpBusiness.hall);
            res.data.data.role === "ceremony" &&
              router.push(routes.auth.signUpBusiness.ceremonies);
            res.data.data.role === "studio" &&
              router.push(routes.auth.signUpBusiness.studio);
            res.data.data.role === "wedding_planer" &&
              router.push(routes.auth.signUpBusiness.weddingPlaner);

            toast.success(
              <ToastSuccess text={"با موفقیت ثبت نام انجام شد."} />,
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
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
      className="flex items-center justify-center lg:h-screen"
    >
      <div className="mx-auto rounded-xl shadow-2xl max-lg:w-4/5 xl:w-3/5">
        <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 items-center justify-center">
          <div className="flex h-[48rem] flex-col items-center justify-evenly rounded-r-xl bg-white">
            <h1 className="text-center text-2xl">ثبت نام به عنوان کسب و کار</h1>
            <div className="mx-auto w-4/5">
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid w-full grid-cols-1 gap-x-3 gap-y-2"
                >
                  <FormField
                    control={control}
                    name="role"
                    className="col-span-full !w-full"
                    render={({ field }) => (
                      <FormItem className="col-span-full !w-full">
                        <FormLabel>نوع کسب و کار</FormLabel>
                        <FormControl>
                          <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="نقش" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="talar">تالار</SelectItem>
                                  <SelectItem value="studio">آتلیه</SelectItem>
                                  <SelectItem value="ceremony">
                                    تشریفات
                                  </SelectItem>
                                  <SelectItem value="wedding_planer">
                                    ودینگ پلنر
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

                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام و نام خانوادگی مدیر</FormLabel>
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
                        <FormLabel>شماره تماس مدیر</FormLabel>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ایمیل مدیر</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="test@gmail.com"
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

                  <FormField
                    control={control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تایید رمز ورود</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={"تایید رمز ورود"}
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
                      ثبت نام
                    </SubmitButton>
                  </div>
                </form>
              </Form>
              <p className="mt-7 text-sm font-normal">
                حساب دارید؟
                <Link
                  href={routes.auth.signIn}
                  className="px-2 font-semibold text-primary hover:underline"
                >
                  وارد شوید.
                </Link>
              </p>
              <div className="lg:hidden mt-7">
                <Link
                  href={routes.auth.signUp}
                  className="rounded-xl bg-[#d8a977] px-4 py-2 text-white"
                >
                  ثبت نام به عنوان کاربر
                </Link>
              </div>
            </div>
          </div>
          <div className="flex h-[48rem] flex-col items-center justify-evenly rounded-l-xl bg-[#DCD9D8] bg-opacity-30 backdrop-blur-[4px] max-lg:hidden">
          <Link href={"/"}>
              <Image
                src={logo}
                width={480}
                height={360}
                alt="logo"
                className="w-80"
              />
            </Link>
            <Link
              href={routes.auth.signUp}
              className="rounded-xl px-9 py-2 text-[#68807A]"
            >
              ثبت نام به عنوان کاربر
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
