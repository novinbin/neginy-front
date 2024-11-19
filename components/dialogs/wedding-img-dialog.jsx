"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";
import Image from "next/image";

const WeddingTextDialog = ({
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
      <Image
        src={data}
        alt="img wedding card"
        width={480}
        height={360}
        className="w-full"
      />
    </Modal>
  );
};

export default WeddingTextDialog;
