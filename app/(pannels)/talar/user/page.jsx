"use client";

import { useConfig } from "@/hooks/use-config";
import { editUserSchema } from "@/lib/validation/admin/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User2 } from "lucide-react";
import SubmitButton from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { axios } from "@/lib/axios";
import ToastError from "@/components/toast/toast-error";
import { toast } from "sonner";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";

function UserPage() {
  const configHook = useConfig();
  const searchParams = useSearchParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: data?.name || "",
      phone: data?.phone || "",
      email: data?.email || "",
      national_code: data?.national_code || "",
      shaba_number: data?.shaba_number || "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting },
    reset,
  } = form;

  useEffect(() => {
    fetchCities();
  }, [searchParams, configHook.refreshFlag]);

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/self`);
      setData(response.data);

      reset({
        name: response?.data?.data?.name || "",
        phone: response?.data?.data?.phone || "",
        email: response?.data?.data?.email || "",
        national_code: response?.data?.data?.national_code || "",
        shaba_number: response?.data?.data?.shaba_number || "",
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values) => {
    const encodedFormData = querystring.stringify({
      ...values,
    });

    await axios
      .post(`/api/self`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(<ToastSuccess text={" با موفقیت ویرایش شد"} />);
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
      <div className="mb-7 flex flex-col gap-4 rounded-xl bg-[#E7D7CA] bg-opacity-35 px-7 py-4">
        <h2 className="text-lg font-bold">مشخصات حساب کاربری</h2>
        <p>
          در این صفحه میتوانید اطلاعات مربوط به اطلاعات شخصی خود را مشاهده کنید
        </p>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg p-7 backdrop-blur-md"
          >
            <div className="my-9 flex items-center justify-center gap-2">
              <User2 stroke="#d8a977" className="size-7" />
              <h2 className="mt-2">اطلاعات شخصی</h2>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>نام </FormLabel>
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
                    <FormLabel>شماره تماس </FormLabel>
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
                name="national_code"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>کدملی</FormLabel>
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
                name="shaba_number"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>شماره شبا</FormLabel>
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
    </div>
  );
}

export default UserPage;
