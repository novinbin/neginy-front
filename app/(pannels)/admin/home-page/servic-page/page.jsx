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
import ToastSuccess from "@/components/toast/toast-success";
import { serveSchema } from "@/lib/validation/admin/config";

function ServicesPage() {
  const [serveImageOne, setServeImageOne] = useState(null);
  const [serveImageTwo, setServeImageTwo] = useState(null);
  const [serveImageThree, setServeImageThree] = useState(null);
  const [serveImageFour, setServeImageFour] = useState(null);

  const form = useForm({
    resolver: zodResolver(serveSchema),
    defaultValues: {
      servePhotoOne: null,
      servePhotoTwo: null,
      servePhotoThree: null,
      servePhotoFour: null,
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
      let uploadImagesResponse = await uploadImages({
        servePhotoOne: values.servePhotoOne,
        servePhotoTwo: values.servePhotoTwo,
        servePhotoThree: values.servePhotoThree,
        servePhotoFour: values.servePhotoFour,
      });


      if (uploadImagesResponse.status === 201) {
        toast.success(<ToastSuccess text={`عکس شما با موفقیت تغییر کرد.`} />);
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

  const uploadImages = (photos) => {
    const formData = new FormData();

    formData.append("servePhotoOne", photos.servePhotoOne);
    formData.append("servePhotoTwo", photos.servePhotoTwo);
    formData.append("servePhotoThree", photos.servePhotoThree);
    formData.append("servePhotoFour", photos.servePhotoFour);

    return axios.post("/api/admin/config/photo", formData);
  };

  const onDropOne = useCallback(
    (files) => {
      setValue("servePhotoOne", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropTwo = useCallback(
    (files) => {
      setValue("servePhotoTwo", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropThree = useCallback(
    (files) => {
      setValue("servePhotoThree", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropFour = useCallback(
    (files) => {
      setValue("servePhotoFour", files[0], {
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
        `/api/admin/config/servePhotoOne,servePhotoTwo,servePhotoThree,servePhotoFour`,
      )
      .then((response) => {
        setServeImageOne(response.data.data[0].value);
        setServeImageTwo(response.data.data[1].value);
        setServeImageThree(response.data.data[2].value);
        setServeImageFour(response.data.data[3].value);

        setValue("servePhotoOne", null);
        setValue("servePhotoTwo", null);
        setValue("servePhotoThree", null);
        setValue("servePhotoFour", null);
      })
      .catch((err) => {
      });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="my-9 text-center text-xl">افزودن تصاویر خدمات</h2>
          <div className="max-md:grc grid grid-cols-2 justify-center gap-4">
            <FormField
              control={control}
              name="servePhotoOne"
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
                              <span>آپلود تصویر آتلیه</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("servePhotoOne") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("servePhotoOne"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {serveImageOne && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={serveImageOne}
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
              name="servePhotoTwo"
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
                              <span>آپلود تصویر تالار</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("servePhotoTwo") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("servePhotoTwo"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {serveImageTwo && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={serveImageTwo}
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
              name="servePhotoThree"
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
                              <span>آپلود تصویر تشریفات</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("servePhotoThree") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("servePhotoThree"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {serveImageThree && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={serveImageThree}
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
              name="servePhotoFour"
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
                              <span>آپلود تصویر ودینگ پلنر</span>
                              <span className="mt-2 text-xs">
                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود را
                                داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                              </span>
                              <Upload size={60} className="mt-2 text-primary" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                            {getValues("servePhotoFour") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("servePhotoFour"),
                                  )}
                                  className="aspect-video w-44 rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="alt"
                                />
                              </div>
                            )}
                            {serveImageFour && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={serveImageFour}
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

export default ServicesPage;
