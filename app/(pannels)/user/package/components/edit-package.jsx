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
import Dropzone from "react-dropzone";
import { MultiSelect } from "@/components/multi-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Package, Upload } from "lucide-react";
import Image from "next/image";
import { createPackageSchema } from "@/lib/validation/admin/package";
import { persianPriceFormat } from "@/lib/persian-price-format";

const EditPackage = ({ data }) => {
  const mount = useMount();
  const [featuresData, setFeaturesData] = useState(data?.data?.features || []);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [frameworksList, setFrameworksList] = useState([
    { name: "", feature: "", description: "" },
  ]);

  const form = useForm({
    resolver: zodResolver(createPackageSchema),
    defaultValues: {
      name: data?.data?.name || "",
      price: data?.data?.price || 0,
      discount: data?.data?.discount || 0,
      photo: data?.data?.photo || null,
      features: data?.data?.features || [],
    },

    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    setValue,
    formState: { isSubmitting },
    reset,
  } = form;

  const price = watch("price");
  const discount = watch("discount");

  const discountedPrice = useMemo(() => {
    const priceValue = parseFloat(price) || 0;
    const discountValue = parseFloat(discount) || 0;
    if (discountValue > 0 && discountValue <= 100) {
      return priceValue * (1 - discountValue / 100);
    }
    return priceValue;
  }, [price, discount]);

  const onSubmit = async (values) => {
    const { name, price, features, photo, discount } = values;

    if (featuresData.length === 0) {
      return toast.error(
        <ToastError text={"لطفا حداقل یک قابلیت را انتخاب کنید"} />,
      );
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", String(price));
    formData.append("discount", discount != null ? discount : "");
    formData.append("features", JSON.stringify(featuresData));

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.post("/api/admin/packages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success(<ToastSuccess text={"با موفقیت ثبت شد."} />);
        reset();
      }
    } catch (error) {
      toast.error(
        <ToastError
          text={
            error?.response?.data?.message ||
            defaultMessages.errors.internalError
          }
        />,
      );
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        price: data.data.price,
        discount: data.data.discount,
        photo: data.data.photo,
        features: data.data.features,
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (totalPrice > 0) {
      setValue("price", totalPrice);
    }
  }, [totalPrice, setValue]);

  const onDrop = useCallback(
    (files) => {
      setValue("photo", files[0], { shouldValidate: true });
    },
    [setValue],
  );

  useEffect(() => {
    fetchSiteFeatures();
  }, []);

  const fetchSiteFeatures = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admin/features`)
      .then((response) => {
        setFrameworksList(response?.data?.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const initializeFeaturesData = () => {
      if (data?.data?.features && frameworksList.length > 0) {
        const initialFeatures = data.data.features
          .map((description) => {
            const match = frameworksList.find(
              (item) => item.description === description,
            );
            return match ? match.feature : null;
          })
          .filter(Boolean);
        setFeaturesData(initialFeatures);
      }
    };

    initializeFeaturesData();
  }, [data, frameworksList]);

  useEffect(() => {
    setValue("price", totalPrice);
  }, [totalPrice, setValue]);

  const handleFeatureSelection = (selectedFeatures) => {
    setFeaturesData(selectedFeatures);

    const totalPrice = selectedFeatures
      .map((feature) => frameworksList.find((item) => item.feature === feature))
      .filter((selectedFeature) => selectedFeature && selectedFeature.price)
      .reduce(
        (acc, selectedFeature) => acc + parseFloat(selectedFeature.price),
        0,
      );

    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    setValue("price", totalPrice);
  }, [totalPrice, setValue]);

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg p-7 backdrop-blur-md"
        >
          <div className="my-9 flex items-center justify-center gap-2">
            <Package stroke="#d8a977" className="size-7" />
            <h2 className="mt-2">ویرایش پکیج</h2>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <FormField
              control={control}
              name="features"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormControl className="flex flex-col items-start justify-center gap-4">
                    <div className="w-full">
                      <FormLabel>انتخاب قابلیت‌ها</FormLabel>
                      <MultiSelect
                        options={frameworksList}
                        onValueChange={(value) => {
                          handleFeatureSelection(value);
                          field.onChange(value);
                        }}
                        defaultValue={featuresData}
                        placeholder="انتخاب قابلیت‌ها"
                        variant="inverted"
                        animation={0}
                        maxCount={3}
                      />
                      <div className="mb-4">
                        <ul className="flex list-inside list-disc flex-wrap gap-7">
                          {featuresData.map((feature) => (
                            <li key={feature}>
                              {
                                frameworksList.find(
                                  (o) => o.feature === feature,
                                )?.name
                              }
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نام پکیج</FormLabel>
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
              name="price"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>قیمت</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="discount"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>درصد تخفیف</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="حداقل  ۱  کاراکتر"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                    />
                  </FormControl>
                  {discount && (
                    <div className="mt-3 flex items-center gap-4">
                      <p>
                        قیمت با تخفیف :
                        <span>{persianPriceFormat(discountedPrice)}</span>
                      </p>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="photo"
              render={({ field }) => (
                <FormItem className="col-span-full mt-5">
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
                            {getValues("photo") instanceof File && (
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

                            {data.data.photo && (
                              <div>
                                <span>عکس فعلی</span>
                                <Image
                                  src={data.data.photo}
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

          <div className="flex w-full items-center justify-center py-7">
            <SubmitButton
              className="mt-3 bg-[#BCC8BC] text-black hover:bg-black hover:text-[#bcc8bc]"
              loading={isSubmitting}
            >
              ثبت
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditPackage;
