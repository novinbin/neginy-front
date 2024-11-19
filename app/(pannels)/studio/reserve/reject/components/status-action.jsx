"use client";

import { axios } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";

const accessTypes = [
  {
    title: "تایید شده",
    value: 1,
  },
  {
    title: "تایید نشده",
    value: 0,
  },
];

const StatusAction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    data?.approved === false ? "تایید نشده" : "تایید شده",
  );

  const changeAccess = async (accessName, accessValue) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `/api/studio/comments/${data.id}/approve`,
        {
          approved: accessValue,
        },
      );

      if (response.status === 200) {
        toast.success(<ToastSuccess text={"نظر با موفقیت تایید شد"} />);
        setStatus(accessName);
      }
    } catch (error) {
      toast.error(
        <ToastError text={error?.response?.data?.message || "خطایی رخ داد"} />,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {data && (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              disabled={loading}
              variant="ghost"
              className="flex h-7 gap-1 rounded-xl border-2 border-primary px-4 text-xs"
            >
              {loading ? (
                <LoaderIcon
                  className="animate-spin text-primary"
                  size={15}
                  strokeWidth={1.5}
                />
              ) : (
                <>
                  <p
                    className={`${
                      status === "تایید شده" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {status}
                  </p>

                  <ChevronDown
                    size={15}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-1">
            {accessTypes.map((item) => (
              <DropdownMenuItem
                onClick={() => changeAccess(item.title, item.value)}
                key={item.title}
                className={cn(
                  "cursor-pointer rounded-3xl",
                  status === item.title && "bg-primary/70",
                )}
              >
                {item.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default StatusAction;
