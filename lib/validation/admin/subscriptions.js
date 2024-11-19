import { z } from "zod";

export const subScriptionsSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
  month_count: z.string().min(1, "حداقل باید یک عدد وارد نمایید"),
  price: z.string({message:"قیمت باید عدد باشد"}).min(1, "حداقل باید یک عدد وارد نمایید"),
  properties: z.array().min("ویژگی حداقل باید دو حرف باشد."),
  business_type: z.string().min(1, { message: "انتخاب نقش الزامی می باشد." }),
});

export const editSubScriptionsSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
  month_count: z.union([
    z.string().min(1, "حداقل باید یک عدد وارد نمایید").nullish(),
    z.literal(""),
  ]),
  price: z.string({message:"قیمت باید عدد باشد"}).min(1, "حداقل باید یک عدد وارد نمایید"),
  properties: z.string().min("ویژگی حداقل باید دو حرف باشد."),
  business_type: z.string().min(1, { message: "انتخاب نقش الزامی می باشد." }),
});
