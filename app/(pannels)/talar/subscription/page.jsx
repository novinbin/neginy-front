"use client";

import SubModal from "@/components/dialogs/sub-dialog";
import SubscriptionCurrentDialog from "@/components/dialogs/subscription-current-dialog";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/use-config";
import { axios } from "@/lib/axios";
import { farsiNumber } from "@/lib/farsi-number";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { routes } from "@/routes/routes";
import { Eye } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SubScription() {
  const configHook = useConfig();
  const searchParams = useSearchParams();
  const [loading2, setLoading2] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [buyId, setBuyId] = useState("");
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    fetchCities();
    fetchMySub();
  }, [searchParams, configHook.refreshFlag]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/talar/subscriptions?page=${searchParams.get("page") || 1}}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchMySub = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/talar/my-subscriptions`)
      .then((response) => {
        setData2(response.data);
      })
      .catch((err) => {})
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
        onConfirm={(id) => {
          const backend = process.env.NEXT_PUBLIC_API_URL;
          const front = process.env.NEXT_PUBLIC_FRONT_URL;
          window.location.href = `${backend}/business/payment/subscription/${id}?url=${front}${routes.talar.subscription.root}`;
        }}
        title="خرید اشتراک"
        description={`از خرید اشتراک ${name} خود مطمئن هستید؟`}
        id={buyId}
      />
      <SubscriptionCurrentDialog
        isOpen={open2}
        loading={loading2}
        onClose={() => setOpen2(false)}
        title={currentId?.name}
        data={currentId}
      />
      <div className="rounded-xl bg-[#E7D7CA] bg-opacity-35 shadow-xl">
        <div className="mx-auto flex w-11/12 items-center justify-between gap-4 py-4">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">اشتراک آتلیه</p>
            <p>
              در این صفحه میتوانید اطلاعات مربوط به اشتراک خود را مشاهده کنید
            </p>
          </div>
          <div>
            <p className="text-lg font-bold">
              روزهای باقیمانده :
              <span>
                {farsiNumber(
                  data2?.current?.remaining_days
                    ? data2?.current?.remaining_days
                    : 0 + data2?.reserve?.remaining_days
                      ? data2?.reserve?.remaining_days
                      : 0,
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-[#BCC8BC] shadow-xl">
        <div className="mx-auto flex w-11/12 items-center justify-between gap-7 py-4">
          <p className="text-xl">اشتراک فعلی :</p>

          <p
            className="flex cursor-pointer items-center justify-center gap-2 text-xl"
            onClick={() => {
              setOpen2(true);
              setCurrentId(data2?.current);
            }}
          >
            {data2?.current?.name}
            <Eye className="text-[#a78661]" />
          </p>
        </div>
      </div>

      {data2?.reserve && (
        <div className="mt-4 rounded-xl bg-[#BCC8BC] shadow-xl">
          <div className="mx-auto flex w-11/12 items-center justify-between gap-7 py-4">
            <p className="text-xl">اشتراک رزرو :</p>
            <p
              className="flex cursor-pointer items-center justify-center gap-2 text-xl"
              onClick={() => {
                setOpen2(true);
                setCurrentId(data2?.reserve);
              }}
            >
              {data2?.reserve?.name}
              <Eye className="text-[#a78661]" />
            </p>
          </div>
        </div>
      )}

      <div className="mt-12 grid items-center justify-center gap-4 !rounded-xl max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((d) => (
          <div
            key={d.id}
            className={`mt-9 ${
              expandedItems[d.id] ? "h-auto" : "h-[555px]"
            } flex h-96 flex-col justify-between rounded-lg bg-[#F2F2F2] px-4 py-9 transition-all duration-300`}
          >
            <p className="pb-7 text-center text-xl font-bold">{d.name}</p>
            <ul className="flex flex-col gap-5">
              {d?.properties?.map((prop) => (
                <li className="flex items-center gap-3 px-4" key={prop.id}>
                  <span className="h-3 w-3 rounded-full bg-black"></span>
                  {prop.slice(",")}
                </li>
              ))}
            </ul>

            <p className="mb-3 mt-4 text-left">
              {persianPriceFormat(+d.price)} تومان
            </p>

            <Button
              onClick={() => {
                setOpen(true);
                setName(d.name);
                setBuyId(d.id);
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
