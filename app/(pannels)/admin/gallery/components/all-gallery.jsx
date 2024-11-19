"use client";

import CommentDialog from "@/components/dialogs/comment-dialog";
import DeleteModal from "@/components/dialogs/delete-dialog";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import { axios } from "@/lib/axios";
import { defaultMessages } from "@/lib/default-messages";
import { persianPriceFormat } from "@/lib/persian-price-format";
import {
  BadgeDollarSign,
  BookOpenText,
  CalendarRange,
  Eye,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EditGallery from "./edit-gallery";
import { useConfig } from "@/hooks/use-config";

function AllGallery() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [galleryName, setGalleryName] = useState("");
  const [galleryMonth, setGalleryMonth] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryPrice, setGalleryPrice] = useState("");
  const [galleryId, setGalleryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const useConfigRef = useConfig();

  const handleEdit = (gallery) => {
    setSelectedGallery(gallery);
    setOpen3(true);
  };

  useEffect(() => {
    fetchCities();
  }, [useConfigRef.refreshFlag]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admin/gallery-subscriptions`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(
        `/api/admin/gallery-subscriptions/${galleryId}`,
      );

      if (response.status === 204) {
        toast.success(<ToastSuccess text={"آیتم مورد نظر با موفقیت حذف شد"} />);
        fetchCities();
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
      setLoading(false);
      setOpen2(false);
    }
  };

  return (
    <div>
      <DeleteModal
        isOpen={open2}
        loading={loading}
        onClose={() => setOpen2(false)}
        onConfirm={onDelete}
        title="حذف آیتم"
        description="از حذف آیتم مورد نظر مطمئن هستید؟ این اقدام قابل برگشت نمیباشد"
      />
      <CommentDialog
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        title={galleryName}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <CalendarRange stroke="#d4b694" />
            <span className="text-zinc-400">تعداد ماه ها :</span>
            <span> {persianPriceFormat(+galleryMonth)} </span>
          </div>
          <div className="flex items-center gap-3">
            <BadgeDollarSign stroke="#d4b694" />
            <span className="text-zinc-400">قیمت :</span>
            <span> {persianPriceFormat(galleryPrice)} تومان </span>
          </div>
          <div className="flex gap-3">
            <BookOpenText stroke="#d4b694" />
            <span>{galleryDescription}</span>
          </div>
        </div>
      </CommentDialog>
      <CommentDialog
        isOpen={open3}
        loading={loading}
        onClose={() => setOpen3(false)}
        title="ویرایش"
      >
        <EditGallery setOpen={setOpen3} gallery={selectedGallery} />
      </CommentDialog>
      <div className="grid grid-cols-1 items-center justify-center gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((d) => (
          <div
            key={d.id}
            className="flex flex-col gap-4 rounded-lg border border-[#ddd] bg-opacity-50 p-4 backdrop-blur-md"
          >
            <div className="flex items-center justify-center gap-7">
              <Eye
                className="cursor-pointer text-blue-400"
                onClick={() => {
                  setOpen(true);
                  setGalleryName(d?.name);
                  setGalleryMonth(d?.month_count);
                  setGalleryDescription(d?.description);
                  setGalleryPrice(d?.price);
                }}
              />
              <SquarePen
                onClick={() => handleEdit(d)}
                className="cursor-pointer text-zinc-600"
              />
              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  setOpen2(true);
                  setGalleryId(d?.id);
                }}
              />
            </div>
            <p className="text-base font-bold md:text-lg">{d.name}</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CalendarRange stroke="#d4b694" />
                <span className="text-zinc-400">تعداد ماه ها :</span>
                <span> {persianPriceFormat(+d?.month_count)} </span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeDollarSign stroke="#d4b694" />
                <span className="text-zinc-400">قیمت :</span>
                <span> {persianPriceFormat(+d?.price)} تومان </span>
              </div>
              <div className="flex gap-3">
                <BookOpenText stroke="#d4b694" />
                <span>
                  {d?.description?.split(" ").slice(0, 4).join(" ") + " ..."}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllGallery;
