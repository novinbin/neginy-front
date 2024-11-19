"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useFactor } from "@/hooks/use-factor";

const CellAction = ({ data }) => {
  const factorHook = useFactor();

  const handleAdd = () => {
    factorHook.setSelectedFactor(data);
    factorHook.setFlag(!factorHook.flag);
  };

  return (
    <div className="flex items-center justify-center gap-1 ">
      <div className="flex flex-col gap-1">
        <Button
          variant="outline"
          className="flex items-center gap-1 text-xs font-normal"
          onClick={handleAdd}
        >
          <PlusCircle size={16} strokeWidth={1.5} className="text-primary" />
          <span>انتخاب</span>
        </Button>
      </div>
    </div>
  );
};

export default CellAction;
