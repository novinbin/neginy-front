"use client";

import { Input } from "./input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SearchableSelect from "./searchable-select";

const ChipSearchableSelect = ({
  initialData,
  onChange,
  placeholder,
  searchable,
  api,
  query,
  keyValue,
}) => {
  const [data, setData] = useState(initialData);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-2",
        data && data.length === 0 && "gap-0",
      )}
    >
      <div className="flex flex-wrap gap-2">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="flex w-fit items-center gap-1 rounded-sm bg-muted px-2 py-1"
            >
              <span className="text-sm text-muted-foreground">
                {item.name || item.title || item.value || item}
              </span>
              <X
                size={13}
                className="cursor-pointer text-muted-foreground"
                onClick={() => {
                  const newValue = data.filter(
                    (filterItem) => item !== filterItem,
                  );
                  onChange(newValue);
                  setData(newValue);
                }}
              />
            </div>
          ))}
      </div>
      <div className="flex gap-2">
        <SearchableSelect
          changeValue={(value) => {
            const findIndex = data?.findIndex((item) => item === value);
            if (findIndex === -1 && value) {
              const newData = [...data, value];
              setData(newData);
              onChange(newData);
            }
          }}
          api={api}
          query={query}
          placeholder={"جستجو"}
          keyValue={keyValue}
          searchable={searchable}
        />
      </div>
    </div>
  );
};

export default ChipSearchableSelect;
