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

const FilterTable = ({ queryTitle }) => {
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
      [queryTitle]: values.role || null,
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  className="h-7 w-10 rounded-l-none pr-4 text-xs placeholder:text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:w-14 lg:w-20"
                >
                  <SelectTrigger className="h-7 w-10 rounded-l-none pr-4 text-xs placeholder:text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:w-14 lg:w-20">
                    <SelectValue placeholder="نقش" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">ادمین</SelectItem>
                    <SelectItem value="user">کاربر</SelectItem>
                    <SelectItem value="talar">تالار</SelectItem>
                    <SelectItem value="studio">آتلیه</SelectItem>
                    <SelectItem value="ceremony">تشریفات</SelectItem>
                    <SelectItem value="wedding_planer">ودینگ پلنر</SelectItem>
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

export default FilterTable;
