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
import { EnviromentSchema } from "@/lib/validation/admin/config";
import { Textarea } from "@/components/ui/textarea";

function HomePageContact() {
  const [currentImageOne, setCurrentImageOne] = useState(null);
  const [currentImageTwo, setCurrentImageTwo] = useState(null);
  const [currentImageThree, setCurrentImageThree] = useState(null);
  const [currentImageFour, setCurrentImageFour] = useState(null);
  const [currentImageFive, setCurrentImageFive] = useState(null);

  const form = useForm({
    resolver: zodResolver(EnviromentSchema),
    defaultValues: {
      enviromentDescription: "",
      enviromentPhotoOne: null,
      enviromentPhotoTwo: null,
      enviromentPhotoThree: null,
      enviromentPhotoFour: null,
      enviromentPhotoFive: null,
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
      let enviromentDescriptionResponse = await submitEnviromentDescription(
        values.enviromentDescription,
      );

      let uploadImagesResponse = await uploadImages({
        enviromentPhotoOne: values.enviromentPhotoOne,
        enviromentPhotoTwo: values.enviromentPhotoTwo,
        enviromentPhotoThree: values.enviromentPhotoThree,
        enviromentPhotoFour: values.enviromentPhotoFour,
        enviromentPhotoFive: values.enviromentPhotoFive,
      });


      if (uploadImagesResponse.status === 201) {
        toast.success(<ToastSuccess text={`عکس شما با موفقیت تغییر کرد.`} />);
      }
      if (enviromentDescriptionResponse.status === 201) {
        toast.success(<ToastSuccess text={`متن شما با موفقیت تغییر کرد.`} />);
      }

      toast.success(
        <ToastSuccess text={` متن و عکس شما با موفقیت تغییر کرد.`} />,
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      fetchData();
    }
  };

  const submitEnviromentDescription = (enviromentDescription) => {
    return axios.post("/api/admin/config/string", {
      enviromentDescription,
    });
  };

  const uploadImages = (photos) => {
    const formData = new FormData();

    formData.append("enviromentPhotoOne", photos.enviromentPhotoOne);
    formData.append("enviromentPhotoTwo", photos.enviromentPhotoTwo);
    formData.append("enviromentPhotoThree", photos.enviromentPhotoThree);
    formData.append("enviromentPhotoFour", photos.enviromentPhotoFour);
    formData.append("enviromentPhotoFive", photos.enviromentPhotoFive);

    return axios.post("/api/admin/config/photo", formData);
  };

  const onDropOne = useCallback(
    (files) => {
      setValue("enviromentPhotoOne", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropTwo = useCallback(
    (files) => {
      setValue("enviromentPhotoTwo", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropThree = useCallback(
    (files) => {
      setValue("enviromentPhotoThree", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropFour = useCallback(
    (files) => {
      setValue("enviromentPhotoFour", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropFive = useCallback(
    (files) => {
      setValue("enviromentPhotoFive", files[0], {
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
        `/api/admin/config/enviromentDescription,enviromentPhotoOne,enviromentPhotoTwo,enviromentPhotoThree,enviromentPhotoFour,enviromentPhotoFive`,
      )
      .then((response) => {

        setValue("enviromentDescription", response.data.data[5].value);
        setCurrentImageOne(response.data.data[0].value); 
        setCurrentImageTwo(response.data.data[1].value);
        setCurrentImageThree(response.data.data[2].value); 
        setCurrentImageFour(response.data.data[3].value);
        setCurrentImageFive(response.data.data[4].value); 


        setValue("enviromentPhotoOne", null);
        setValue("enviromentPhotoTwo", null);
        setValue("enviromentPhotoThree", null);
        setValue("enviromentPhotoFour", null);
        setValue("enviromentPhotoFive", null);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="my-9 text-center text-xl">
            محیطی مجزا نسبت به هر کسب و کار
          </h2>
          <div className="max-md:grc grid grid-cols-2 justify-center gap-4">
            <FormField
              control={control}
              name="enviromentDescription"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="enviromentPhotoOne"
              render={({ field }) => (
                <FormItem className="max-lg:col-span-full">
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 1}
                      maxFiles={1}
                      onDrop={onDropOne}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center text-muted-foreground">
                              <span>آپلود تصویر اول</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("enviromentPhotoOne") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("enviromentPhotoOne"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {currentImageOne && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={currentImageOne}
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
            <FormField
              control={control}
              name="enviromentPhotoTwo"
              render={({ field }) => (
                <FormItem className="max-lg:col-span-full">
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 1}
                      maxFiles={1}
                      onDrop={onDropTwo}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center text-muted-foreground">
                              <span>آپلود تصویر دوم</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("enviromentPhotoTwo") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("enviromentPhotoTwo"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {currentImageTwo && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={currentImageTwo}
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
            <FormField
              control={control}
              name="enviromentPhotoThree"
              render={({ field }) => (
                <FormItem className="max-lg:col-span-full">
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 1}
                      maxFiles={1}
                      onDrop={onDropThree}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center text-muted-foreground">
                              <span>آپلود تصویر سوم</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("enviromentPhotoThree") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("enviromentPhotoThree"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {currentImageThree && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={currentImageThree}
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
            <FormField
              control={control}
              name="enviromentPhotoFour"
              render={({ field }) => (
                <FormItem className="max-lg:col-span-full">
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 1}
                      maxFiles={1}
                      onDrop={onDropFour}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center text-muted-foreground">
                              <span>آپلود تصویر چهارم</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("enviromentPhotoFour") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("enviromentPhotoFour"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {currentImageFour && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={currentImageFour}
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
            <FormField
              control={control}
              name="enviromentPhotoFive"
              render={({ field }) => (
                <FormItem className="max-lg:col-span-full">
                  <FormControl>
                    <Dropzone
                      maxSize={1024 * 1024 * 1}
                      maxFiles={1}
                      onDrop={onDropFive}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            {...getRootProps()}
                            className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                          >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center text-muted-foreground">
                              <span>آپلود تصویر پنجم</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("enviromentPhotoFive") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("enviromentPhotoFive"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {currentImageFive && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={currentImageFive}
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

export default HomePageContact;
