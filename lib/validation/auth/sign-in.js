import { z } from "zod";

export const signInSchema = z.object({
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  password: z.string().min(8, "رمز ورود حداقل ۸ حرف میباشد"),
});


export const giftSchema = z.object({
  firstName: z.string().min(2, "نام حداقل ۲ حرف میباشد"),
  lastName: z.string().min(2, " نام خانوادگی حداقل ۲ حرف میباشد"),
  fatherName: z.string().min(2, "نام پدر  حداقل ۲ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  gift: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(1, "مبلغ باید ۱۱ رقم باشد")

});
