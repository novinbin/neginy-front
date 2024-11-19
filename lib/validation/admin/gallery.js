import { z } from "zod";

export const gallerySchema = z.object({
  name: z.string().min(2, "نام اشتراک حداقل ۲ حرف میباشد"),
  month_count: z.union([
    z
      .string()
      .min(1, "حداقل باید یک عدد وارد نمایید")
      .max(255, "عدد نباید از 255 بیشتر باشد.")
      .nullish(),
    z.literal(""),
  ]),
  price: z.string().min(1, "حداقل باید یک عدد وارد نمایید"),
  description: z.union([
    z.string().min(2, "قیمت حداقل 2 عدد باشد.").nullish(),
    z.literal(""),
  ]),
});



