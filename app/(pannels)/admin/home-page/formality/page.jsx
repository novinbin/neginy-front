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
import { formalitySchema } from "@/lib/validation/admin/config";
import { Input } from "@/components/ui/input";

function HomePageFormality() {
  const [currentImage, setCurrentImage] = useState(null);
  const form = useForm({
    resolver: zodResolver(formalitySchema),
    defaultValues: {
      formalityName: "",
      formalityDescription: "",
      formalityPhoto: null,
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
      let formalityPhotoResponse = await uploadImage(values.formalityPhoto);
      let formalityDescriptionResponse = await submitDescription(
        values.formalityDescription,
      );
      let formalityNameResponse = await submitName(values.formalityName);


      if (formalityPhotoResponse.status === 201) {
        toast.success(<ToastSuccess text={`عکس شما با موفقیت تغییر کرد.`} />);
      }
      if (
        formalityDescriptionResponse.status === 201 &&
        formalityNameResponse.status === 201
      ) {
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

  const submitDescription = (formalityDescription) => {
    return axios.post("/api/admin/config/string", { formalityDescription });
  };

  const submitName = (formalityName) => {
    return axios.post("/api/admin/config/string", { formalityName });
  };

  const uploadImage = (photo) => {
    const formData = new FormData();

    formData.append("formalityPhoto", photo);


    return axios.post("/api/admin/config/photo", formData);
  };

  const onDrop = useCallback(
    (files) => {
      setValue("formalityPhoto", files[0], {
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
        `/api/admin/config/formalityName,formalityDescription,formalityPhoto`,
      )
      .then((response) => {
        setValue("formalityName", response.data.data[2].value);
        setValue("formalityDescription", response.data.data[1].value);
        setCurrentImage(response.data.data[0].value);
        setValue("formalityPhotol", null);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="my-9 text-center text-xl">
            افزودن عکس تجربه مراسمی رویایی
          </h2>
          <div className="max-md:grc grid grid-cols-2 justify-center gap-4">
            <FormField
              control={control}
              name="formalityName"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>عنوان تجربه مراسمی رویایی</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="formalityDescription"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>توضیحات تجربه مراسمی رویایی</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="formalityPhoto"
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
                            {getValues("formalityPhoto") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("formalityPhoto"),
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

export default HomePageFormality;
