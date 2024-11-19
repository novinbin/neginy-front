"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/submit-button";
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
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

const SearchForm = ({ searchData, setSearchData }) => {
  const mount = useMount();

  const form = useForm({
    defaultValues: {
      limit: searchData?.limit || "10",
      offset: searchData?.offset || "0",
      orderBy: searchData?.orderBy || "Date",
      fromDate: searchData?.fromDate || "",
      toDate: searchData?.toDate || "",
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
    setSearchData(values);
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
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تعداد</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="75">75</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="orderBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مرتب سازی</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Date">تاریخ</SelectItem>
                      <SelectItem value="Number">شماره فاکتور</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="offset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>offset</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="عدد وارد کنید"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="fromDate"
              render={({ field }) => (
                <FormItem className="col-span-3 mt-1.5 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel className="text-xs">از</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={getValues("fromDate")}
                      onChange={(date) => {
                        date?.isValid
                          ? setValue("fromDate", new Date(date).toISOString())
                          : "";
                      }}
                      format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      style={{
                        width: "100%",
                        paddingTop: "19px",
                        paddingBottom: "19px",
                        borderColor: "rgb(226 232 240)",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="toDate"
              render={({ field }) => (
                <FormItem className="col-span-3 mt-1.5 flex flex-1 flex-col gap-1 text-right lg:col-span-1">
                  <FormLabel className="text-xs">تا</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={getValues("toDate")}
                      onChange={(date) => {
                        date?.isValid
                          ? setValue("toDate", new Date(date).toISOString())
                          : "";
                      }}
                      format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      style={{
                        width: "100%",
                        paddingTop: "19px",
                        paddingBottom: "19px",
                        borderColor: "rgb(226 232 240)",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SubmitButton className="my-2" loading={isSubmitting}>
            جستجو
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default SearchForm;
