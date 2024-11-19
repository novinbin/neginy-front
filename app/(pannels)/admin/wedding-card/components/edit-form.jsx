"use client";


import useMount from "@/hooks/use-mount";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { axios } from "@/lib/axios";

import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";

import ToastSuccess from "@/components/toast/toast-success";
import Image from "next/image";
import { Upload } from "lucide-react";
import Dropzone from "react-dropzone";
import defaultBlog from "@/public/img/img-editor/card.jpg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";

import { editServicesSchema } from "@/lib/validation/admin/services";
import FormData from "form-data";

const EditForm = ({ data }) => {
  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(editServicesSchema),
    defaultValues: {
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
    const { photo } = values;

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
      .post(`/api/admin/card-templates/${data.data.id}`, formData)
      .then((response) => {
        if (response.status === 201) {
          setData(response.data);
          setValue("photo", null);
          toast.success(<ToastSuccess text={"عکس جدید با موفقیت اضافه شد"} />);
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
    <div className="w-full rounded-lg border border-white p-9 backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={control}
              name="photo"
              render={({ field }) => (
                <FormItem>
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
                              className="aspect-video w-full rounded-lg"
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
          <div className="mb-6 flex w-full items-center justify-center">
            <SubmitButton className="mt-7" loading={isSubmitting}>
              ارسال
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
