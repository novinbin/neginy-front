"use client";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import Dropzone from "react-dropzone";
import { Upload } from "lucide-react";
import Image from "next/image";
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
import { Input } from "@/components/ui/input";
import { HomePageOnlineGiftSchema } from "@/lib/validation/admin/config";

function HomePageOnlineGift() {
  const [currentImage, setCurrentImage] = useState(null);
  const form = useForm({
    resolver: zodResolver(HomePageOnlineGiftSchema),
    defaultValues: {
      onlineGiftsDescription: "",
      onlineGiftsPhoto: null,
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
      let onlineGiftsPhotoResponse = await uploadImage(values.onlineGiftsPhoto);
      let onlineGiftsDescriptionResponse = await submitDescription(
        values.onlineGiftsDescription,
      );

      if (onlineGiftsPhotoResponse.status === 201) {
        toast.success(<ToastSuccess text={`عکس شما با موفقیت تغییر کرد.`} />);
      }
      if (onlineGiftsDescriptionResponse.status === 201) {
        toast.success(<ToastSuccess text={`متن شما با موفقیت تغییر کرد.`} />);
      }
      toast.success(
        <ToastSuccess text={`متن و عکس شما با موفقیت تغییر کرد.`} />,
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      fetchData();
    }
  };

  const submitDescription = (onlineGiftsDescription) => {
    return axios.post("/api/admin/config/string", { onlineGiftsDescription });
  };

  const uploadImage = (photo) => {
    const formData = new FormData();

    formData.append("onlineGiftsPhoto", photo);



    return axios.post("/api/admin/config/photo", formData);
  };

  const onDrop = useCallback(
    (files) => {
      setValue("onlineGiftsPhoto", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/admin/config/onlineGiftsDescription,onlineGiftsPhoto`)
      .then((response) => {
        setValue("onlineGiftsDescription", response.data.data[1].value);
        setCurrentImage(response.data.data[0].value);
        setValue("onlineGiftsPhoto", null);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="my-9 text-center text-xl">افزودن آنلاین هدیه</h2>
          <div className="max-md:grc grid grid-cols-1 justify-center gap-4">
            <FormField
              control={control}
              name="onlineGiftsDescription"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>توضیحات پرداخت آنلاین هدیه</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="onlineGiftsPhoto"
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
                              <span>آپلود تصاویر</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("onlineGiftsPhoto") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("onlineGiftsPhoto"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {currentImage && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={currentImage}
                                  width={360}
                                  height={180}
                                  alt="intro"
                                  className="mx-auto aspect-video max-w-96 rounded-lg"
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

export default HomePageOnlineGift;
