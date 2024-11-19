import Image from "next/image";
import pic from "@/public/img/svg-guest/pic-vid.png";
import a from "@/public/img/svg-guest/pic.svg";
import b from "@/public/img/svg-guest/video.svg";
import Link from "next/link";
import { routes } from "@/routes/routes";

function PicVideo() {
  return (
    <div className="flex items-center justify-center lg:mt-32">
      <div className="mx-auto grid w-11/12 lg:grid-cols-2 gap-9 items-center justify-center">
        <Link
          href={routes.weddingCard.gallery.pictures}
          className="relative flex w-full items-center justify-center"
        >
          <div className="absolute lg:h-[30rem] lg:w-[30rem] max-lg:h-64 max-lg:w-64 rounded-xl bg-[#DED3DE] bg-opacity-50"></div>
          <Image
            src={pic}
            alt=""
            width={540}
            height={540}
            className="lg:h-[33rem] lg:w-[33rem] rounded-xl max-lg:h-72 max-lg:w-72"
          />
          <Image
            src={a}
            alt=""
            width={540}
            height={540}
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-xl"
          />
        </Link>
        <Link
          href={routes.weddingCard.gallery.videos}
          className="relative flex w-full items-center justify-center"
        >
          <div className="absolute lg:h-[30rem] lg:w-[30rem] max-lg:h-64 max-lg:w-64 rounded-xl bg-[#DED3DE] bg-opacity-50"></div>
          <Image
            src={pic}
            alt=""
            width={540}
            height={540}
            className="lg:h-[33rem] lg:w-[33rem] rounded-xl max-lg:h-72 max-lg:w-72"
          />
          <Image
            src={b}
            alt=""
            width={540}
            height={540}
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-xl"
          />
        </Link>
      
      </div>
    </div>
  );
}

export default PicVideo;
