"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutPanelLeft, SquarePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { editSubScriptionsSchema } from "@/lib/validation/admin/subscriptions";

const accessTypes = [
  { title: "مدیر", value: "admin" },
  { title: "تالار", value: "talar" },
  { title: "تشریفات", value: "ceremony" },
  { title: "آتلیه", value: "studio" },
  { title: "ودینگ پلنر", value: "wedding_planer" },
  { title: "کاربر", value: "user" },
];

const EditForm = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(
    data?.business_type === "admin"
      ? "مدیر"
      : data?.business_type === "talar"
        ? "تالار"
        : data?.business_type === "ceremony"
          ? "تشریفات"
          : data?.business_type === "studio"
            ? "آتلیه"
            : data?.business_type === "wedding_planer"
              ? "ودینگ پلنر"
              : "کاربر",
  );
  const [features, setFeatures] = useState(data?.properties || [""]);

  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(editSubScriptionsSchema),
    defaultValues: {
      name: data?.name,
      month_count: String(data?.month_count),
      price: data?.price,
      business_type: data?.business_type,
      properties: data?.properties?.join(", "), 
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const { name, business_type, month_count, price } = values;


    const propertiesArray = features.map((item) => item.trim()).filter(Boolean);
    if (propertiesArray.length === 0) {
      toast.error("لطفاً حداقل یک ویژگی وارد کنید.");
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
      .post(`/api/admin/subscriptions/${data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <ToastSuccess text={"اطلاعات اشتراک با موفقیت ویرایش شد"} />,
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
    <div className="w-full rounded-lg border border-white px-9 backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-9 flex items-center justify-center gap-2">
            <LayoutPanelLeft stroke="#d8a977" className="size-7" />
            <h2 className="mt-2">اطلاعات اشتراک</h2>
          </div>

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
              name="business_type"
              render={({ field }) => (
                <FormItem className="col-span-3 !w-full lg:col-span-1">
                  <FormLabel>نوع کسب و کار</FormLabel>
                  <FormControl>
                    <DropdownMenu dir="rtl" className="!w-full bg-white">
                      <DropdownMenuTrigger asChild className="!w-full bg-white">
                        <Button
                          disabled={loading}
                          variant="white"
                          className="flex !w-full justify-between gap-1 border-2 border-white text-xs"
                        >
                          {loading ? (
                            <LoaderIcon
                              className="animate-spin text-primary"
                              size={15}
                              strokeWidth={1.5}
                            />
                          ) : (
                            <>
                              {role}
                              <ChevronDown
                                size={15}
                                className="text-primary"
                                strokeWidth={1.5}
                              />
                            </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="flex !w-96 flex-col gap-1">
                        {accessTypes.map((item) => (
                          <DropdownMenuItem
                            key={item.title}
                            className={cn(
                              "!w-full cursor-pointer rounded-3xl",
                              role === item.title && "bg-primary/70",
                            )}
                            onClick={() => {
                              setRole(item.title);
                              field.onChange(item.value);
                            }}
                          >
                            {item.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage className="text-primary" />
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
                      className="flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm text-blue-500 ring-offset-background"
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
          <div className="flex w-full items-center justify-center py-7">
            <SubmitButton
              className="mt-3 bg-[#BCC8BC] text-black"
              loading={isSubmitting}
              type="submit"
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
