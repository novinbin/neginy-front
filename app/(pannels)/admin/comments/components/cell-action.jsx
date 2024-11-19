"use client";

import { axios } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import Link from "next/link";
import { routes } from "@/routes/routes";
import DeleteModal from "@/components/dialogs/delete-dialog";
import { useConfig } from "@/hooks/use-config";
import { defaultMessages } from "@/lib/default-messages";

const CellAction = ({ data }) => {
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false);

  const configHook = useConfig();

  const onDelete = async () => {
    try {
      setLoading2(true);

      const response = await axios.delete(`/api/admin/users/${data.id}`);

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
    <div className="flex items-center justify-center gap-1">
      <DeleteModal
        isOpen={open}
        loading={loading2}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        title="حذف آیتم"
        description="از حذف آیتم مورد نظر مطمئن هستید؟ این اقدام قابل برگشت نمیباشد"
      />

      <Link href={routes.admin.comments.details(data.id)}>
        <div className="cursor-pointer rounded-md p-1 transition-all duration-200 hover:bg-muted">
          <Eye size={18} strokeWidth={1.5} className="text-blue-500" />
        </div>
      </Link>
    </div>
  );
};

export default CellAction;
