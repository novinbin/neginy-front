"use client";

import Image from "next/image";
import flower from "@/public/img/package/flower.png";
import gold from "@/public/img/package/gold.png";
import arghavan from "@/public/img/package/arghavan.png";
import silver from "@/public/img/package/silver.png";
import { BadgeDollarSign, SquareCheckIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useMemo, useState } from "react";
import { axios } from "@/lib/axios";
import { persianPriceFormat } from "@/lib/persian-price-format";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUser } from "@/hooks/use-user";
import { routes } from "@/routes/routes";
import CommentDialog from "@/components/dialogs/comment-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPackageSchema } from "@/lib/validation/admin/package";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import { MultiSelect } from "@/components/multi-select";
import { Input } from "@/components/ui/input";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";

function Package() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageDiscount, setPackageDiscount] = useState("");
  const [packagePhoto, setPackagePhoto] = useState(null);
  const [packageFeatures, setPackageFeatures] = useState([]);

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/packages`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBuyClick = (d) => {
    if (user?.userData?.data?.role === "user") {
      setOpen(true);
      setPackageId(d?.id);
      setPackageFeatures(d?.features);
      setPackageName(d?.name);
      setPackagePrice(d?.price);
      setPackageDiscount(d?.discount);
      setPackagePhoto(d?.photo);
    } else {
      toast("لطفا اول وارد حساب کاربری خود شوید.", { type: "info" });
      router.push(routes.auth.signIn);
    }
  };

  const handleAccordionToggle = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const calculateDiscountPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price - (price * discount) / 100;
  };

  const mount = useMount();
  const [featuresData, setFeaturesData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [nameFeaturesData, setNameFeaturesData] = useState([]);
  const [selectedFeatureForm, setSelectedFeatureForm] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [frameworksList, setFrameworksList] = useState([
    { name: "", feature: "", description: "" },
  ]);

  const form = useForm({
    resolver: zodResolver(createPackageSchema),
    defaultValues: {
      features: [],
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

  const onSubmit = async (values) => {
    const { features } = values;
    if (featuresData.length === 0) {
      return toast.error(
        <ToastError text={"لطفا حداقل یک قابلیت را انتخاب کنید"} />,
      );
    }

    const formData = new FormData();
    formData.append("features", JSON.stringify(featuresData));

    const backend = process.env.NEXT_PUBLIC_API_URL;
    const front = process.env.NEXT_PUBLIC_FRONT_URL;
    const paymentUrl = `${backend}/user/payment/custom-package?url=${front}${routes.user.package.root}&features=${JSON.stringify(selectedFeatureForm)}`;
    router.push(paymentUrl);
  };

  useEffect(() => {
    fetchSiteFeatures();
  }, []);

  const fetchSiteFeatures = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/features`)
      .then((response) => {
        setFrameworksList(response?.data?.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFeatureSelection = (selectedFeatures) => {
    setSelectedFeatureForm(selectedFeatures);
    setFeaturesData(selectedFeatures);
    const totalPrice = selectedFeatures
      .map((feature) => frameworksList.find((item) => item.feature === feature))
      .filter((selectedFeature) => selectedFeature && selectedFeature.price)
      .reduce(
        (acc, selectedFeature) => acc + parseFloat(selectedFeature.price),
        0,
      );

    setTotalPrice(totalPrice);

    selectedFeatures.forEach((feature) => {
      const selectedFeature = frameworksList.find(
        (item) => item.feature === feature,
      );
      if (selectedFeature) {
      }
    });
  };

  useEffect(() => {
    setValue("price", totalPrice);
  }, [totalPrice, setValue]);

  if (!mount) {
    return null;
  }

  return (
    <div>
      <CommentDialog
        isOpen={open2}
        onClose={() => setOpen2(false)}
        title="افزودن"
      >
        <Form {...form}>
          <form action={onSubmit} className="rounded-lg p-7 backdrop-blur-md">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <FormField
                control={control}
                name="features"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormControl className="flex flex-col items-start justify-center gap-4">
                      <div className="w-full">
                        <FormLabel className="w-full text-lg font-semibold">
                          انتخاب قابلیت ها
                        </FormLabel>

                        <MultiSelect
                          options={frameworksList}
                          className="w-full"
                          onValueChange={handleFeatureSelection}
                          defaultValue={featuresData}
                          placeholder="انتخاب قابلیت ها"
                          variant="inverted"
                          animation={0}
                          maxCount={3}
                        />
                        <div className="mb-4 w-full">
                          <p className="mb-4 text-lg font-semibold">
                            قابلیت های انتخاب شده
                          </p>
                          <div className="flex w-full list-inside list-disc flex-wrap gap-7">
                            {featuresData.map((framework, index) => (
                              <div
                                key={index + 1}
                                className="flex flex-wrap gap-4"
                              >
                                <p key={framework}>
                                  <span>{index + 1}</span>
                                  {
                                    frameworksList.find(
                                      (o) => o.feature === framework,
                                    ).name
                                  }
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {totalPrice > 0 && (
                <div className="col-span-full flex w-full gap-2">
                  <BadgeDollarSign className="text-[#d4b694]" />
                  <p className="col-span-full w-full text-lg font-bold">
                    قیمت کل: {persianPriceFormat(totalPrice)} هزار تومان
                  </p>
                </div>
              )}
            </div>

            <div className="flex w-full items-center justify-center py-7">
              <SubmitButton
                loading={isSubmitting}
                className="mt-3 bg-[#BCC8BC] text-black hover:bg-black hover:text-[#bcc8bc]"
              >
                ورود به درگاه پرداخت
              </SubmitButton>
            </div>
          </form>
        </Form>
      </CommentDialog>
      <CommentDialog
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        title="خرید پکیج"
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col items-center justify-center">
            <Image
              alt="package"
              src={packagePhoto || "/img/sub.jpg"}
              width={480}
              height={360}
              className="h-36 w-36 rounded-full"
            />
          </div>
          <div>
            <p className="mb-3 text-xl font-bold">{packageName}</p>
            <ul className="mr-5 flex flex-col gap-4">
              {packageFeatures?.map((feature, index) => (
                <li key={String(index + feature)} className="list-disc">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-left">
              <p className="text-lg font-bold">
                {persianPriceFormat(
                  calculateDiscountPrice(+packagePrice, packageDiscount),
                )}
                <span className="px-1"> هزار تومان</span>
              </p>
            </div>
            <div className="flex w-full justify-end">
              <Button
                onClick={() => {
                  const backend = process.env.NEXT_PUBLIC_API_URL;
                  const front = process.env.NEXT_PUBLIC_FRONT_URL;
                  window.location.href = `${backend}/user/payment/package/${packageId}?url=${front}${routes.user.package.root}`;
                }}
              >
                ورود به درگاه پرداخت
              </Button>
            </div>
          </div>
        </div>
      </CommentDialog>
      <div>
        <div className="relative">
          <Image src={flower} alt="flower icon" className="w-56 rotate-180" />
          <Image
            src={flower}
            alt="flower icon"
            className="absolute left-0 w-56"
          />
          <h2 className="mb-32 text-center text-2xl font-semibold text-[#A6978E] max-lg:text-xl max-md:text-lg">
            پکیج مورد نظر خود را انتخاب کنید.
          </h2>
        </div>
        <div className="mx-auto max-lg:w-11/12 lg:w-4/5">
          <div className="grid grid-cols-1 gap-7 max-lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
            {data?.data?.map((d, index) => (
              <div
                className="rounded-lg bg-opacity-50 backdrop-blur-md lg:p-7"
                key={String(d.id + index + d.name)}
              >
                <div
                  className={`mt-9 ${
                    expandedItems[d.id] ? "h-auto" : "h-[575px]"
                  } transition-all duration-300`}
                >
                  <div className="relative flex h-full flex-col justify-start gap-9 rounded-xl border border-[#C9CBD1] px-5">
                    <div className="absolute -top-16 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full shadow-xl">
                      <Image
                        src={d?.photo || "/img/sub.jpg"}
                        alt={d?.name}
                        width={260}
                        height={140}
                        className="h-28 w-28 rounded-full"
                      />
                    </div>
                    {d?.discount ? (
                      <div className="mt-20 flex flex-col">
                        <p className="text-xl font-semibold max-lg:text-xl max-md:text-lg">
                          {persianPriceFormat(
                            calculateDiscountPrice(+d?.price, d?.discount),
                          )}
                          هزار تومان
                        </p>
                        <p className="text-base font-semibold text-red-500 line-through">
                          {persianPriceFormat(+d?.price)} هزار تومان
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="mt-20 text-2xl font-semibold max-lg:text-xl max-md:text-lg">
                          {persianPriceFormat(+d?.price)} هزار تومان
                        </p>
                        <br />
                      </div>
                    )}
                    <p className="text-xl text-[#373737] max-lg:text-lg max-md:text-base">
                      {d?.name}
                    </p>
                    <div className="border border-[#C9CBD1] px-6"></div>
                    <div className="">
                      <p className="mb-4 text-xl max-lg:text-lg max-md:text-base">
                        امکانات:
                      </p>
                      <div className="flex flex-col gap-4">
                        {d?.features.length > 2 ? (
                          <>
                            {d?.features.slice(0, 2).map((feature, index) => (
                              <div
                                className="flex items-center gap-4"
                                key={String(index + feature + index)}
                              >
                                <SquareCheckIcon className="size-5" />
                                <p>{feature}</p>
                              </div>
                            ))}
                            <Accordion
                              type="single"
                              collapsible
                              className="m-0 p-0"
                            >
                              <AccordionItem value="item-1" className="m-0 p-0">
                                <AccordionTrigger
                                  className="w-full text-blue-500"
                                  onClick={() => handleAccordionToggle(d.id)}
                                >
                                  مشاهده بیشتر
                                </AccordionTrigger>
                                <AccordionContent className="m-0 flex flex-col gap-3 p-0">
                                  {d?.features?.map((feature, index) => (
                                    <div
                                      className="m-0 flex items-center gap-4 p-0"
                                      key={String(index + index + feature)}
                                    >
                                      <SquareCheckIcon className="size-5" />
                                      <p>{feature}</p>
                                    </div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {d?.features?.map((feature, index) => (
                              <div
                                className="flex items-center gap-4"
                                key={String(index + feature + index + index)}
                              >
                                <SquareCheckIcon className="size-5" />
                                <p>{feature}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button
                        onClick={() => {
                          handleBuyClick(d);
                          setPackageId(d?.id);
                        }}
                        variant="outline"
                        className="my-4 w-full bg-[#A7988F] text-white"
                      >
                        خرید
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full items-center justify-center">
            {user?.userData?.data?.role === "user" ? (
              <Button
                onClick={() => setOpen2(true)}
                variant="outline"
                className="my-7 flex w-64 items-center justify-center gap-4 rounded-3xl bg-[#3E3A2E] text-white"
              >
                <ArrowRightIcon className="mt-1 text-[#A7988F]" />
                <p>ساخت پکیج شخصی سازی شده</p>
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    if (user?.userData?.data?.role === "user") {
                      setOpen2(true);
                    } else {
                      toast("لطفا اول وارد حساب کاربری خود شوید.", {
                        type: "info",
                      });
                      router.push(routes.auth.signIn);
                    }
                  }}
                  variant="outline"
                  className="my-7 flex w-64 items-center justify-center gap-4 rounded-3xl bg-[#3E3A2E] text-white"
                >
                  <ArrowRightIcon className="mt-1 text-[#A7988F]" />
                  <p>ساخت پکیج شخصی سازی شده</p>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Package;
