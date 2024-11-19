import { z } from "zod";

export const signInSchema = z.object({
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  password: z.string().min(8, "رمز ورود حداقل ۸ حرف میباشد"),
});
