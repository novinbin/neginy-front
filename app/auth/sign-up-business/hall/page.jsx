"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";
import { useUser } from "@/hooks/use-user";
import { Textarea } from "@/components/ui/textarea";
import bg from "@/public/img/auth/bg.png";
import MapComponent from "@/components/MapComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUpAllSchema } from "@/lib/validation/auth/sign-in-all";
import { useEffect, useState } from "react";
import { cityStateMapping } from "./state";

const Hall = () => {
  const userHook = useUser();

  const router = useRouter();

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

  const [selectedPosition, setSelectedPosition] = useState(null);

  const onPositionSelect = (position) => {
    setSelectedPosition(position);
  };

  const form = useForm({
    resolver: zodResolver(signUpAllSchema),
    defaultValues: {
      business_name: "",
      phone_1: "",
      phone_2: "",
      email: "",
      address: "",
      city: "",
      state: "",
      location: "",
      instagram: "",
      introduction: "",
    },
  });

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

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values) => {
    const {
      business_name,
      phone_1,
      phone_2,
      email,
      address,
      city,
      state,
      location: selectedPosition,
      instagram,
      introduction,
    } = values;



    const selectedCityName = cityName.find(
      (cityItem) => cityItem.value === Number(city),
    )?.name;

    const selectedStateName = states.find(
      (stateItem) => stateItem.id === Number(state),
    )?.name;

  
    const encodedFormData = querystring.stringify({
      business_name,
      phone_1,
      phone_2,
      email,
      address,
      city: selectedCityName, 
      state: selectedStateName, 
      location: selectedPosition
        ? `${selectedPosition.lat},${selectedPosition.lng}`
        : "",
      instagram,
      introduction,
    });


    await axios
      .post("/api/talar/business-info", encodedFormData)
      .then(async (response) => {
        if (response.status === 200) {
          await axios.get("/api/self").then((res) => {
            userHook.setUserData(res?.data);
            router.push("/");
            toast.success(
              <ToastSuccess text={defaultMessages.register.default} />,
            );
          });
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

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",

        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
      className="py-10"
    >
      <div className="mx-auto flex w-4/5 flex-col items-center justify-evenly rounded-xl bg-white bg-opacity-50 py-20 shadow-2xl">
        <h1 className="mb-12 text-center text-2xl font-bold">
          ورود اطلاعات تشریفات
        </h1>
        <Form {...form}>
          <div className="mx-auto w-4/5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-3 gap-y-2">
                <FormField
                  control={control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-4">
                      <FormLabel className="whitespace-nowrap">
                        نام تشریفات
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="حداقل ۳ کاراکتر"
                          className="focus-visible:ring-primary"
                          {...field}
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
                    <FormItem className="flex items-center justify-between gap-4">
                      <FormLabel className="whitespace-nowrap">ایمیل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ایمیل کسب و کار"
                          className="focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="phone_1"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-4">
                      <FormLabel className="whitespace-nowrap">
                        شماره تماس اول کسب و کار
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="شماره تماس اول کسب و کار"
                          className="focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="phone_2"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-4">
                      <FormLabel className="whitespace-nowrap">
                        شماره تماس دوم کسب و کار
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="شماره تماس دوم کسب و کار"
                          className="focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-4">
                      <FormLabel className="whitespace-nowrap">
                        اینستاگرام
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="اینستاگرام کسب و کار"
                          className="focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />
                <div></div>

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
                                    (city) =>
                                      city.value === Number(field.value),
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
                                    (state) =>
                                      state.name === String(field.value),
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
                  name="introduction"
                  render={({ field }) => (
                    <FormItem className="col-span-full flex items-center justify-between gap-4">
                      <FormLabel className="whitespace-nowrap">
                        توضیحات
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="توضیحات کسب و کار"
                          className="focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-full flex items-center justify-between gap-4">
                      <FormLabel className="whitespace-nowrap">آدرس</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=" آدرس کسب و کار"
                          className="focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 grid grid-cols-1">
                <FormField
                  control={control}
                  name="location"
                  className="col-span-7"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-4">
                      <FormLabel className="whitespace-nowrap">
                        موقعیت جغرافیایی
                      </FormLabel>
                      <FormControl>
                        <MapComponent onPositionSelect={onPositionSelect} />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />
                <div className="col-span-full flex w-full items-center justify-center">
                  <SubmitButton
                    className="!mt-5 w-28 bg-[#68807A]"
                    loading={isSubmitting}
                  >
                    تایید اطلاعات
                  </SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Hall;
