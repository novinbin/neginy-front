import SubmitButton from "@/components/submit-button";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useConfig } from "@/hooks/use-config";
import useMount from "@/hooks/use-mount";
import { axios } from "@/lib/axios";
import { defaultMessages } from "@/lib/default-messages";
import { gallerySchema } from "@/lib/validation/admin/gallery";
import { zodResolver } from "@hookform/resolvers/zod";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function EditGallery({ setOpen, gallery }) {
  const mount = useMount();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const useConfigRef = useConfig();

  const form = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      name: gallery?.name || "",
      month_count: String(gallery?.month_count) || "",
      price: String(gallery?.price) || "",
      description: gallery?.description ?? "",
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

  useEffect(() => {
    if (gallery) {
      reset({
        name: gallery.name,
        month_count: String(gallery.month_count),
        price: gallery.price,
        description: gallery.description ?? "",
      });
    }
  }, [gallery, reset]);

  const onSubmit = async (values) => {
    const { name, month_count, price, description } = values;

    const encodedFormData = queryString.stringify({
      name,
      month_count: String(month_count),
      price,
      description,
    });

    await axios
      .put(`/api/admin/gallery-subscriptions/${gallery.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <ToastSuccess text={"اشتراک گالری  با موفقیت ثبت شد."} />,
          );
          reset();
          useConfigRef.setRefreshFlag(!useConfigRef.refreshFlag);
          setOpen(false);
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
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admin/gallery-subscriptions`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!mount) {
    return null;
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>نام اشتراک</FormLabel>
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
              name="month_count"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>تعداد ماه ها</FormLabel>
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
          </div>
          <div className="flex w-full items-center justify-center">
            <SubmitButton className="mt-3" loading={isSubmitting}>
              ارسال
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EditGallery;
