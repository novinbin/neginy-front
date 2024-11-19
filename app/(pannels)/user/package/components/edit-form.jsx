"use client";

import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditForm = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState([]);


  const form = useForm({
    defaultValues: {
      name: data?.data?.name,
      price: data?.data?.price,
      description: data?.data?.description,
      feature: data?.data?.feature,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { name, price, description, feature } = values;

    const encodedFormData = querystring.stringify({
      name,
      price,
      description,
      feature,
    });

    await axios
      .put(`/api/admin/features/${data.data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(<ToastSuccess text={"با موفقیت ثبت شد."} />);
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

  useEffect(() => {
    fetchSiteFeatures();
  }, []);

  const fetchSiteFeatures = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admin/site-features`)
      .then((response) => {
        setFeatures(response?.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full rounded-lg border border-white px-9 backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-7">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>عنوان</FormLabel>
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
              name="feature"
              className=""
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>نوع کسب و کار</FormLabel>
                  <FormControl>
                    <Controller
                      control={control}
                      name="feature"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={data?.data?.feature}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="ویژگی" />
                          </SelectTrigger>
                          <SelectContent>
                            {features?.map((d) => (
                              <SelectItem value={d} key={d.id}>
                                {d}
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
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-full">
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
          </div>

          <SubmitButton className="mt-3" loading={isSubmitting}>
            ارسال
          </SubmitButton>
        </form>
      </Form>

      {data?.data?.business_info && (
        <div className="mb-9 flex w-full items-center justify-center">
          <Link
            href={routes.admin.users.editBusiness(data.data.id)}
            className="mt-3 rounded-lg bg-[#BCC8BC] px-3 py-2 text-black hover:bg-black hover:text-[#bcc8bc]"
          >
            ویرایش اطلاعات کسب و کار
          </Link>
        </div>
      )}
    </div>
  );
};

export default EditForm;
