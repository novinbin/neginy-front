"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";
import Image from "next/image";

const SubscriptionCurrentDialog = ({
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
      <h2 className="pb-3 text-lg font-bold">ویژگی های پکیج :</h2>
      <div className="flex flex-col gap-2">
        {data?.properties?.map((prop) => (
          <div key={prop.id}>
            <p>{prop}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="mt-4 text-lg text-zinc-400">
          قیمت پکیج :
          <span className="text-xl text-black">
            {persianPriceFormat(+data?.price)} تومان
          </span>
        </p>
        <p className="mt-4 text-lg text-zinc-400">
          روزهای باقی مانده پکیج:
          <span className="text-xl text-black">
            {farsiNumber(data?.remaining_days)}
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default SubscriptionCurrentDialog;
