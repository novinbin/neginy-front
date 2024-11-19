"use client";
import {  useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import { SquareCheckIcon, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DataTableHeader from "@/components/data-table-header";
import { routes } from "@/routes/routes";
import { persianPriceFormat } from "@/lib/persian-price-format";
import DeleteModal from "@/components/dialogs/delete-dialog";
import { useConfig } from "@/hooks/use-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function HomePagePackage() {
  const [data, setData] = useState("");
  const [deletePackage, setDeletePackage] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admin/packages`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const configHook = useConfig();

  const onDelete = async (deletePackage) => {
    try {
      setLoading2(true);

      const response = await axios.delete(
        `/api/admin/packages/${deletePackage}`,
      );

      if (response.status === 204) {
        toast.success(<ToastSuccess text={"آیتم مورد نظر با موفقیت حذف شد"} />);
        fetchCities();
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
      fetchCities();
    }
  };

  const handleAccordionToggle = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const calculateDiscountPrice = (price, discount) => {
    if (!discount || discount <= 0) return price; 
    return price - (price * discount) / 100; 
  };

  return (
    <div>
      <DeleteModal
        isOpen={open}
        loading={loading2}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(deletePackage)}
        title="حذف آیتم"
        description="از حذف آیتم مورد نظر مطمئن هستید؟ این اقدام قابل برگشت نمیباشد"
      />

      <DataTableHeader title="پکیج ها">
        <div className="flex items-center gap-4">
          <Link
            href={routes.admin.package.details}
            className="rounded-lg bg-[#A7988F] px-4 py-2 text-white"
          >
            مدیریت قابلیت ها
          </Link>
          <Link
            href={routes.admin.package.create}
            className="rounded-lg bg-[#A7988F] px-4 py-2 text-white"
          >
            ساخت پکیج جدید
          </Link>
        </div>
      </DataTableHeader>

      <div>
        {data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 max-lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
            {data?.data?.map((d, index) => (
              <div
                className="rounded-lg bg-opacity-50 backdrop-blur-md lg:p-7"
                key={String(d.id + index + d.name)}
              >
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-gray-500">
                    سازنده : <span>{d?.admin?.name}</span>
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Link href={routes.admin.package.edit(d?.id)}>
                      <SquarePen className="cursor-pointer text-blue-500/75" />
                    </Link>
                    <Trash2
                      className="cursor-pointer text-red-500/75"
                      onClick={() => {
                        setDeletePackage(d?.id);
                        setOpen(true);
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`mt-16 ${
                    expandedItems[d.id] ? "h-auto" : "h-[575px]"
                  } transition-all duration-300`}
                >
                  <div className="relative flex h-full flex-col justify-start gap-9 rounded-xl border border-[#C9CBD1] px-5">
                    <div className="absolute -top-16 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full shadow-xl">
                      <Image
                        src={d?.photo || "/img/sub.jpg"}
                        alt={d?.name}
                        width={260}
                        height={140}
                        className="h-28 w-28 rounded-full"
                      />
                    </div>
                    {d?.discount ? (
                      <div className="mt-20 flex flex-col">
                        <p className="text-xl font-semibold max-lg:text-xl max-md:text-lg">
                          {persianPriceFormat(
                            calculateDiscountPrice(+d?.price, d?.discount),
                          )}
                          هزار تومان
                        </p>
                        <p className="text-base font-semibold text-red-500 line-through">
                          {persianPriceFormat(+d?.price)} هزار تومان
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="mt-20 text-2xl font-semibold max-lg:text-xl max-md:text-lg">
                          {persianPriceFormat(+d?.price)} هزار تومان
                        </p>
                        <br />
                      </div>
                    )}
                    <p className="text-xl text-[#373737] max-lg:text-lg max-md:text-base">
                      {d?.name}
                    </p>
                    <div className="border border-[#C9CBD1] px-6"></div>
                    <div className="">
                      <p className="mb-4 text-xl max-lg:text-lg max-md:text-base">
                        امکانات:
                      </p>
                      <div className="flex flex-col gap-4">
                        {d?.features.length > 2 ? (
                          <>
                            {d?.features.slice(0, 2).map((feature, index) => (
                              <div
                                className="flex items-center gap-4"
                                key={String(index + feature + index)}
                              >
                                <SquareCheckIcon className="size-5" />
                                <p>{feature}</p>
                              </div>
                            ))}
                            <Accordion
                              type="single"
                              collapsible
                              className="m-0 p-0"
                            >
                              <AccordionItem value="item-1" className="m-0 p-0">
                                <AccordionTrigger
                                  className="w-full text-blue-500"
                                  onClick={() => handleAccordionToggle(d.id)}
                                >
                                  مشاهده بیشتر
                                </AccordionTrigger>
                                <AccordionContent className="m-0 flex flex-col gap-3 p-0">
                                  {d?.features?.map((feature, index) => (
                                    <div
                                      className="m-0 flex items-center gap-4 p-0"
                                      key={String(index + index + feature)}
                                    >
                                      <SquareCheckIcon className="size-5" />
                                      <p>{feature}</p>
                                    </div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {d?.features?.map((feature, index) => (
                              <div
                                className="flex items-center gap-4"
                                key={String(index + feature + index + index)}
                              >
                                <SquareCheckIcon className="size-5" />
                                <p>{feature}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button
                        onClick={() => {
                          handleBuyClick(d);
                          setPackageId(d?.id);
                        }}
                        variant="outline"
                        className="my-4 w-full bg-[#A7988F] text-white"
                      >
                        خرید
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-auto flex h-44 w-full items-center justify-center">
            پکیجی تعریف نشده است.
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePagePackage;
