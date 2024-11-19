"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import {  axios } from "@/lib/axios";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import ToastSuccess from "@/components/toast/toast-success";
import { Textarea } from "@/components/ui/textarea";
import Dropzone from "react-dropzone";
import { Upload } from "lucide-react";
import Image from "next/image";
import defaultBlog from "@/public/img/dashboard/service.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";

import FormData from "form-data";
import { panelServicesSchema } from "@/lib/validation/panel/services";


const CreateForm = () => {
  const mount = useMount();

  const [serviceId, setServiceId] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/ceremony/services`)
      .then((response) => {
        setServiceId(response.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const form = useForm({
    resolver: zodResolver(panelServicesSchema),
    defaultValues: {
      service_id: "",
      cost: "",
      description: "",
      photo: null,
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

    const formData = new FormData();

    for (var propName in values) {
      if (values[propName] === null || values[propName] === undefined) {
        delete values[propName];
      }
    }

    for (var propName in values) {
      if (propName === "photo") {
        formData.append("photo", values["photo"].file);
      } else {
        formData.append(propName, values[propName]);
      }
    }

    await axios
      .post("/api/ceremony/my-services", formData)
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
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg border border-white p-9 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
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
                      type="number"
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
                    <Textarea
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
                  <FormLabel>تصویر سرویس</FormLabel>
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 2}
                      maxFiles={1}
                      onDrop={onDrop}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 md:px-10">
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
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-3">
                            <Image
                              src={
                                getValues("photo")
                                  ? URL.createObjectURL(getValues("photo").file)
                                  : defaultBlog
                              }
                              className="aspect-video w-full rounded-lg"
                              width={240}
                              height={160}
                              alt="product"
                            />
                          </div>
                        </div>
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

export default CreateForm;
