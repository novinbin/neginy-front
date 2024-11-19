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

export const weddingCardSchema = z.object({
  photo: imageSchema,
});

export const editWeddingCardSchema = z.object({
  photo: imageSchema,
});
