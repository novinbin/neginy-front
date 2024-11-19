"use client";

import { axios } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

import { Eye, Edit, Trash2 } from "lucide-react";

import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import Link from "next/link";
import { routes } from "@/routes/routes";
import DeleteModal from "@/components/dialogs/delete-dialog";
import { useConfig } from "@/hooks/use-config";
import { defaultMessages } from "@/lib/default-messages";
import { Button } from "@/components/ui/button";
import DetailsModal from "@/components/dialogs/details";
import HallDetailsModal from "@/components/dialogs/hall-details";
import { useParams } from "next/navigation";

const SelectAction = ({ data }) => {
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");
  const params = useParams();


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
      <HallDetailsModal
        isOpen={open}
        loading={loading2}
        onClose={() => setOpen(false)}
        title="جزئیات"
        description={id}
      />

      <Link
        className=""
        href={routes.ceremonies.details(params.id, data.id)}
        onClick={() => {
          setId(data.id);
        }}
      >
        <Button>انتخاب سرویس</Button>
      </Link>

    
    </div>
  );
};

export default SelectAction;
