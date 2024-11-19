import { z } from "zod";

export const panelReservationSchema = z.object({
  business_description: z
    .string()
    .min(2, "توضیحات حداقل ۲ حرف میباشد")
    .transform((e) => (e === "" ? undefined : e)),

  date: z.union([z.date("تاریخ را انتخاب کنید.").nullish(), z.literal("")]),
  status: z.union([
    z.string().min(1, "وضعیت معتبر نمی باشد.").nullish(),
    z.literal(""),
  ]),

  price: z.union([
    z.string().min(2, "قیمت حداقل 2 عدد باشد.").nullish(),
    z.literal(""),
  ]),
});
