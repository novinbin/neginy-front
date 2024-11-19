"use client";
import Image from "next/image";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "@/components/dialogs/delete-dialog";
import ToastError from "@/components/toast/toast-error";
import { toast } from "sonner";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import { axios } from "@/lib/axios";
import { useConfig } from "@/hooks/use-config";
import WeddingTextDialog from "@/components/dialogs/wedding-img-dialog";

function WedImgs({ data }) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdImage, setSelectedIdImage] = useState(null);

  const configHook = useConfig();

  const onDelete = async () => {
    try {
      setLoading2(true);
      const response = await axios.delete(
        `/api/admin/card-templates/${selectedId}`,
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
      <WeddingTextDialog
        isOpen={open2}
        loading={loading2}
        onClose={() => setOpen2(false)}
        title="جزئیات"
        data={selectedIdImage}
        id={selectedId}
      />
      <div className="grid grid-cols-1 items-center justify-between gap-7 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((info) => (
          <div key={info.id} className="">
            <div className="rounded-t-2xl bg-[#E7D7CA] bg-opacity-70 backdrop-blur-md">
              <div className="grid grid-cols-2 items-center justify-between gap-4 py-2">
                <div
                  onClick={() => {
                    setOpen2(true);
                    setSelectedIdImage(info.photo);
                  }}
                  className="flex cursor-pointer items-center justify-center gap-2"
                >
                  <Eye className="size-4" stroke="blue" />
                  <p>مشاهده</p>
                </div>
                <div
                  onClick={() => {
                    setOpen(true);
                    setSelectedId(info.id);
                  }}
                  className="flex cursor-pointer items-center justify-center gap-2"
                >
                  <Trash2 className="size-4" stroke="red" />
                  <p>حذف</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src={info.photo}
                width={540}
                height={480}
                className="h-72 w-full rounded-b-2xl"
                alt="alt"
              />
              <div className="absolute bottom-0 w-full rounded-b-2xl bg-[#DFE3DF] bg-opacity-70 px-3 py-2 backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <span>ادمین سازنده :</span>
                  <span>{info.admin.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WedImgs;
