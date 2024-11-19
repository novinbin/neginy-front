"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";

const DetailsModal = ({
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
      <h2>عنوان : {data?.name}</h2>
      <p>
        کسب و کار :
        {data?.business_type === "ceremony"
          ? "تشریفات"
          : data?.business_type === "talat"
            ? "تالار"
            : data?.business_type === "studio"
              ? "آتلیه"
              : "ودینگ پلنر"}
      </p>
    </Modal>
  );
};

export default DetailsModal;
