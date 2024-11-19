"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { userSchema } from "@/lib/validation/admin/user";
import ToastSuccess from "@/components/toast/toast-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cityStateMapping } from "@/app/auth/sign-up-business/hall/state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const CreateForm = () => {
  const mount = useMount();

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

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      state: "",
      city: "",
      national_code: "",
      shaba_number: "",
      password: "",
      password_confirmation: "",
      role: "",
    },
    mode: "onSubmit",
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
    reset,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const {
      name,
      phone,
      email,
      state,
      city,
      national_code,
      shaba_number,
      password,
      password_confirmation,
      role,
    } = values;

    const selectedCityName = cityName.find(
      (cityItem) => cityItem.value === Number(city),
    )?.name;

    const selectedStateName = states.find(
      (stateItem) => stateItem.id === Number(state),
    )?.name;

    const encodedFormData = querystring.stringify({
      name,
      phone,
      email,
      state: selectedStateName,
      city: selectedCityName,
      national_code,
      shaba_number,
      password,
      password_confirmation,
      role,
    });

    await axios
      .post("/api/ceremony/users", encodedFormData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(
            <ToastSuccess text={"کاربر جدید با موفقیت اضافه شد"} />,
          );
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

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نام و نام خانوادگی</FormLabel>
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
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="۰۹"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      placeholder="info@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="role"
              className="col-span-3 lg:col-span-1"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نوع کسب و کار</FormLabel>
                  <FormControl>
                    <Controller
                      control={control}
                      name="role"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="نقش" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">ادمین</SelectItem>
                            <SelectItem value="user">کاربر</SelectItem>
                            <SelectItem value="talar">تالار</SelectItem>
                            <SelectItem value="studio">آتلیه</SelectItem>
                            <SelectItem value="ceremony">تشریفات</SelectItem>
                            <SelectItem value="wedding_planer">
                              ودینگ پلنر
                            </SelectItem>
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
              name="city"
              className="col-span-3 lg:col-span-1"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
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
                                (state) => state.id === Number(field.value),
                              )?.name || "شهر"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem
                                value={String(state.id)}
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
              name="national_code"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>کد ملی</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="۱۰ رقم"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="shaba_number"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>شماره شبا</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="IRشماره شبا"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>رمز ورود</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="حداقل ۸ کاراکتر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>تکرار رمز ورود</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="حداقل ۸ کاراکتر"
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
  );
};

export default CreateForm;
