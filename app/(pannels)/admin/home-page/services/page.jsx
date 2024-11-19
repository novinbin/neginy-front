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
import {
  HomePageServicesSchema,
} from "@/lib/validation/admin/config";
import { Textarea } from "@/components/ui/textarea";

function HomePageFormality() {
  const [currentImageOne, setCurrentImageOne] = useState(null);
  const [currentImageTwo, setCurrentImageTwo] = useState(null);
  const [currentImageThree, setCurrentImageThree] = useState(null);

  const form = useForm({
    resolver: zodResolver(HomePageServicesSchema),
    defaultValues: {
      servicesGalleryDescription: "",
      servicesDescription: "",
      servicesPhotoOne: null,
      servicesPhotoTwo: null,
      servicesPhotoThree: null,
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
      let servicesGalleryDescriptionResponse = await submitGalleryDescription(
        values.servicesGalleryDescription,
      );
      let servicesDescriptionResponse = await submitDescription(
        values.servicesDescription,
      );
      let servicesPhotoOneResponse = await uploadImageOne(
        values.servicesPhotoOne,
      );
      let servicesPhotoTwoResponse = await uploadImageTwo(
        values.servicesPhotoTwo,
      );
      let servicesPhotoThreeResponse = await uploadImageThree(
        values.servicesPhotoThree,
      );

      if (
        servicesPhotoOneResponse.status === 201 &&
        servicesPhotoTwoResponse.status === 201 &&
        servicesPhotoThreeResponse.status === 201
      ) {
        toast.success(<ToastSuccess text={`عکس شما با موفقیت تغییر کرد.`} />);
      }
      if (
        servicesGalleryDescriptionResponse.status === 201 &&
        servicesDescriptionResponse.status === 201
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

  const submitGalleryDescription = (servicesGalleryDescription) => {
    return axios.post("/api/admin/config/string", {
      servicesGalleryDescription,
    });
  };

  const submitDescription = (servicesDescription) => {
    return axios.post("/api/admin/config/string", { servicesDescription });
  };

  const uploadImageOne = (photo) => {
    const formData = new FormData();

    formData.append("servicesPhotoOne", photo);

   

    return axios.post("/api/admin/config/photo", formData);
  };

  const uploadImageTwo = (photo) => {
    const formData = new FormData();

    formData.append("servicesPhotoTwo", photo);

  

    return axios.post("/api/admin/config/photo", formData);
  };

  const uploadImageThree = (photo) => {
    const formData = new FormData();

    formData.append("servicesPhotoThree", photo);

  
    return axios.post("/api/admin/config/photo", formData);
  };

  const onDropOne = useCallback(
    (files) => {
      setValue("servicesPhotoOne", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropTwo = useCallback(
    (files) => {
      setValue("servicesPhotoTwo", files[0], {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const onDropThree = useCallback(
    (files) => {
      setValue("servicesPhotoThree", files[0], {
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
        `/api/admin/config/servicesGalleryDescription,servicesDescription,servicesPhotoOne,servicesPhotoTwo,servicesPhotoThree,`,
      )
      .then((response) => {
        setValue("servicesGalleryDescription", response.data.data[0].value);
        setValue("servicesDescription", response.data.data[1].value);
        setCurrentImageOne(response.data.data[2].value);
        setCurrentImageTwo(response.data.data[3].value);
        setCurrentImageThree(response.data.data[4].value);
        setValue("servicesPhotoOne", null);
        setValue("servicesPhotoTwo", null);
        setValue("servicesPhotoThree", null);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="my-9 text-center text-xl">
            افزودن عکس گالری و خدمات ما صفحه اصلی
          </h2>
          <div className="max-md:grc grid grid-cols-1 justify-center gap-4">
            <FormField
              control={control}
              name="servicesGalleryDescription"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>توضیحات خدمات ما</FormLabel>
                  <FormControl>
                    <Textarea autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="servicesDescription"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>توضیحات گالری اختصلصی</FormLabel>
                  <FormControl>
                    <Textarea autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="servicesPhotoOne"
              render={({ field }) => (
                <FormItem className="col-span-full">
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
                            {getValues("servicesPhotoOne") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("servicesPhotoOne"),
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
              name="servicesPhotoTwo"
              render={({ field }) => (
                <FormItem className="col-span-full">
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
                            {getValues("servicesPhotoTwo") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("servicesPhotoTwo"),
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
              name="servicesPhotoThree"
              render={({ field }) => (
                <FormItem className="col-span-full">
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
                            {getValues("servicesPhotoThree") && (
                              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={URL.createObjectURL(
                                    getValues("servicesPhotoThree"),
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
