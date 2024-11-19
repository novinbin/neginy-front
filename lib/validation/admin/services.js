import { z } from "zod";

export const servicesSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
  business_type: z.string().min(1, { message: "انتخاب نقش الزامی می باشد." }),
});

export const editServicesSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
  business_type: z.string().min(1, { message: "انتخاب نقش الزامی می باشد." }),
});
