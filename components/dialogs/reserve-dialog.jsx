"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const ReserveDialog = ({
  isOpen,
  onClose,

  loading,
  title,
  description,
  children
}) => {
  const [isMounted, setIsmounted] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); 

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }


  const handleConfirm = () => {
    
    setIsSecondModalOpen(true); 
  };


  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="mr-2 flex w-full flex-col items-center justify-start gap-3 space-x-2 pt-6">
          <p>{title}</p>
          <p>{description}</p>
          <div className="flex items-center justify-center gap-9">
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
              onClick={handleConfirm} 
              className="flex h-8 items-center justify-center gap-2 text-xs"
            >
              <span>بله</span>
              {loading && (
                <span className="animate-spin">
                  <LoaderCircle size={18} strokeWidth={2} />
                </span>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isSecondModalOpen} onClose={closeSecondModal}>
        {children}
      </Modal>
    </>
  );
};

export default ReserveDialog;
