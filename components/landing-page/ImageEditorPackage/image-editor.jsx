"use client";

import { useEffect, useRef } from "react";
import ImageEditor from "tui-image-editor";
import FileSaver from "file-saver";
import "tui-image-editor/dist/tui-image-editor.css";
import logo from "@/public/img/logo/logo.svg";

const ImageEditorPackage = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const locale_ru_RU = {
      Crop: "برش",
      Delete: "حذف",
      DeleteAll: "حذف همه",
      Reset: "بازگردانی به حالت اول",
      Redo: "بعدی",
      Undo: "قبلی",
      History: "تاریخچه",
      Hand: "ابزار دست",
      ZoomOut: "کوچک نمایی",
      ZoomIn: "بزرگ نمایی",
      Download: "ذخیره",
      Load: "بارگذاری تصویر",
      Resize: "تنظیم اندازه",
      Flip: "پشت رو شدن",
      Rotate: "چرخاندن",
      Draw: "کشیدن",
      Shape: "اشیاء",
      Icon: "ایکون",
      Text: "افزودن متن",
      Mask: "ماسک",
      Filter: "فیلتر",

      Grayscale: "طیف خاکستری",
      Sepia: "",
      Blur: "",
      Emboss: "برجسته کردن",
      Invert: "معکوس کردن",
      Sepia2: "",
      Sharpen: "تیز",
      "Remove White": "حذف رنگ سفید",
      Distance: "فاصله",
      Brightness: "روشنایی",
      Noise: "",
      Pixelate: "",
      "Color Filter": "فیلتر رنگ",
      Threshold: "",
      Tint: "رنگ",
      Multiply: "",
      "Load Mask Image": "",
      Apply: "افزودن",
      Bold: "پر رنگ",
      Italic: "مورب",
      Underline: "خط زیر متن",
      Left: "چپ",
      Center: "وسط",
      Right: "راست",
      Color: "رنگ",
      Arrow: "جهت",
      "Arrow-2": "جهت-2",
      "Arrow-3": "جهت-3",
      "Star-1": "ستاره-1",
      "Star-2": "ستاره-2",
      Polygon: "چندضلعی",
      Location: "موقعیت",
      Heart: "قلب",
      Bubble: "حباب",
      "Custom icon": "آیکون سفارشی",
      Stroke: "",
      Rectangle: "مستطیل",
      Circle: "دایره",
      Triangle: "مثلث",
      Fill: "پر کردن",
      Free: "",
      Straight: "مستقیم",
      Range: "اندازه",
      "Flip X": "پشت رو شدن در جهت عرض",
      "Flip Y": "پشت و رو شدن در جهت ارتفاع",
      Custom: "سفارشی",
      Square: "مربع",
      Cancel: "لغو",
      Width: "عرض",
      Height: "ارتفاع",
      "Lock Aspect Ratio": "",
      "Text size": "اندازه فونت",
    };

    if (editorRef.current) {
      const instance = new ImageEditor(editorRef.current, {
        includeUI: {
          loadImage: {
            path: "/img/img-editor/img-editor.jpg",
            name: "SampleImage",
          },
          locale: locale_ru_RU,
          initMenu: "filter",
          menuBarPosition: "bottom",
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70,
        },
      });

      return () => {
        instance.destroy();
      };
    }
  }, []);

  return (
    <div
      id="tui-image-editor"
      className="!ltr !h-screen"
      dir="ltr"
      ref={editorRef}
    ></div>
  );
};

export default ImageEditorPackage;
