import { z } from "zod";

const imageLandingPage = z.union([
  z
    .instanceof(File)
    .refine((file) => file, "انتخاب تصویر الزامی میباشد")
    .refine(
      (file) => file.type.startsWith("image/"),
      "فایل انتخابی حتما باید تصویر باشد",
    )
    .refine(
      (file) => file.size < 1024 * 1024 * 2,
      "فایل انتخابی حداکثر باید ۲ مگابایت باشد",
    )
    .nullable(),

  z
    .string()
    .refine((url) => {
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return urlPattern.test(url);
    }, "لینک تصویر باید یک URL معتبر باشد")
    .transform(() => "")
    .nullable(),

  z.literal(""),
]);

export const userGuestSchema = z.object({
  bride_groom: z
    .union([z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد")])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),

  address: z
    .union([z.string().min(2, "آدرس حداقل ۲ حرف میباشد")])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),

  date: z
    .union([z.date("تاریخ معتبر نمیباشد")])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  gifts_visible: z.boolean().default(false).optional(),
  has_gallery: z.boolean().default(false).optional(),
  has_online_gift: z.boolean().default(false).optional(),
  photo: imageLandingPage,
  weddingCard: imageLandingPage,
});
