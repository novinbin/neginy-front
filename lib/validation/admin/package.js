import { z } from "zod";

const imageSchema = z.union([z
    .custom()
    .refine((file) => file, "انتخاب تصویر الزامی میباشد")
    .refine(
      (file) => !file || (file && file.type.startsWith("image/")),
      "فایل انتخابی حتما باید تصویر باشد",
    )
    .refine((file) => {
      return !file || file.size < 1024 * 1024 * 2;
    }, "فایل انتخابی حداکثر باید ۲ مگابایت باشد").nullable(), z.literal(""),
]);

export const packageSchema = z.object({
  name: z.string().min(2, "عنوان حداقل ۲ حرف میباشد"),
  price: z.string().min(2, "قیمت حداقل ۲ حرف میباشد"),
  description: z
    .string()
    .min(2, "توضیحات حداقل ۲ حرف میباشد")
    .max(128, "توضیحات حداکثر 128 حرف میباشد"),
  feature: z.string().min(1, { message: "قابلیت باید انتخاب شود." }),
});

export const createPackageSchema = z.object({
  name: z.string().min(2, "عنوان حداقل ۲ حرف میباشد"),
  price: z.string().min(2, "قیمت حداقل ۲ باید باشد"),
  discount: z
    .string()
    .min(1, "درصد تخفیف حداقل 1 حرف میباشد")
    .optional()
    .or(z.literal("")),
  features: z.array(z.string()),
  photo: imageSchema,
});
