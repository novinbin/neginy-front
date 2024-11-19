"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const SubModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  id,
}) => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  const handleConfirm = () => {
    onConfirm(id);
    onClose();
  };

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
      <div className="mr-2 flex w-full items-center justify-start gap-3 space-x-2 pt-6">
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
          onClick={handleConfirm}
          className="flex h-8 items-center justify-center gap-2 text-xs"
        >
          <span>تایید</span>
          {loading && (
            <span className="animate-spin">
              <LoaderCircle size={18} strokeWidth={2} />
            </span>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default SubModal;
