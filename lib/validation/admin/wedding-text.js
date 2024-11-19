import { z } from "zod";

export const weddingTextSchema = z.object({
  text: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
});

export const editWeddingTextSchema = z.object({
  text: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
});
