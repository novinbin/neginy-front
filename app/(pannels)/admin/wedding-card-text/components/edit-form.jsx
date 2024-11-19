"use client";


import useMount from "@/hooks/use-mount";
import {  useForm } from "react-hook-form";
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
import { User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { editWeddingTextSchema } from "@/lib/validation/admin/wedding-text";

const EditForm = ({ data }) => {


  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(editWeddingTextSchema),
    defaultValues: {
      text: data?.data?.text,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const encodedFormData = querystring.stringify({
      ...values,
    });

    await axios
      .put(`/api/admin/card-texts/${data.data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <ToastSuccess text={"متن کارت با موفقیت ویرایش شد"} />,
          );
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
    <div className="w-full rounded-lg border border-white px-9 backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="my-9 flex items-center justify-center gap-2">
            <User stroke="#d8a977" className="size-7" />
            <h2 className="mt-2">ویرایش متن کارت عروسی</h2>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
            <FormField
              control={control}
              name="text"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>متن کارت عروسی</FormLabel>
                  <FormControl>
                    <Textarea
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      {...field}
                       rows="20"
                    />
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
              ویرایش
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
