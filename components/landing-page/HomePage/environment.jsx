import Image from "next/image";
import bg from "@/public/img/environment/bg.png";
import a from "@/public/img/contact/rings.jpg";
import b from "@/public/img/contact/table.jpg";
import c from "@/public/img/contact/dessert.jpg";

function Environment({ data }) {
  const keys = [
    "enviromentPhotoOne",
    "enviromentPhotoTwo",
    "enviromentPhotoThree",
    "enviromentPhotoFour",
    "enviromentPhotoFive",
    "enviromentDescription",
  ];

  const values = keys.reduce((acc, key) => {
    const item = data?.find((item) => item.key === key);
    acc[key] = item ? item.value : null;
    return acc;
  }, {});

  const {
    enviromentPhotoOne,
    enviromentPhotoTwo,
    enviromentPhotoThree,
    enviromentPhotoFour,
    enviromentPhotoFive,
    enviromentDescription,
  } = values;

  return (
    <div className="">
      <div className="relative">
        <Image
          src={bg}
          alt=""
          width={100}
          height={100}
          className="h-96 w-full"
        />
        <div className="absolute top-0 w-full">
          <div className="mx-auto w-11/12">
            <h2 className="text-2xl font-bold">
              محیطی مجزا نسبت به هر کسب و کار
            </h2>
            <p className="mt-9 text-justify">{enviromentDescription} </p>

            <div className="relative mt-12 flex items-center justify-center">
              <Image
                alt=""
                src={enviromentPhotoOne || a}
                width={540}
                height={480}
                className="absolute right-40 h-32 w-64 rounded-xl"
              />
              <Image
                alt=""
                src={enviromentPhotoTwo || b}
                width={540}
                height={480}
                className="absolute right-96 z-10 h-44 w-64 rounded-xl"
              />
              <Image
                alt=""
                src={enviromentPhotoThree || a}
                width={540}
                height={480}
                className="z-20 h-64 w-64 rounded-xl"
              />
              <Image
                alt=""
                src={enviromentPhotoFour || b}
                width={540}
                height={480}
                className="absolute left-96 z-10 h-44 w-64 rounded-xl"
              />
              <Image
                alt=""
                src={enviromentPhotoFive || a}
                width={540}
                height={480}
                className="absolute left-40 h-32 w-64 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Environment;
