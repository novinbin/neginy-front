import { z } from "zod";

const imageSchema = z.union([

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


  z
    .string()
    .refine((url) => {
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return urlPattern.test(url);
    }, "لینک تصویر باید یک URL معتبر باشد")
    .transform(() => "") 
    .nullable(),


  z.literal(""),
]);

const imageLandingPage =z.union([

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


  z
    .string()
    .refine((url) => {
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return urlPattern.test(url);
    }, "لینک تصویر باید یک URL معتبر باشد")
    .transform(() => "") 
    .nullable(),

 
  z.literal(""),
]);

export const bannerSchema = z.object({
  photo: imageLandingPage,
});

export const editBannerSchema = z.object({
  photo: imageLandingPage,
});

export const formalitySchema = z.object({
  formalityName: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  formalityDescription: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  formalityPhoto: imageLandingPage,
});

export const editFormalitySchema = z.object({
  formalityName: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  formalityDescription: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  formalityPhoto: imageLandingPage,
});

export const HomePageOnlineGiftSchema = z.object({
  onlineGiftsDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  onlineGiftsPhoto: imageLandingPage,
});

export const editHomePageOnlineGiftSchema = z.object({
  onlineGiftsDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  onlineGiftsPhoto: imageLandingPage,
});

export const HomePageServicesSchema = z.object({
  servicesGalleryDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  servicesDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  servicesPhotoOne: imageLandingPage,
  servicesPhotoTwo: imageLandingPage,
  servicesPhotoThree: imageLandingPage,
});

export const editHomePageServicesSchema = z.object({
  servicesGalleryDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  servicesDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  servicesPhotoOne: imageLandingPage,
  servicesPhotoTwo: imageLandingPage,
  servicesPhotoThree: imageLandingPage,
});

export const HomePageContactSchema = z.object({
  contactDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  contactPhotoOne: imageLandingPage,
  contactPhotoTwo: imageLandingPage,
  contactPhotoThree: imageLandingPage,
  contactPhotoFour: imageLandingPage,
});

export const editHomePageContactSchema = z.object({
  contactDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  contactPhotoOne: imageLandingPage,
  contactPhotoTwo: imageLandingPage,
  contactPhotoThree: imageLandingPage,
  contactPhotoFour: imageLandingPage,
});

export const HomePagePanelSchema = z.object({
  panelDescription: z
    .string()
    .min(2, "نام  حداقل ۲ حرف میباشد")
    .max(50, "توضیحات بیشتر از 50 کلمه نمی تواند باشد."),
  panelServiesDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  panelPhoto: imageLandingPage,
});

export const editHomePagePanelSchema = z.object({
  panelDescription: z
    .string()
    .min(2, "نام  حداقل ۲ حرف میباشد")
    .max(50, "توضیحات بیشتر از 50 کلمه نمی تواند باشد."),
  panelServiesDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  panelPhoto: imageLandingPage,
});

export const HomePageweddingPlannerSchema = z.object({
  plannerDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
});

export const editHomePageweddingPlannerSchema = z.object({
  plannerDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
});

export const HomePageFooterSchema = z.object({
  footerAddress: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  footerPhone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  footerIg: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  footerWhatsApp: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  footerTelegram: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  footerEmail: z
    .union([
      z.string().length(0, "فرمت ایمیل صحیح نمیباشد"),
      z
        .string()
        .max(100, "ایمیل حداکثر ۱۰۰ حرف میباشد")
        .email("فرمت ایمیل صحیح نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const editHomePageFooterSchema = z.object({
  footerAddress: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  footerPhone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  footerIg: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  footerWhatsApp: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  footerTelegram: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  footerEmail: z
    .union([
      z.string().length(0, "فرمت ایمیل صحیح نمیباشد"),
      z
        .string()
        .max(100, "ایمیل حداکثر ۱۰۰ حرف میباشد")
        .email("فرمت ایمیل صحیح نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const aboutSchema = z.object({
  aboutName: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  aboutDescription: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  aboutPhoto: imageLandingPage,
});

export const editAboutSchema = z.object({
  aboutName: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  aboutDescription: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  aboutPhoto: imageLandingPage,
});

export const packageSchema = z.object({
  packageName: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  packagePrice: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  packagePhoto: imageLandingPage,
});

export const editPackageSchema = z.object({
  packageName: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  packagePrice: z.string().min(2, "توضیحات حداقل ۲ حرف میباشد"),
  packagePhoto: imageLandingPage,
});

export const serveSchema = z.object({
  servePhotoOne: imageLandingPage,
  servePhotoTwo: imageLandingPage,
  servePhotoThree: imageLandingPage,
  servePhotoFour: imageLandingPage,
});

export const EnviromentSchema = z.object({
  enviromentDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  enviromentPhotoOne: imageLandingPage,
  enviromentPhotoTwo: imageLandingPage,
  enviromentPhotoThree: imageLandingPage,
  enviromentPhotoFour: imageLandingPage,
  enviromentPhotoFive: imageLandingPage,
});

export const editEnviromentSchema = z.object({
  enviromentDescription: z.string().min(2, "نام  حداقل ۲ حرف میباشد"),
  enviromentPhotoOne: imageLandingPage,
  enviromentPhotoTwo: imageLandingPage,
  enviromentPhotoThree: imageLandingPage,
  enviromentPhotoFour: imageLandingPage,
  enviromentPhotoFive: imageLandingPage,
});
