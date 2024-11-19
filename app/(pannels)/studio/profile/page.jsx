"use client";

import { axios } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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
import useMount from "@/hooks/use-mount";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserBusinessSchema } from "@/lib/validation/admin/user";
import { School, X } from "lucide-react";
import SubmitButton from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { cityStateMapping } from "@/app/auth/sign-up-business/hall/state";
import { toast } from "sonner";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import Dropzone from "react-dropzone";
import { Upload } from "lucide-react";
import Image from "next/image";
import defaultBlog from "@/public/img/dashboard/service.png";
import FormData from "form-data";
import { Textarea } from "@/components/ui/textarea";

const UserProfile = () => {
  const cityName = [
    { id: 1, value: 1, name: "تهران" },
    { id: 2, value: 2, name: "گیلان" },
    { id: 3, value: 3, name: "آذربایجان شرقی" },
    { id: 4, value: 4, name: "خوزستان" },
    { id: 5, value: 5, name: "فارس" },
    { id: 6, value: 6, name: "اصفهان" },
    { id: 7, value: 7, name: "خراسان رضوی" },
    { id: 8, value: 8, name: "قزوین" },
    { id: 9, value: 9, name: "سمنان" },
    { id: 10, value: 10, name: "قم" },
    { id: 11, value: 11, name: "مرکزی" },
    { id: 12, value: 12, name: "زنجان" },
    { id: 13, value: 13, name: "مازندران" },
    { id: 14, value: 14, name: "گلستان" },
    { id: 15, value: 15, name: "اردبیل" },
    { id: 16, value: 16, name: "آذربایجان غربی" },
    { id: 17, value: 17, name: "همدان" },
    { id: 18, value: 18, name: "کردستان" },
    { id: 19, value: 19, name: "کرمانشاه" },
    { id: 20, value: 20, name: "لرستان" },
    { id: 21, value: 21, name: "بوشهر" },
    { id: 22, value: 22, name: "کرمان" },
    { id: 23, value: 23, name: "هرمزگان" },
    { id: 24, value: 24, name: "چهارمحال و بختیاری" },
    { id: 25, value: 25, name: "یزد" },
    { id: 26, value: 26, name: "سیستان و بلوچستان" },
    { id: 27, value: 27, name: "ایلام" },
    { id: 28, value: 28, name: "کهگلویه و بویراحمد" },
    { id: 29, value: 29, name: "خراسان شمالی" },
    { id: 30, value: 30, name: "خراسان جنوبی" },
    { id: 31, value: 31, name: "البرز" },
  ];


  const searchParams = useSearchParams();


  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(editUserBusinessSchema),
    defaultValues: {
      business_name: "",
      phone_1: "",
      phone_2: "",
      address: "",
      city: "",
      state: "",
      email: "",
      instagram: "",
      introduction: "",
      profile_photo: null,
      permit_photo: null,
      images: [],
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

  useEffect(() => {
    fetchCities();
  }, [searchParams]);

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/self");

      const photos = [];

      const businessPhotos = response?.data?.data?.business_info?.photos || {};
      Object.keys(businessPhotos).forEach((key) => {
        if (key.startsWith("photo_")) {
          photos.push({
            url: businessPhotos[key],
            key: key,
          });
        }
      });

      setData(response.data);

      let city =
        cityName.find(
          (city) => city.name === response.data?.data?.business_info?.city,
        )?.value || "";

      reset({
        name: response?.data?.data?.name,
        business_name: response.data?.data?.business_info?.business_name || "",
        phone_1: response.data?.data?.business_info?.phone_1 || "",
        phone_2: response.data?.data?.business_info?.phone_2 || "",
        address: response.data?.data?.business_info?.address || "",
        city: city,
        state: response.data?.data?.business_info?.state || "",
        email: response.data?.data?.business_info?.email || "",
        instagram: response.data?.data?.business_info?.instagram || "",
        introduction: response.data?.data?.business_info?.introduction || "",
        profile_photo: response.data?.data?.business_info?.profile_photo || "",
        images: photos,
      });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const [states, setStates] = useState([]);

  const selectedCity = form.watch("city");

  useEffect(() => {
    if (selectedCity && cityStateMapping[selectedCity]) {
      setStates(cityStateMapping[selectedCity]);
      const selectedCityName = cityName.find(
        (city) => city.value === Number(selectedCity),
      )?.name;
    } else {
      setStates([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    const selectedStateId = form.watch("state");
    const selectedStateName = states.find(
      (state) => state.id === Number(selectedStateId),
    )?.name;
  }, [form.watch("state"), states]);

  const onUpload = async (values) => {
    const formData = new FormData();
    const { images } = values;

    images?.forEach((img, index) => {
      if (img.file) {
        formData.append(`photo_${index}`, img.file);
      } else {
      }
    });

    for (var propName in values) {
      if (values[propName] === null || values[propName] === undefined) {
        delete values[propName];
      }
    }
    await axios
      .post("/api/studio/business-info/photos", formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(<ToastSuccess text={"  با موفقیت ثبت شد"} />);
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

    try {
      const response = await axios.post(
        "/api/studio/business-info/photos",
        formData,
      );

      if (response.status === 200) {
        toast.success(<ToastSuccess text={"با موفقیت ثبت شد"} />);
        reset();
      }
    } catch (error) {
      toast.error(
        <ToastError
          text={
            error?.response?.data?.message ||
            "خطای داخلی، لطفا دوباره تلاش کنید."
          }
        />,
      );
    }
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    for (var propName in values) {
      if (values[propName] === null || values[propName] === undefined) {
        delete values[propName];
      } else {
        formData.append(propName, values[propName]);
      }
    }

    for (var propName in values) {
      if (propName === "city") {
        formData.append(
          "city",
          cityName.find((city) => city.value === Number(values["city"]))?.name,
        );
      }
    }

    for (var propName in values) {
      if (propName === "profile_photo") {
        formData.append("profile_photo", values["profile_photo"].file);
      }
    }
    for (var propName in values) {
      if (propName === "permit_photo") {
        formData.append("permit_photo", values["permit_photo"].file);
      }
    }
    await axios
      .post("/api/studio/business-info", formData)
      .then((response) => {
        onUpload(values);
        if (response.status === 201) {
          toast.success(<ToastSuccess text={"  با موفقیت ثبت شد"} />);
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

  const onDropPermitPhoto = useCallback(
    (files) =>
      files.map((file) => {
        setValue(
          "permit_photo",
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
    [getValues("permit_photo")],
  );

  const onDropProfilePhoto = useCallback(
    (files) =>
      files.map((file) => {
        setValue(
          "profile_photo",
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
    [getValues("profile_photo")],
  );

  const onDropImages = useCallback(
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
          },
        );
      }),
    [setValue, getValues],
  );

  const deleteImage = async (key) => {
    try {
      const response = await axios.delete(
        `/api/studio/business-info/photos/${key}`,
      );
      if (response.status === 200) {
        setValue(
          "images",
          getValues("images").filter((img) => img.key !== key),
          { shouldValidate: true },
        );
        toast.success(<ToastSuccess text="عکس با موفقیت حذف شد" />);
      }
    } catch (error) {
      toast.error(<ToastError text="خطا در حذف عکس" />);
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg p-7 backdrop-blur-md"
        >
          <div className="my-9 flex items-center justify-center gap-2">
            <School stroke="#d8a977" className="size-7" />
            <h2 className="mt-2">اطلاعات آتلیه</h2>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={control}
              name="business_name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نام آتلیه</FormLabel>
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
              name="phone_1"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>شماره تماس اول</FormLabel>
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
              name="phone_2"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>شماره تماس دوم</FormLabel>
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
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>آدرس</FormLabel>
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>استان</FormLabel>
                  <FormControl>
                    <Controller
                      control={control}
                      name="city"
                      render={({ field }) => (
                        <Select
                          value={String(field.value)}
                          onValueChange={(value) => {
                            field.onChange(String(value));
                            const selectedCityName = cityName.find(
                              (city) => city.value === Number(value),
                            )?.name;
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue>
                              {cityName.find(
                                (city) => city.value === Number(field.value),
                              )?.name || "استان"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {cityName.map((city) => (
                              <SelectItem
                                value={String(city.value)}
                                key={city.id}
                              >
                                {city.name}
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
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شهر</FormLabel>
                  <FormControl>
                    <Controller
                      control={control}
                      name="state"
                      render={({ field }) => (
                        <Select
                          disabled={!selectedCity || states.length === 0}
                          value={String(field.value)}
                          onValueChange={(value) => {
                            field.onChange(String(value));
                            const selectedStateName = states.find(
                              (state) => state.id === Number(value),
                            )?.name;
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue>
                              {states.find(
                                (state) => state.name === String(field.value),
                              )?.name || "شهر"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem
                                value={String(state.name)}
                                key={state.id}
                              >
                                {state.name}
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
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>ایمیل</FormLabel>
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
              name="instagram"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>اینستاگرام</FormLabel>
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
              name="introduction"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>توضیحات</FormLabel>
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

            <div className="col-span-full mt-9">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="profile_photo"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>تصویر پروفایل</FormLabel>
                      <FormControl>
                        <Dropzone
                          maxSize={1024 * 1024 * 2}
                          maxFiles={1}
                          onDrop={onDropProfilePhoto}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="flex flex-col gap-3 px-4 md:px-10">
                              <div
                                {...getRootProps()}
                                className="mx-auto flex w-full cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                              >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center text-muted-foreground">
                                  <span>آپلود تصویر</span>
                                  <span className="mt-2 text-xs">
                                    برای انتخاب تصویر کلیک کنید و یا تصویر خود
                                    را داخل کادر بکشید (حداکثر با حجم ۲ مگابایت)
                                  </span>
                                  <Upload
                                    size={60}
                                    className="mt-2 text-primary"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center justify-center gap-3">
                                <Image
                                  src={
                                    getValues("profile_photo") &&
                                    getValues("profile_photo").file
                                      ? URL.createObjectURL(
                                          getValues("profile_photo").file,
                                        )
                                      : typeof getValues("profile_photo") ===
                                          "string"
                                        ? getValues("profile_photo")
                                        : defaultBlog
                                  }
                                  className="aspect-video w-full rounded-lg"
                                  width={240}
                                  height={160}
                                  alt="profile photo"
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

                <FormField
                  control={control}
                  name="images"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>گالری آتلیه</FormLabel>
                      <FormControl>
                        <Dropzone
                          maxSize={1024 * 1024 * 1}
                          maxFiles={10}
                          onDrop={onDropImages}
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
                                      src={
                                        img.file
                                          ? URL.createObjectURL(img.file)
                                          : img.url
                                      }
                                      className="aspect-video w-32 cursor-pointer rounded-lg"
                                      width={240}
                                      height={160}
                                      alt={`Business image ${index}`}
                                    />
                                    <div
                                      onClick={() => {
                                        deleteImage(img.key);
                                        setValue(
                                          "images",
                                          getValues("images").filter(
                                            (imgItem, imgIndex) =>
                                              imgIndex !== index,
                                          ),
                                          { shouldValidate: true },
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

export default UserProfile;
