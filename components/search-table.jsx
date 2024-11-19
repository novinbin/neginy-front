"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { X } from "lucide-react";

const SearchTable = ({ queryTitle }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      q: searchParams.get(queryTitle) || "",
    },
  });

  const { setValue } = form;

  function onSubmit(values) {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      ["page"]: 1,
      [queryTitle]: values.q || null,
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
          <Button
            type="button"
            className="h-7 -translate-x-4 rounded-none bg-transparent px-0 text-muted-foreground hover:bg-transparent"
            onClick={() => {
              onSubmit({
                q: "",
              });
            }}
          >
            <X size={12} />
          </Button>
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem className="">
                <Input
                  placeholder="جستجو..."
                  {...field}
                  className="h-7 w-10 rounded-l-none pr-4 text-xs placeholder:text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:w-14 lg:w-20"
                />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-7 rounded-r-none bg-gray-200 px-2">
            <Search size={12} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchTable;
