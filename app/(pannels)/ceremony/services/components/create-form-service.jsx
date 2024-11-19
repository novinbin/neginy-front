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
import Dropzone from "react-dropzone";
import { Upload } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useCallback, useState } from "react";
import { servicesSchema } from "@/lib/validation/admin/services";

const CreateFormService = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      name: "",
      business_type: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { name, business_type } = values;

    const encodedFormData = querystring.stringify({
      name,
      business_type,
    });

    await axios
      .post("/api/ceremony/services", encodedFormData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(<ToastSuccess text={"سرویس جدید با موفقیت اضافه شد"} />);
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

  const onDrop = useCallback(
    (files) =>
      files.map((file) => {
        setValue("brandPhoto", file, {
          shouldValidate: true,
        });
      }),
    [setValue],
  );

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 items-center gap-4 rounded-lg border border-white p-9 backdrop-blur-sm">
        <div>
          <p>نام سرویس : {data.name}</p>
        </div>
        <div>
          <p>
            دسته بندی :
            {data.business_type === "wedding_planer"
              ? "ودینگ پلنر "
              : data?.business_type === "studio"
                ? "آتلیه"
                : data?.business_type === "ceremony"
                  ? "تشریفات"
                  : "تالار"}
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-12 rounded-lg border border-white p-4 backdrop-blur-lg"
        >
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
            <FormField
              control={control}
              name="service_id"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>خدمات</FormLabel>
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
              name="cost"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>خدمات</FormLabel>
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
              name="brandPhoto"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>تصویر</FormLabel>
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
                              <span>آپلود تصویر</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصویر کلیک کنید و یا تصویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          {getValues("brandPhoto") && (
                            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                              <Image
                                src={URL.createObjectURL(
                                  getValues("brandPhoto"),
                                )}
                                className="aspect-video w-44 rounded-lg"
                                width={240}
                                height={160}
                                alt="product"
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
            <SubmitButton className="mt-3" loading={isSubmitting}>
              ارسال
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateFormService;
