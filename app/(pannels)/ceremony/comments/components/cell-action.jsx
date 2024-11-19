"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import CommentDialog from "@/components/dialogs/comment-dialog";

const CellAction = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div>
      <CommentDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="جزئیات نظر"
        description={comment}
      />
      <div
        className="flex items-center justify-center gap-1"
        onClick={() => {
          setOpen(true);
          setComment(data.description);
        }}
      >
        <div className="cursor-pointer rounded-md p-1 transition-all duration-200 hover:bg-muted">
          <Eye size={18} strokeWidth={1.5} className="text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default CellAction;
