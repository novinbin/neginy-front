"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { axios } from "@/lib/axios";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import ToastSuccess from "@/components/toast/toast-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Dropzone from "react-dropzone";
import { Upload, X } from "lucide-react";
import { useCallback } from "react";
import { gallerySchema } from "@/lib/validation/gallery/gallery";
import Image from "next/image";

const CreateForm = () => {
  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {

    const { images } = values;

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);

    images.map((img, index) => {
      formData.append(`photo_${index}`, img.file);
    });

    try {
      const response = await axios.post("/api/admin/gallery", formData);

      if (response.status === 201) {
        toast.success(<ToastSuccess text={"گالری جدید با موفقیت اضافه شد"} />);
        reset();
      }
    } catch (error) {
      toast.error(
        <ToastError
          text={
            error?.response?.data?.message ||
            defaultMessages.errors.internalError
          }
        />
      );
    }
  };

  const onDrop = useCallback(
    (files) =>
      files.map((file) => {
        setValue(
          "images",
          [
            ...getValues("images"),
            {
              file: file,
              size: String(file.size),
              name: file.name,
              type: file.type,
            },
          ],
          {
            shouldValidate: true,
          }
        );
      }),
    [setValue, getValues]
  );

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 gap-2  ">
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2  ">
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
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>توضیحات </FormLabel>
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

            <div className="col-span-full">
              <FormField
                control={control}
                name="images"
                render={({ field }) => (
                  <FormItem className="mt-5 w-full">
                    <FormControl>
                      <Dropzone
                        maxSize={1024 * 1024 * 1}
                        maxFiles={10}
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
                                  برای انتخاب تصاویر کلیک کنید و یا تصاویر خود
                                  را داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                                </span>
                                <Upload
                                  size={60}
                                  className="mt-2 text-primary"
                                />
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                              {getValues("images").map((img, index) => (
                                <div
                                  className="relative rounded-lg"
                                  key={index}
                                >
                                  <Image
                                    src={URL.createObjectURL(img.file)}
                                    className="aspect-video w-32 rounded-lg"
                                    width={240}
                                    height={160}
                                    alt="product"
                                  />
                                  <div
                                    onClick={() => {
                                      setValue(
                                        "images",
                                        getValues("images").filter(
                                          (imgItem, imgIndex) =>
                                            imgIndex !== index
                                        ),
                                        {
                                          shouldValidate: true,
                                        }
                                      );
                                    }}
                                    className="absolute -left-2 -top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-primary"
                                  >
                                    <X size={16} className="text-white" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
         
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
