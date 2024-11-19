import { z } from "zod";

const imageSchema = z
  .custom()
  .refine((file) => file, "انتخاب تصویر الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "فایل انتخابی حداکثر باید ۲ مگابایت باشد");

const editImageSchema = z
  .custom()
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "فایل انتخابی حداکثر باید ۲ مگابایت باشد");

export const panelServicesSchema = z.object({
  service_id: z
    .number()
    .min(1, { message: "انتخاب نام سرویس الزامی می باشد." }),
  cost: z
    .string()
    .min(2, "قیمت حداقل ۲ رقم باید باشد.")
    .max(11, "قیمت حداکثر 11 رقم باید باشد."),
  description: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  photo: imageSchema,
});

export const editPanelServicesSchema = z.object({
  service_id: z
    .number()
    .min(1, { message: "انتخاب نام سرویس الزامی می باشد." }),
  cost: z
    .string()
    .min(2, "قیمت حداقل ۲ رقم باید باشد.")
    .max(11, "قیمت حداکثر 11 رقم باید باشد."),
  description: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  photo: editImageSchema,
});
