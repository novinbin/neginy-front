"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";

const HallDetailsModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  data,
  children,
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
      {children}
    </Modal>
  );
};

export default HallDetailsModal;
