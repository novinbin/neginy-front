import { z } from "zod";

export const signUpBusinessSchema = z.object({
  role: z.string().min(1, { message: "انتخاب نقش الزامی می باشد." }),
  name: z.string().min(3, "نام و نام خانوادگی حداقل ۳ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z
    .union([z.string().min(4, "ایمیل معتبر نمی باشد."), z.null()])
    .optional()
    .nullable()
    .transform((e) => (e === "" || e === null ? undefined : e)),
  password: z.string().min(8, "رمز ورود حداقل ۸ حرف میباشد"),
  password_confirmation: z.string().min(8, "تکرار رمز ورود حداقل ۸ حرف میباشد"),
});
