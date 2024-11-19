"use client";
import { Button } from "@/components/ui/button";
import { axios } from "@/lib/axios";
import { SquareCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { persianPriceFormat } from "@/lib/persian-price-format";
import Image from "next/image";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";
import CommentDialog from "@/components/dialogs/comment-dialog";

function All() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageDiscount, setPackageDiscount] = useState("");
  const [packagePhoto, setPackagePhoto] = useState(null);
  const [packageFeatures, setPackageFeatures] = useState([]);

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/packages`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBuyClick = (d) => {
    if (user?.userData?.data?.role === "user") {
      setOpen(true);
      setPackageId(d?.id);
      setPackageFeatures(d?.features);
      setPackageName(d?.name);
      setPackagePrice(d?.price);
      setPackageDiscount(d?.discount);
      setPackagePhoto(d?.photo);
    } else {
      toast("لطفا اول وارد حساب کاربری خود شوید.", { type: "info" });
      router.push(routes.auth.signIn);
    }
  };

  const calculateDiscountPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price - (price * discount) / 100;
  };

  return (
    <div>
      <CommentDialog
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        title="خرید پکیج"
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col items-center justify-center">
            <Image
              src={packagePhoto}
              width={480}
              height={360}
              className="h-36 w-36 rounded-full"
              alt="alt"
            />
          </div>
          <div>
            <p className="mb-3 text-xl font-bold">{packageName}</p>
            <ul className="mr-5 flex flex-col gap-4">
              {packageFeatures?.map((feature) => (
                <li key={feature.id} className="list-disc">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-left">
              <p className="text-lg font-bold">
                {persianPriceFormat(
                  calculateDiscountPrice(+packagePrice, packageDiscount),
                )}
                <span className="px-1"> هزار تومان</span>
              </p>
            </div>
            <div className="flex w-full justify-end">
              <Button>ورود به درگاه پرداخت</Button>
            </div>
          </div>
        </div>
      </CommentDialog>
      <div className="mx-auto w-11/12">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((d) => (
            <div
              className="rounded-lg border border-zinc-300 bg-opacity-50 p-7 backdrop-blur-md"
              key={d.id}
            >
              <div
                className={`mt-20 ${
                  expandedItems[d.id] ? "h-auto" : "h-[500px]"
                } transition-all duration-300`}
              >
                <div className="relative flex h-full flex-col justify-around rounded-xl border border-[#C9CBD1] px-9">
                  <div className="absolute -top-16 left-1/2 flex h-32 w-32 -translate-x-1/2 items-center justify-center rounded-full bg-[#A7988F] shadow-xl">
                    <Image
                      src={d?.photo}
                      alt={d?.name}
                      width={260}
                      height={140}
                      className="h-28 w-28 rounded-full"
                    />
                  </div>
                  {d?.discount ? (
                    <div className="mt-20 flex flex-col gap-2">
                      <p className="text-xl font-semibold text-red-500 line-through max-lg:text-xl max-md:text-lg">
                        {persianPriceFormat(+d?.price)} هزار تومان
                      </p>
                      <p className="text-xl font-semibold max-lg:text-xl max-md:text-lg">
                        {persianPriceFormat(
                          calculateDiscountPrice(+d?.price, d?.discount),
                        )}
                        هزار تومان
                      </p>
                    </div>
                  ) : (
                    <p className="mb-7 mt-24 text-2xl font-semibold max-lg:text-xl max-md:text-lg">
                      {persianPriceFormat(+d?.price)} هزار تومان
                    </p>
                  )}
                  <p className="text-xl text-[#373737] max-lg:text-lg max-md:text-base">
                    {d?.name}
                  </p>
                  <div className="border border-[#C9CBD1] px-6"></div>
                  <div>
                    <p className="mb-7 mt-4 text-xl max-lg:text-lg max-md:text-base">
                      امکانات:
                    </p>
                    <div className="flex flex-col gap-2">
                      {d?.features.length > 2 ? (
                        <>
                          {d?.features.slice(0, 2).map((feature) => (
                            <div
                              className="flex items-center gap-4"
                              key={feature.id}
                            >
                              <SquareCheckIcon className="size-5" />
                              <p>{feature}</p>
                            </div>
                          ))}
                          <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                              <AccordionTrigger
                                className="w-full text-blue-500"
                                onClick={() => handleAccordionToggle(d.id)}
                              >
                                مشاهده بیشتر
                              </AccordionTrigger>
                              <AccordionContent className="flex flex-col gap-3">
                                {d?.features?.map((feature) => (
                                  <div
                                    className="flex items-center gap-4"
                                    key={feature.id}
                                  >
                                    <SquareCheckIcon className="size-5" />
                                    <p>{feature}</p>
                                  </div>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {d?.features?.map((feature) => (
                            <div
                              className="flex items-center gap-4"
                              key={feature.id}
                            >
                              <SquareCheckIcon className="size-5" />
                              <p>{feature}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleBuyClick(d)}
                      variant="outline"
                      className="my-2 w-full bg-[#A7988F] text-white"
                    >
                      خرید
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default All;
