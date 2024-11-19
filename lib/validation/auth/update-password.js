import { z } from "zod";

export const updatePasswordSchema = z.object({
  current_password: z.string().min(8, "رمز ورود فعلی حداقل ۸ حرف میباشد"),
  password: z.string().min(8, "رمز ورود جدید حداقل ۸ حرف میباشد"),
  password_confirmation: z.string().min(8, "تکرار رمز ورود حداقل ۸ حرف میباشد"),
});
