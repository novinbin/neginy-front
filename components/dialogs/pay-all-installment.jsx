"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";

const PayAllInstallment = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  data,
}) => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col items-center gap-4">
        {data && (
          <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
            <div className="flex gap-2">
              <span>مبلغ کل :</span>
              <span>{persianPriceFormat(+data.total_price)} تومان</span>
            </div>
            <div className="flex gap-2">
              <span>قابل پرداخت :</span>
              <span>{persianPriceFormat(+data.payable_price)} تومان</span>
            </div>
            <div className="flex gap-2">
              <span>امتیاز باشگاه مشتریان :</span>
              <span>{farsiNumber(data.points)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            disabled={loading}
            variant="outline"
            onClick={onClose}
            className="h-8 text-xs"
          >
            لغو
          </Button>
          <Button
            disabled={loading}
            variant="destructive"
            onClick={onConfirm}
            className="flex h-8 items-center justify-center gap-2 bg-green-500 text-xs hover:bg-green-600"
          >
            <span>پرداخت</span>
            {loading && (
              <span className="animate-spin">
                <LoaderCircle size={18} strokeWidth={2} />
              </span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PayAllInstallment;
