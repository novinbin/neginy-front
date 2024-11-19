"use client";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ToastSuccess from "@/components/toast/toast-success";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { HomePageFooterSchema } from "@/lib/validation/admin/config";

function HomePageEnd() {
  const form = useForm({
    resolver: zodResolver(HomePageFooterSchema),
    defaultValues: {
      footerAddress: "",
      footerPhone: "",
      footerIg: "",
      footerWhatsApp: "",
      footerTelegram: "",
      footerEmail: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    try {
      let footerAddressResponse = await submitfooterAddress(
        values.footerAddress,
      );
      let footerPhoneResponse = await submitfooterPhone(values.footerPhone);
      let footerIgResponse = await submitfooterIg(values.footerIg);
      let footerWhatsAppResponse = await submitfooterWhatsApp(
        values.footerWhatsApp,
      );
      let footerTelegramResponse = await submitfooterTelegram(
        values.footerTelegram,
      );
      let footerEmailResponse = await submitfooterEmail(values.footerEmail);

      if (
        footerAddressResponse.status === 201 &&
        footerPhoneResponse.status === 201 &&
        footerIgResponse.status === 201 &&
        footerWhatsAppResponse.status === 201 &&
        footerTelegramResponse.status === 201 &&
        footerEmailResponse.status === 201
      ) {
        toast.success(
          <ToastSuccess text={`اطلاعات شما با موفقیت تغییر کرد.`} />,
        );
      }
      toast.success(<ToastSuccess text={`اطلاعات شما با موفقیت تغییر کرد.`} />);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      fetchData();
    }
  };

  const submitfooterAddress = (footerAddress) => {
    return axios.post("/api/admin/config/string", { footerAddress });
  };

  const submitfooterPhone = (footerPhone) => {
    return axios.post("/api/admin/config/string", { footerPhone });
  };

  const submitfooterIg = (footerIg) => {
    return axios.post("/api/admin/config/string", { footerIg });
  };

  const submitfooterWhatsApp = (footerWhatsApp) => {
    return axios.post("/api/admin/config/string", { footerWhatsApp });
  };

  const submitfooterTelegram = (footerTelegram) => {
    return axios.post("/api/admin/config/string", { footerTelegram });
  };

  const submitfooterEmail = (footerEmail) => {
    return axios.post("/api/admin/config/string", { footerEmail });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(
        `/api/admin/config/footerAddress,footerPhone,footerIg,footerWhatsApp,footerTelegram,footerEmail`,
      )
      .then((response) => {
        setValue("footerAddress", response.data.data[0].value);
        setValue("footerPhone", response.data.data[1].value);
        setValue("footerIg", response.data.data[2].value);
        setValue("footerWhatsApp", response.data.data[3].value);
        setValue("footerTelegram", response.data.data[4].value);
        setValue("footerEmail", response.data.data[5].value);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="my-9 text-center text-xl">
            افزودن اطلاعات پاورقی سایت
          </h2>
          <div className="grid grid-cols-3 items-center justify-between gap-7">
            <FormField
              control={control}
              name="footerAddress"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>آدرس</FormLabel>
                  <FormControl>
                    <Textarea autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="footerPhone"
              render={({ field }) => (
                <FormItem className="">
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
              name="footerTelegram"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>لینک تلگرام</FormLabel>
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
              name="footerWhatsApp"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>لینک واتس آپ</FormLabel>
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
              name="footerIg"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>لینک اینستاگرام</FormLabel>
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
              name="footerEmail"
              render={({ field }) => (
                <FormItem className="">
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
          </div>
          <div className="mt-4 flex w-full items-center justify-center">
            <SubmitButton className="mt-3 w-16" loading={isSubmitting}>
              افزودن
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default HomePageEnd;
