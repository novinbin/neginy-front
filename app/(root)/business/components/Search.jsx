"use client";

import ToastError from "@/components/toast/toast-error";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { axios } from "@/lib/axios";
import { cn } from "@/lib/utils";
import arrowIcon from "@/public/img/svg-icon/arrowDown.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

function Search() {
  const [data, setData] = useState({});
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
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  
  const [serviceSearch, setServiceSearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const city = params.get("city");
    const state = params.get("state");
    const serviceId = params.get("service_id");
    const serviceName = params.get("service_name");

    if (city) setSelectedCity(city);
    if (state) setSelectedState(state);
    if (serviceName) {
      setSelectedService({ id: serviceId, name: serviceName });
    }

    fetchStateAndCityData();
    fetchServicesData();
  }, [params]);

  const fetchStateAndCityData = async () => {
    await axios
      .get(`/api/states-cities`)
      .then((response) => {
        setData(response?.data);

        
        const states = Object.keys(response?.data);


        setSerachTitle((prev) => [
          prev[0], 
          {
            id: 2,
            name: "استان",
            item: states.map((state, index) => ({
              id: index + 1,
              name: state,
            })),
          },
          {
            id: 3,
            name: "شهر",
            item: [],
          },
        ]);
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      });
  };

  const fetchServicesData = async () => {
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
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      });
  };

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

  const handleStateSelect = (state) => {
    setSelectedState(state);
    const cities = data[state] || []; 


    setSerachTitle((prev) => {
      const newSerach = [...prev];
      newSerach[2].item = cities.map((city, index) => ({
        id: index + 1,
        name: city,
      }));
      return newSerach;
    });


    setSelectedCity(null);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };


  const filteredServices = serachTitle[0].item.map((group) => ({
    ...group,
    items: group.items.filter((service) =>
      service.name.includes(serviceSearch),
    ),
  }));

  const filteredStates = serachTitle[1].item.filter((state) =>
    state.name.includes(stateSearch),
  );

  const filteredCities = selectedState
    ? serachTitle[2].item.filter((city) => city.name.includes(citySearch))
    : [];

  const handleSearchSubmit = async () => {

    const serviceID = selectedService ? selectedService.id : null;
    const state = selectedState;
    const city = selectedCity;

    if (!serviceID || !state || !city) {
      toast.error("لطفا همه فیلدها را پر کنید."); 
      return;
    }

    router.push(
      `/business?city=${city}&state=${state}&service_id=${serviceID}&service_name=${selectedService.name}`,
    ); 
  };

  return (
    <>
      <div className="lg:hidden">
        <div className="mx-auto w-11/12 pt-9">
          <div>
            <Menubar className="mx-auto space-x-0 rounded-xl p-0 shadow-lg max-lg:flex max-lg:h-[17rem] max-lg:flex-col max-lg:gap-4 lg:h-14 lg:w-[920px]">
              <MenubarMenu>
                <div className="">
                  <MenubarTrigger className="flex h-14 w-64 items-center justify-around text-[#A89990]">
                    {selectedService ? selectedService.name : "انتخاب خدمات"}
                    <Image
                      src={arrowIcon}
                      alt="icon"
                      width={100}
                      height={100}
                      className="h-6 w-6"
                    />
                  </MenubarTrigger>
                </div>
                <MenubarContent className="w-64">
                  <Input
                    placeholder="جست و جو سرویس"
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="focus-visible:ring-primary"
                    dir={"rtl"}
                  />
                  {filteredServices.map((group) => (
                    <div key={group.id} className="border-b pb-4">
                      <MenubarItem
                        dir={"rtl"}
                        className={cn("text-base font-bold text-[#68807A]")}
                        disabled
                      >
                        {translate({ business_type: group.name })}
                      </MenubarItem>
                      {group.items.map((service) => (
                        <MenubarItem
                          dir={"rtl"}
                          key={service.id}
                          className={cn("pr-4 text-sm")}
                          onClick={() => handleServiceSelect(service)}
                        >
                          {service.name}
                        </MenubarItem>
                      ))}
                    </div>
                  ))}
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu className="w-64">
                <div className="">
                  <MenubarTrigger className="flex h-14 w-64 items-center justify-around text-[#A89990]">
                    {selectedState || "انتخاب استان"}
                    <Image
                      src={arrowIcon}
                      alt="icon"
                      width={100}
                      height={100}
                      className="h-6 w-6"
                    />
                  </MenubarTrigger>
                </div>
                <MenubarContent className="w-64">
                  <Input
                    placeholder="جست و جو استان"
                    onChange={(e) => setStateSearch(e.target.value)}
                    className="focus-visible:ring-primary"
                    dir={"rtl"}
                  />
                  {filteredStates.map((i) => (
                    <MenubarItem
                      dir={"rtl"}
                      key={i.id}
                      onClick={() => handleStateSelect(i.name)}
                    >
                      {i.name}
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu className="w-64">
                <div className="">
                  <MenubarTrigger className="flex h-14 w-64 items-center justify-around text-[#A89990]">
                    {selectedCity || "انتخاب شهر"}
                    <Image
                      src={arrowIcon}
                      alt="icon"
                      width={100}
                      height={100}
                      className="h-6 w-6"
                    />
                  </MenubarTrigger>
                </div>
                <MenubarContent className="w-64">
                  <Input
                    placeholder="جست و جو شهر"
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="focus-visible:ring-primary"
                    dir={"rtl"}
                  />
                  {filteredCities.map((i) => (
                    <MenubarItem
                      dir={"rtl"}
                      key={i.id}
                      onClick={() => handleCitySelect(i.name)}
                    >
                      {i.name}
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>

              <p
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-b-xl bg-[#68807A] text-center text-white"
                onClick={handleSearchSubmit} 
              >
                جستجو
              </p>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="max-lg:hidden">
        <div className="mx-auto w-4/5 py-20">
          <Menubar className="mx-auto h-14 w-[920px] space-x-0 rounded-xl p-0 shadow-lg">
       
            <MenubarMenu>
              <div className="">
                <MenubarTrigger className="flex h-14 w-64 items-center justify-around text-[#A89990]">
                  {selectedService ? selectedService.name : "انتخاب خدمات"}
                  <Image
                    src={arrowIcon}
                    alt="icon"
                    width={100}
                    height={100}
                    className="h-6 w-6"
                  />
                </MenubarTrigger>
              </div>
              <MenubarContent>
                <Input
                  placeholder="جست و جو سرویس"
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="focus-visible:ring-primary"
                  dir={"rtl"}
                />
                {filteredServices.map((group) => (
                  <div key={group.id} className="border-b pb-4">
                    <MenubarItem
                      dir={"rtl"}
                      className={cn("text-base font-bold text-[#68807A]")}
                      disabled
                    >
                      {translate({ business_type: group.name })}
                    </MenubarItem>
                    {group.items.map((service) => (
                      <MenubarItem
                        dir={"rtl"}
                        key={service.id}
                        className={cn("pr-4 text-sm")}
                        onClick={() => handleServiceSelect(service)}
                      >
                        {service.name}
                      </MenubarItem>
                    ))}
                  </div>
                ))}
              </MenubarContent>
            </MenubarMenu>

         
            <MenubarMenu>
              <div className="">
                <MenubarTrigger className="flex h-14 w-64 items-center justify-around text-[#A89990]">
                  {selectedState || "انتخاب استان"}
                  <Image
                    src={arrowIcon}
                    alt="icon"
                    width={100}
                    height={100}
                    className="h-6 w-6"
                  />
                </MenubarTrigger>
              </div>
              <MenubarContent>
                <Input
                  placeholder="جست و جو استان"
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="focus-visible:ring-primary"
                  dir={"rtl"}
                />
                {filteredStates.map((i) => (
                  <MenubarItem
                    dir={"rtl"}
                    key={i.id}
                    onClick={() => handleStateSelect(i.name)}
                  >
                    {i.name}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

    
            <MenubarMenu>
              <div className="">
                <MenubarTrigger className="flex h-14 w-64 items-center justify-around text-[#A89990]">
                  {selectedCity || "انتخاب شهر"}
                  <Image
                    src={arrowIcon}
                    alt="icon"
                    width={100}
                    height={100}
                    className="h-6 w-6"
                  />
                </MenubarTrigger>
              </div>
              <MenubarContent>
                <Input
                  placeholder="جست و جو شهر"
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="focus-visible:ring-primary"
                  dir={"rtl"}
                />
                {filteredCities.map((i) => (
                  <MenubarItem
                    dir={"rtl"}
                    key={i.id}
                    onClick={() => handleCitySelect(i.name)}
                  >
                    {i.name}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            <p
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-l-xl bg-[#68807A] text-center text-white"
              onClick={handleSearchSubmit} 
            >
              جستجو
            </p>
          </Menubar>
        </div>
      </div>
    </>
  );
}

export default Search;
