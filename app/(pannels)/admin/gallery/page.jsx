"use client";

import DataTableHeader from "@/components/data-table-header";
import CommentDialog from "@/components/dialogs/comment-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateForm from "./components/create-form";
import AllGallery from "./components/all-gallery";

function Gallery() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <CommentDialog
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        title="ساخت اشتراک"
      >
        <CreateForm setOpen={setOpen} />
      </CommentDialog>

      <DataTableHeader title="گالری">
        <Button onClick={() => setOpen(true)}>ساخت اشتراک</Button>
      </DataTableHeader>
      <AllGallery />
    </div>
  );
}

export default Gallery;
