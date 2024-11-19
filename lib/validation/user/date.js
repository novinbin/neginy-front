import { z } from "zod";

export const userDateSchema = z.object({
  user_description: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),

});

export const userReservationSchema = z.object({
  user_description: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),});

export const userCommentSchema = z.object({
  description: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  rating: z.number().min(1, "امتیاز خود را انتخاب کنید."),
});
