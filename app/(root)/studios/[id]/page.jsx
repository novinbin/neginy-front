"use client";

import Image from "next/image";
import detail from "@/public/img/WeddingHall/detail.png";
import a from "@/public/img/WeddingHall/a.webp";
import b from "@/public/img/WeddingHall/1.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { axios } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ToastError from "@/components/toast/toast-error";
import { Instagram, Map, MapPin, Phone, Star } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import ToastSuccess from "@/components/toast/toast-success";
import useMount from "@/hooks/use-mount";
import { useUser } from "@/hooks/use-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCommentSchema } from "@/lib/validation/user/date";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea";

function Detail({ params }) {
  const mount = useMount();
  const [data, setData] = useState({});
  const [dataComment, setDataComment] = useState([]);

  const [dataTable, setDataTable] = useState({});
  const [hoveredRating, setHoveredRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();

  useEffect(() => {
    fetchDefaultData();
    fetchCommentData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/business/${params.id}`)
      .then((response) => {
        setData(response?.data);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchCommentData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/business/${params.id}/comments`)
      .then((response) => {
        setDataComment(response?.data);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function clickToast() {
    toast.success(<ToastSuccess text={`سرویس مدنظر خود را انتخاب کنید.`} />);
  }

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/business/${params.id}/services`)
      .then((response) => {
        setDataTable(response?.data?.data);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const form = useForm({
    resolver: zodResolver(userCommentSchema),
    defaultValues: {
      rating: null,
      description: "",
    },
    mode: "onSubmit",
  });

  const userRating = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { description, rating } = values;

    try {
      const response = await axios.post(
        `/api/user/business/${params.id}/comment`,
        {
          description,
          rating,
        },
      );

      if (response.status === 201) {
        toast.success(<ToastSuccess text={"با موفقیت ثبت شد"} />);
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

  if (!mount) {
    return null;
  }

  return (
    <div className="bg-[#F5F2EE]">
      <div className="mx-auto w-4/5 py-20">
        <div className="grid grid-cols-2 items-center justify-center gap-4 max-md:grid-cols-1">
          <div>
            <div className="flex w-full items-center justify-center">
              <div className="relative">
                <Image
                  src={detail}
                  width={540}
                  height={480}
                  alt="img"
                  className=""
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src={data?.data?.profile_photo}
                    width={540}
                    height={480}
                    alt="alt"
                    className="h-[17rem] w-[17rem] rounded-full max-md:h-[12rem] max-md:w-[12rem]"
                  />
                </div>
              </div>
            </div>
            <Carousel dir="ltr" className="mb-7">
              <CarouselContent>
                {Object.values(data?.data?.photos || {}).map((img, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Image
                      src={img}
                      alt={`photo-${index}`}
                      width={540}
                      height={480}
                      className="h-32 w-32 rounded-xl"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-2xl">تالار {data?.data?.business_name}</h1>
            <div className="flex flex-col gap-3">
              <p className="text-justify leading-9">
                {data?.data?.introduction}
              </p>
            </div>
            <div className="flex w-full justify-end">
              <a
                href="#our-services"
                className="w-32 rounded-2xl bg-gold py-2 text-center text-lg text-white"
                onClick={() => clickToast()}
              >
                انتخاب سرویس
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <MapPin />
              <h2>{data?.data?.address}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Instagram />
                <h2>{data?.data?.instagram}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Phone />
                <h2>{data?.data?.phone_1}</h2>
              </div>
            </div>
          </div>

          <div className="mt-20" id="our-services">
            <h2 className="mb-4 text-center text-xl font-bold">خدمات ما</h2>
            <div>
              <DataTable columns={columns} data={dataTable} />
            </div>
          </div>
        </div>
        {user?.userData?.data?.role === "user" && (
          <div className="mt-20 rounded-lg border border-slate-500 bg-white bg-opacity-50 px-4 py-7 backdrop-blur-md">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-1 gap-7">
                  <FormField
                    control={control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel className="text-lg font-bold">
                          امتیاز
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            {userRating?.map((rate) => (
                              <div
                                key={rate.id}
                                onMouseEnter={() =>
                                  setHoveredRating(rate.value)
                                }
                                onMouseLeave={() => setHoveredRating(null)}
                                onClick={() => {
                                  setSelectedRating(rate.value);
                                  field.onChange(rate.value);
                                }}
                                className="cursor-pointer"
                              >
                                <Star
                                  fill={
                                    hoveredRating >= rate.value ||
                                    selectedRating >= rate.value
                                      ? "#d4b694"
                                      : "none"
                                  }
                                  stroke="#d4b694"
                                />
                              </div>
                            ))}
                          </div>
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
                        <FormLabel className="text-lg font-bold">
                          توضیح نظرات
                        </FormLabel>
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
                </div>

                <SubmitButton className="mt-3" loading={isSubmitting}>
                  ارسال
                </SubmitButton>
              </form>
            </Form>
          </div>
        )}

        {dataComment?.data?.length > 0 && (
          <div className="mt-9 rounded-lg bg-white bg-opacity-50 p-4 shadow-md backdrop-blur-md">
            {dataComment?.data?.map((comment, index) => (
              <div
                key={index}
                className="my-9 rounded-md border border-[#999] p-7 shadow-md"
              >
                <div key={index} className="flex items-center gap-4">
                  <p className="text-xl">good luck</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        fill={starIndex < comment.rating ? "#d4b694" : "none"}
                        stroke="#d4b694"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 px-4 leading-8">{comment.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
