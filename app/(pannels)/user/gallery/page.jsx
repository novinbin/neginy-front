"use client";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import Dropzone from "react-dropzone";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import SubmitButton from "@/components/submit-button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import { imagesSchema } from "@/lib/validation/admin/user";


const UsersPage = () => {
    const [currentImage, setCurrentImage] = useState(null);
    const form = useForm({
        resolver: zodResolver(imagesSchema),
        defaultValues: { images: [] },
        mode: "onSubmit",
    });

    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        formState:
        { isSubmitting },
    } = form;



    const onSubmit = async (values) => {
        const formData = new FormData();
    values.images.forEach((img, index) => {
      if (img.file) {
        formData.append(`photo_${index}`, img.file);
      }
    });


        try {
            const response = await axios.post("/api/user/weddings/create/gallery", formData);
            if (response.status === 200) {
                toast.success(<ToastSuccess text={"با موفقیت ثبت شد"} />);
                reset();
            }
        } catch (error) {
            toast.error(
                <ToastError
                    text={
                        error?.response?.data?.message ||
                        "خطای داخلی، لطفا دوباره تلاش کنید."
                    }
                />,
            );
        }
    };


    const onDropImages = useCallback(
        (files) => {
            const existingImages = getValues("images") || [];
            const newImages = files.map((file) => ({
                file,
                size: String(file.size),
                name: file.name,
                type: file.type,
            }));
            setValue("images", [...existingImages, ...newImages], {
                shouldValidate: true,
            });
        },
        [getValues, setValue],
    );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios
            .get(
                `/api/admin/config/photo`,
            )
            .then((response) => {
                setCurrentImage(response.data.data[0].value);
                setValue("formalityPhotol", null);
            })
            .catch((err) => { });
    };

    return (
        <div className="px-0 lg:px-10">


            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="my-9 text-center text-xl">افزودن گالری عروسی</h2>
                    <div className="max-md:grc grid grid-cols-1 justify-center gap-4">
                        <FormField
                            control={control}
                            name="images"
                            render={({ field }) => (
                                <FormItem className="col-span-full">
                                    <FormLabel>گالری </FormLabel>
                                    <FormControl>
                                        <Dropzone
                                            maxSize={1 * 1024 * 1024}
                                            maxFiles={10}
                                            onDrop={onDropImages}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div
                                                        {...getRootProps()}
                                                        className="mx-auto flex cursor-pointer items-center justify-center rounded-xl border-[3px] border-dashed border-primary p-4"
                                                    >
                                                        <input {...getInputProps()} />
                                                        <div className="flex flex-col items-center text-muted-foreground">
                                                            <span>آپلود تصاویر</span>
                                                            <span className="mt-2 text-xs">
                                                                برای انتخاب تصاویر کلیک کنید و یا تصاویر خود
                                                                را داخل کادر بکشید (حداکثر با حجم ۱ مگابایت)
                                                            </span>
                                                            <Upload
                                                                size={60}
                                                                className="mt-2 text-primary"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                                                        {getValues("images").map((img, index) => (
                                                            <div
                                                                className="relative rounded-lg"
                                                                key={index}
                                                            >
                                                                <Image
                                                                    src={
                                                                        img.file
                                                                            ? URL.createObjectURL(img.file)
                                                                            : img.url
                                                                    }
                                                                    className="aspect-video w-32 cursor-pointer rounded-lg"
                                                                    width={240}
                                                                    height={160}
                                                                    alt={`Business image ${index}`}
                                                                />
                                                                <div
                                                                    onClick={() => deleteImage(img.key)}
                                                                    className="absolute -left-2 -top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-primary"
                                                                >
                                                                    <X size={16} className="text-white" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </FormControl>
                                    <FormMessage className="text-primary" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-4 flex w-full items-center justify-center">
                        <SubmitButton className="mt-3 w-16" loading={isSubmitting}>
                            افزودن
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default UsersPage;
