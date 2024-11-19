"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { Controller, useForm } from "react-hook-form";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { axios } from "@/lib/axios";
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
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import DataTableHeader from "@/components/data-table-header";
import { Button } from "@/components/ui/button";
import CommentDialog from "@/components/dialogs/comment-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useConfig } from "@/hooks/use-config";

const Details = () => {
  const mount = useMount();
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      feature: "",
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
    try {
      const response = await axios.post("/api/admin/features", values);

      if (response.status === 201) {
        toast.success(
          <ToastSuccess text={"قابلیت جدید با موفقیت اضافه شد."} />,
        );
        reset();
        setOpen(false);
        fetchFeatures();
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
    fetchFeatures();
  }, [useConfig().refreshFlag]);
  useEffect(() => {
    fetchSiteFeatures();
  }, [useConfig().refreshFlag]);

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

  const fetchFeatures = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/admin/features`);
      setData(response?.data?.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="w-full">
      <CommentDialog
        isOpen={open}
        loading={loading2}
        onClose={() => setOpen(false)}
        title="افزودن"
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-1 gap-2">
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
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
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
              <FormField
                control={control}
                name="feature"
                className="col-span-full !w-full"
                render={({ field }) => (
                  <FormItem className="col-span-full !w-full">
                    <FormLabel>نوع کسب و کار</FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="feature"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange}>
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
            </div>

            <SubmitButton className="mt-3" loading={isSubmitting}>
              ارسال
            </SubmitButton>
          </form>
        </Form>
      </CommentDialog>
      <DataTableHeader title="قابلیت ها">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-[#A7988F] px-4 py-2 text-white"
        >
          تعریف قابلیت
        </Button>
      </DataTableHeader>
      {isLoading ? "loading..." : <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default Details;
