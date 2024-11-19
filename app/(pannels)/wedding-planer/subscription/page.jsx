"use client";

import SubModal from "@/components/dialogs/sub-dialog";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/use-config";
import { axios } from "@/lib/axios";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SubScription() {
  const configHook = useConfig();
  const searchParams = useSearchParams();
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCities();
  }, [searchParams, configHook.refreshFlag]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/wedding-planner/subscriptions?page=${searchParams.get("page") || 1}}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <SubModal
        isOpen={open}
        loading={loading2}
        onClose={() => setOpen(false)}

        title="خرید اشتراک"
        description={`از خرید اشتراک ${name} خود مطمئن هستید؟`}
      />
      <div className="rounded-xl bg-[#E7D7CA] bg-opacity-35 shadow-xl">
        <div className="mx-auto flex w-11/12 items-center justify-between gap-4 py-4">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">اشتراک تالار</p>
            <p>
              در این صفحه میتوانید اطلاعات مربوط به اشتراک خود را مشاهده کنید
            </p>
          </div>
          <div>
            <p className="text-lg font-bold">
              روزهای باقیمانده : <span>444</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-[#BCC8BC] shadow-xl">
        <div className="mx-auto flex w-11/12 items-center justify-between gap-7 py-4">
          <p className="text-xl">اشتراک فعلی :</p>
          <p className="text-xl">test</p>
        </div>
      </div>

      <div className="mt-12 grid items-center justify-center gap-4 !rounded-xl max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((d) => (
          <div key={d.id} className="bg-[#F2F2F2] px-4 py-9">
            <p className="pb-7 text-center text-xl font-bold">{d.name}</p>
            <ul className="flex flex-col gap-5">
              {d?.properties?.map((prop) => (
                <li className="flex items-center gap-3 px-4" key={prop.id}>
                  <span className="h-3 w-3 rounded-full bg-black"></span>
                  {prop.slice(",")}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-left">
              {persianPriceFormat(+d.price)} تومان
            </p>

            <Button
              onClick={() => {
                setOpen(true);
                setName(d.name);
              }}
            >
              خرید اشتراک
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubScription;
