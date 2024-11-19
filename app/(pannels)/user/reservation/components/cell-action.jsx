"use client";

import { axios } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { defaultMessages } from "@/lib/default-messages";
import HallDetailsModal from "@/components/dialogs/hall-details";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDateSchema } from "@/lib/validation/user/date";
import queryString from "query-string";

const CellAction = ({ data }) => {
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);


  const form = useForm({
    resolver: zodResolver(userDateSchema),
    defaultValues: {
      user_description: "",
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
    const { user_description } = values;

    const encodedFormData = queryString.stringify({
      user_description,
    });

    await axios
      .post(
        `/api/user/reservations/${data.id}/add-description`,
        encodedFormData,
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <ToastSuccess text={"توضیحات شما با موفقیت ثبت شد."} />,
          );
          reset();
          setOpen2(false);
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
    <div className="flex flex-col items-center justify-center gap-1">
      <HallDetailsModal
        isOpen={open2}
        loading={loading2}
        onClose={() => setOpen2(false)}
        title="توضیحات"
      >
        <p
          dangerouslySetInnerHTML={{
            __html: data.user_description,
          }}
        />
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={control}
                name="user_description"
                render={({ field }) => (
                  <FormItem className="col-span-3 mt-4">
                    <FormLabel>توضیحات جدید</FormLabel>
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
      </HallDetailsModal>

      <Link
        href={routes.user.reservation.details(data.id)}
        className="cursor-pointer rounded-md p-1 transition-all duration-200 hover:bg-muted"
        onClick={() => {
          setOpen(true);
        }}
      >
        جزئیات درخواست
      </Link>
      <div
        className="cursor-pointer rounded-md p-1 transition-all duration-200 hover:bg-muted"
        onClick={() => {
          setOpen2(true);
        }}
      >
        افزودن توضیحات جدید
      </div>
    </div>
  );
};

export default CellAction;
