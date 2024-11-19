import { z } from "zod";

export const userSchema = z.object({
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
  state: z
    .union([z.string().min(1, "نام شهرستان در صورت نیاز حداقل ۲ حرف میباشد")])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  city: z
    .union([z.string().min(1, "نام استان در صورت نیاز حداقل ۲ حرف میباشد")])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  national_code: z
    .union([
      z
        .string()
        .min(10, "کد ملی باید ۱۰ رقم باشد")
        .max(10, "کد ملی باید ۱۰ رقم باشد")
        .nullish(),
      z.literal(""),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  shaba_number: z
    .union([
      z
        .string()
        .min(24, "شبا باید 24 رقم باشد")
        .max(26, "شبا باید 26 رقم باشد")
        .nullish(),
      z.literal(""),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  password: z.string().min(8, "رمز ورود حداقل ۸ حرف میباشد"),
  password_confirmation: z.string().min(8, "تکرار رمز ورود حداقل ۸ حرف میباشد"),
  role: z.string().min(1, { message: "انتخاب نقش الزامی می باشد." }),
});

const galleryImage = z
  .custom()
  .refine((file) => file, "انتخاب تصویر الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 1;
  }, "فایل انتخابی حداکثر باید 1 مگابایت باشد");

const imageSchema = z.union([
  // Validation for image files
  z
    .instanceof(File)
    .refine((file) => file, "انتخاب تصویر الزامی میباشد")
    .refine(
      (file) => file.type.startsWith("image/"),
      "فایل انتخابی حتما باید تصویر باشد",
    )
    .refine(
      (file) => file.size < 1024 * 1024 * 2,
      "فایل انتخابی حداکثر باید ۲ مگابایت باشد",
    )
    .nullable(),

  // Validation for URLs
  z
    .string()
    .refine((url) => {
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return urlPattern.test(url);
    }, "لینک تصویر باید یک URL معتبر باشد")
    .transform(() => "") // Transform valid URL to an empty string
    .nullable(),

  // Allow an empty string
  z.literal(""),
]);

export const editUserSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z.union([
    z
      .string()
      .email("فرمت ایمیل صحیح نمیباشد")
      .max(100, "ایمیل حداکثر ۱۰۰ حرف میباشد")
      .nullish(),
    z.literal(""),
  ]),
  national_code: z.union([
    z
      .string()
      .min(10, "کد ملی باید ۱۰ رقم باشد")
      .max(10, "کد ملی باید ۱۰ رقم باشد")
      .nullish(),
    z.literal(""),
  ]),
  role: z.string().min(1, { message: "انتخاب نقش الزامی می باشد." }),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی حداقل ۲ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z.union([
    z
      .string()
      .email("فرمت ایمیل صحیح نمیباشد")
      .max(100, "ایمیل حداکثر ۱۰۰ حرف میباشد")
      .nullish(),
    z.literal(""),
  ]),

  national_code: z.union([
    z
      .string()
      .min(10, "کد ملی باید ۱۰ رقم باشد")
      .max(10, "کد ملی باید ۱۰ رقم باشد")
      .nullish(),
    z.literal(""),
  ]),
  shaba_number: z.union([
    z
      .string()
      .min(24, "شبا باید 24 رقم باشد")
      .max(26, "شبا باید 26 رقم باشد")
      .nullish(),
    z.literal(""),
  ]),

  password: z.union([
    z.string().min(8, "رمز عبور ورود حداقل ۸ حرف میباشد").nullish(),
    z.literal(""),
  ]),
  password_confirmation: z.union([
    z.string().min(8, "تکرار رمز عبور ورود حداقل ۸ حرف میباشد").nullish(),
    z.literal(""),
  ]),
});

const imageLandingPage = z
  .custom()
  .refine((file) => file, "انتخاب تصویر الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 1;
  }, "فایل انتخابی حداکثر باید 1 مگابایت باشد");

export const editUserBusinessSchema = z.object({
  business_name: z.string().min(2, "نام کسب و کار حداقل ۲ حرف میباشد"),
  phone_1: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),

  phone_2: z
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
    .nullable()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),

  state: z.string().min(1, "نام شهرستان در صورت نیاز حداقل ۲ حرف میباشد"),
  city: z.string().min(1, "نام استان در صورت نیاز حداقل ۲ حرف میباشد"),

  address: z.string().min(2, "آدرس حداقل ۲ حرف میباشد"),

  introduction: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۲ حرف میباشد"),
      z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),

  instagram: z
    .union([
      z.string().length(0, "اینستاگرام در صورت نیاز حداقل ۲ حرف میباشد"),
      z.string().min(2, "اینستاگرام حداقل ۲ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  images: z.any(),
  profile_photo: z.any(),
});
