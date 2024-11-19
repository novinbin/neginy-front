import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const FilterApprove = ({ queryTitle }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      role: searchParams.get(queryTitle) || "",
    },
  });

  const { setValue } = form;

  function onSubmit(values) {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      ["page"]: 1,
      [queryTitle]: values.approved || null,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  }

  return (
    <div className="mx-auto mb-3 flex items-center justify-between">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <FormField
            control={form.control}
            name="approved"
            render={({ field }) => (
              <FormItem>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  className="h-7 w-10 rounded-l-none pr-4 text-xs placeholder:text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:w-14 lg:w-20"
                >
                  <SelectTrigger className="h-7 w-10 rounded-l-none pr-4 text-xs placeholder:text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:w-14 lg:w-20">
                    <SelectValue placeholder="وضعیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">تایید شده</SelectItem>
                    <SelectItem value="0">تایید نشده</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="h-7 rounded-r-none bg-gray-200 px-2">
            فیلتر
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FilterApprove;
