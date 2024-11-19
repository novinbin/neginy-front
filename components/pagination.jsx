"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const PaginationComponent = ({ total, perPage }) => {
  const lastPage = Math.ceil(total / perPage);

  const searchParams = useSearchParams();

  const router = useRouter();

  const page = +searchParams.get("page") || 1;

  const handlePage = (page) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      ["page"]: page,
    };

    if (current["page"] === page) {
      query["page"] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <Pagination>
      <PaginationContent className="mt-5">
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePage(page - 1)} />
          </PaginationItem>
        )}

        {page > 3 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePage(1)}>{1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePage(page - 2)}>
              {page - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePage(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {page < lastPage && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePage(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < lastPage - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePage(page + 2)}>
              {page + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < lastPage - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handlePage(lastPage)}>
                {lastPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {page < lastPage && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePage(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
