"use client";

import { useSearchParams } from "next/navigation";

const RowNumber = ({ number }) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;

  return (
    <span className="text-muted-foreground">
      {number + (page - 1) * perPage}
    </span>
  );
};

export default RowNumber;
