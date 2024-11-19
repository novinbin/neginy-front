"use client";
import {  useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ToastSuccess from "@/components/toast/toast-success";
import { Textarea } from "@/components/ui/textarea";
import { HomePageweddingPlannerSchema } from "@/lib/validation/admin/config";

function HomePageFormality() {
  const form = useForm({
    resolver: zodResolver(HomePageweddingPlannerSchema),
    defaultValues: {
      plannerDescription: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    try {
      let plannerDescriptionResponse = await submitDescription(
        values.plannerDescription,
      );

      if (plannerDescriptionResponse.status === 201) {
        toast.success(<ToastSuccess text={`متن شما با موفقیت تغییر کرد.`} />);
      }
      toast.success(<ToastSuccess text={`متن شما با موفقیت تغییر کرد.`} />);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      fetchData();
    }
  };

  const submitDescription = (plannerDescription) => {
    return axios.post("/api/admin/config/string", { plannerDescription });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/admin/config/plannerDescription`)
      .then((response) => {
        setValue("plannerDescription", response.data.data[0].value);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="my-9 text-center text-xl">
            افزودن عکس تجربه مراسمی رویایی
          </h2>
          <div className="max-md:grc grid-cols-21justify-center grid gap-4">
            <FormField
              control={control}
              name="plannerDescription"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>عنوان تجربه مراسمی رویایی</FormLabel>
                  <FormControl>
                    <Textarea autoComplete="off" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex w-full items-center justify-center">
            <SubmitButton className="mt-3 w-16" loading={isSubmitting}>
              افزودن
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default HomePageFormality;
