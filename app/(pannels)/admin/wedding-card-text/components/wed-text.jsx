"use client";
import { Eye, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "@/components/dialogs/delete-dialog";
import ToastError from "@/components/toast/toast-error";
import { toast } from "sonner";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import { axios } from "@/lib/axios";
import { useConfig } from "@/hooks/use-config";
import { routes } from "@/routes/routes";

function WedText({ data }) {
  const [open, setOpen] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const configHook = useConfig();

  const onDelete = async () => {
    try {
      setLoading2(true);
      const response = await axios.delete(
        `/api/admin/card-texts/${selectedId}`,
      );

      if (response.status === 204) {
        toast.success(<ToastSuccess text={"آیتم مورد نظر با موفقیت حذف شد"} />);
        configHook.setRefreshFlag(!configHook.refreshFlag);
      }
    } catch (error) {
      toast.error(
        <ToastError
          text={
            error?.response?.data?.message ||
            defaultMessages.errors.internalError
          }
        />,
      );
    } finally {
      setLoading2(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <DeleteModal
        isOpen={open}
        loading={loading2}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        title="حذف آیتم"
        description="از حذف آیتم مورد نظر مطمئن هستید؟ این اقدام قابل برگشت نمیباشد"
      />
      <div className="grid w-full items-center justify-center gap-9 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {data?.map((text) => (
          <div
            key={text.id}
            className="w-full rounded-xl bg-opacity-50 backdrop-blur-md"
          >
            <div className="relative flex h-[3rem] items-center justify-center gap-7 rounded-t-2xl bg-[#E7D7CA] bg-opacity-70 backdrop-blur-md">
              <div className="grid grid-cols-2 items-center justify-between gap-4">
                <Link
                  href={routes.admin.weddingCardText.edit(text.id)}
                  className="flex items-center justify-center gap-2"
                >
                  <Pen className="size-4" />
                  <p>ویرایش</p>
                </Link>
                <div
                  onClick={() => {
                    setOpen(true);
                    setSelectedId(text.id);
                  }}
                  className="flex cursor-pointer items-center justify-center gap-2"
                >
                  <Trash2 className="size-4" stroke="red" />
                  <p>حذف</p>
                </div>
              </div>
            </div>
            <div className="flex h-[12rem] w-72 items-center justify-center px-4 py-4">
              <p className="!break-all">{text.text.slice(0, 175)}</p>
            </div>
            <div className="flex h-[3rem] w-full items-center justify-between rounded-b-2xl bg-[#DFE3DF] px-4">
              <span>ادمین سازنده : </span>
              <span>{text.admin.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WedText;
