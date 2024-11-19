"use client";
import ToastError from "@/components/toast/toast-error";
import { axios } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const Services = () => {
  const [serviceSearch, setServiceSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchServicesData();
  }, []);

  const [serachTitle, setSerachTitle] = useState([
    {
      id: 1,
      name: "انتخاب خدمات",
      item: [],
    },
    {
      id: 2,
      name: "استان",
      item: [],
    },
    {
      id: 3,
      name: "شهر",
      item: [],
    },
  ]);

  const fetchServicesData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/services`) 
      .then((response) => {
        const services = response?.data;

       
        const groupedServices = services.reduce((acc, service) => {
          const { business_type, name } = service;
          if (!acc[business_type]) {
            acc[business_type] = [];
          }
          acc[business_type].push({ id: service.id, name });
          return acc;
        }, {});

      
        const serviceItems = Object.keys(groupedServices).map((type) => ({
          id: type,
          name: type,
          items: groupedServices[type],
        }));

      
        setSerachTitle((prev) => {
          const newSerach = [...prev];
          newSerach[0].item = serviceItems;
          return newSerach;
        });
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const filteredServices = serachTitle[0].item.map((group) => ({
    ...group,
    items: group.items.filter((service) =>
      service.name.includes(serviceSearch),
    ),
  }));

  let translate = ({ business_type }) => {
    let displayName;
    switch (business_type) {
      case "talar":
        displayName = "تالار";
        break;
      case "studio":
        displayName = "آتلیه";
        break;
      case "ceremony":
        displayName = "تشریفات";
        break;
      case "wedding_planer":
        displayName = "ودینگ پلنر";
        break;
      default:
        displayName = business_type;
    }
    return displayName;
  };

  return isLoading ? (
    <div className="flex h-14 w-full cursor-wait items-center justify-center rounded-xl bg-[#68807A] text-center text-white">
      <div className="animate-spin">
        <LoaderCircle />
      </div>
    </div>
  ) : (
    <div className="flex flex-col flex-wrap items-start justify-center gap-8">
      {filteredServices.map((group) => (
        <div key={group.id} className="pb-4">
          <div
            dir={"rtl"}
            className={cn("text-xl font-bold text-[#68807A]")}
            disabled
          >
            {translate({ business_type: group.name })}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mr-4 mt-4">
            {group.items.map((service) => (
              <button
                dir={"rtl"}
                key={service.id}
                className="rounded-lg bg-gradient-to-r from-[#68807A] to-[#151A19] px-6 py-2 text-white md:px-12 md:py-4"
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
