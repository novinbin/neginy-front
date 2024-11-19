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
import { servicesSchema } from "@/lib/validation/admin/services";

const CreateForm = () => {
  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      name: "",
      business_type: "",
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
    const { name, business_type } = values;

    const encodedFormData = querystring.stringify({
      name,
      business_type,
    });

    await axios
      .post("/api/admin/services", encodedFormData)
      .then((response) => {
        if (response.status === 201) {
          toast.success(
            <ToastSuccess text={"سرویس جدید با موفقیت اضافه شد"} />,
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
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>سرویس</FormLabel>
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
              className="col-span-3 lg:col-span-1"
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
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 flex w-full items-center justify-center">
            <SubmitButton className="mt-3" loading={isSubmitting}>
              ارسال
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateForm;
