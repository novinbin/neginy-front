import { z } from "zod";

export const signUpAllSchema = z.object({
  business_name: z.string().min(3, "نام کسب و کار حداقل ۳ حرف میباشد"),
  phone_1: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  phone_2: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد")
    .optional()
    .nullable()
    .transform((e) => (e === "" || e === null ? undefined : e)),
  email: z
    .union([z.string().min(4, "ایمیل معتبر نمی باشد."), z.null()])
    .optional()
    .nullable()
    .transform((e) => (e === "" || e === null ? undefined : e)),
  address: z.string().min(3, "آدرس حداقل ۳ حرف میباشد"),
  city: z.string().min(1, { message: "استان را انتخاب کنید" }),
  state: z.string().min(1, { message: "شهر را انتخاب کنید" }),
  location: z
    .string()
    .optional()
    .nullable()
    .transform((e) => (e === "" || e === null ? undefined : e)),
  instagram: z
    .string()
    .min(3, "آدرس اینستاگرام خود را وارد کنید.")
    .optional()
    .nullable()
    .transform((e) => (e === "" || e === null ? undefined : e)),
  introduction: z
    .string()
    .min(3, "توضیحات حداقل ۳ حرف میباشد")
    .optional()
    .nullable()
    .transform((e) => (e === "" || e === null ? undefined : e)),
});
