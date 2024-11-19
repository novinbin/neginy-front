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

export const busSelfUpdateSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z
    .union([
      z.string().length(0, "فرمت ایمیل صحیح نمیباشد"),
      z
        .string()
        .max(100, "ایمیل حداکثر ۱۰۰ حرف میباشد")
        .email("فرمت ایمیل صحیح نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  national_code: z
    .union([
      z
        .string()
        .min(10, "کد ملی باید ۱۰ رقم باشد")
        .max(10, "کد ملی باید ۱۰ رقم باشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  shaba_number: z
    .union([
      z
        .string()
        .min(24, "شبا باید 24 رقم باشد")
        .max(26, "شبا باید 26 رقم باشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});
