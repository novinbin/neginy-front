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
import ToastSuccess from "@/components/toast/toast-success";
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
import { subScriptionsSchema } from "@/lib/validation/admin/subscriptions";
import { useState } from "react";
import { SquarePlus, Trash2 } from "lucide-react";

const CreateForm = () => {
  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(subScriptionsSchema),
    defaultValues: {
      name: "",
      business_type: "",
      month_count: "",
      price: null,
      properties: [],
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const [features, setFeatures] = useState([""]);

  const onSubmit = async (values) => {
    const { name, business_type, month_count, price } = values;

    const propertiesArray = features.map((item) => item.trim()).filter(Boolean);

    if (propertiesArray.length === 0) {
      toast.error("لطفاً حداقل یک ویژگی وارد کنید.");
      return;
    }

    if (month_count === "0") {
      toast.error("ماه نمیتواند صفر باشد");
      return;
    }

    const encodedFormData = querystring.stringify({
      name,
      business_type,
      month_count,
      price,
      properties: JSON.stringify(propertiesArray),
    });

    await axios
      .post("/api/admin/subscriptions", encodedFormData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(
            <ToastSuccess text={"اشتراک جدید با موفقیت اضافه شد"} />,
          );
          reset();
          setFeatures([""]);
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

  const addFeatureInput = () => {
    setFeatures([...features, ""]);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const removeFeatureInput = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
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
              name="business_type"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نوع کسب و کار</FormLabel>
                  <FormControl>
                    <Controller
                      control={control}
                      name="business_type"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="نقش" />
                          </SelectTrigger>
                          <SelectContent>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="month_count"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>تعداد ماه ها</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="ماه"
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
                  <FormLabel>قیمت پکیج</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="قیمت پکیج"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="properties"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>ویژگی های پکیج</FormLabel>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Input
                          autoComplete="off"
                          placeholder="ویژگی"
                          {...field}
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeFeatureInput(index)}
                          className="mr-2 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-red-500 ring-offset-background"
                          aria-label="Remove feature"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeatureInput}
                      className="mr-2 flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm text-blue-500 ring-offset-background"
                      aria-label="Add feature"
                    >
                      <SquarePlus />
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <SubmitButton className="mt-3" loading={isSubmitting} type="submit">
              ارسال
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateForm;
