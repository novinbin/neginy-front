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
  FormMessage,
} from "@/components/ui/form";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import { bannerSchema } from "@/lib/validation/admin/config";

function HomePageImage() {
  const [currentImage, setCurrentImage] = useState(null);
  const form = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: { photo: null },
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
    const formData = new FormData();

    const photo = getValues("photo");


    formData.append("photo", photo);

    await axios
      .post("/api/admin/config/photo", formData)
      .then(async (response) => {
        if (response.status === 204) {
          toast.success(<ToastSuccess text="عکس با موفقیت اضافه شد." />);
        }
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={error?.response?.data?.message || "مشکلی پیش آمده است."}
          />,
        );
      });
  };

  const onDrop = useCallback(
    (files) => {
      setValue("photo", files[0], {
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
      .get(
        `/api/admin/config/photo`,
      )
      .then((response) => {
        setCurrentImage(response.data.data[0].value);
        setValue("formalityPhotol", null);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="my-9 text-center text-xl">افزودن عکس خانه</h2>
          <div className="max-md:grc grid grid-cols-1 justify-center gap-4">
            <FormField
              control={control}
              name="photo"
              render={({ field }) => (
                <FormItem className="mt-5 w-full">
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
                            {getValues("photo") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(getValues("photo"))}
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

export default HomePageImage;
