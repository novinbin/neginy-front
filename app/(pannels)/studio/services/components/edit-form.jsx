"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import ToastSuccess from "@/components/toast/toast-success";
import Image from "next/image";
import { CogIcon, Upload } from "lucide-react";
import Dropzone from "react-dropzone";
import defaultBlog from "@/public/img/dashboard/service.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editPanelServicesSchema } from "@/lib/validation/panel/services";

const EditForm = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [serviceId, setServiceId] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/studio/services`)
      .then((response) => {
        setServiceId(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(editPanelServicesSchema),
    defaultValues: {
      service_id: data?.data?.service_id,
      cost: data?.data?.cost,
      description: data?.data?.description,
      photo: data?.data?.photo,
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
    const encodedFormData = querystring.stringify({
      ...values,
    });

    await axios
      .post(`/api/studio/my-services/${data.data.id}`, encodedFormData)
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

  const onDrop = useCallback(
    (files) =>
      files.map((file) => {
        setValue(
          "photo",
          {
            file: file,
            size: String(file.size),
            name: file.name,
            type: file.type,
          },
          {
            shouldValidate: true,
          },
        );
      }),
    [getValues("photo")],
  );

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border border-white px-9 backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="my-9 flex items-center justify-center gap-2">
            <CogIcon stroke="#d8a977" className="size-7" />
            <h2 className="mt-2">اطلاعات سرویس</h2>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <FormField
              control={control}
              name="service_id"
              className="col-span-3 lg:col-span-1"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نوع سرویس</FormLabel>
                  <FormControl>
                    <Controller
                      control={control}
                      name="service_id"
                      render={({ field }) => (
                        <Select
                          value={String(field.value)}
                          onValueChange={(value) => {
                            field.onChange(Number(value));
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="نام سرویس" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceId?.data?.map((service) => (
                              <SelectItem
                                key={service.id}
                                value={String(service.id)}
                              >
                                {service.name}
                              </SelectItem>
                            ))}
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
              name="cost"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>قیمت سرویس</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>توضیحات سرویس</FormLabel>
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
              name="photo"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>تصویر مقاله</FormLabel>
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 2}
                      maxFiles={1}
                      onDrop={onDrop}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <>
                          <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-10">
                            <div
                              {...getRootProps()}
                              className="mx-auto flex w-full cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                            >
                              <input {...getInputProps()} />
                              <div className="flex flex-col items-center text-muted-foreground">
                                <span>آپلود تصویر</span>
                                <span className="mt-2 text-xs">
                                  برای انتخاب تصویر کلیک کنید و یا تصویر خود را
                                  داخل کادر بکشید (حداکثر با حجم ۲ مگابایت)
                                </span>
                                <Upload
                                  size={60}
                                  className="mt-2 text-primary"
                                />
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-3">
                              {getValues("photo") && (
                                <Button
                                  onClick={() => {
                                    setValue("photo", null, {
                                      shouldValidate: true,
                                    });
                                  }}
                                >
                                  حذف
                                </Button>
                              )}
                              <Image
                                src={
                                  getValues("photo")
                                    ? URL.createObjectURL(
                                        getValues("photo").file,
                                      )
                                    : defaultBlog
                                }
                                className="aspect-video w-full rounded-lg"
                                width={240}
                                height={160}
                                alt="blog"
                              />
                            </div>
                          </div>
                          <div className="mx-auto w-full text-center md:w-96">
                            <span>تصویر فعلی</span>
                            <Image
                              src={data?.data?.photo}
                              className="mx-auto aspect-video w-full rounded-lg"
                              width={240}
                              height={160}
                              alt="blog"
                            />
                          </div>
                        </>
                      )}
                    </Dropzone>
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
  );
};

export default EditForm;
