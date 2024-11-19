import Image from "next/image";
import notFoundImg from "@/public/img/404/404.jpg";
import Link from "next/link";

function NotFound() {
  return (
    <div className="relative h-screen w-screen">
      <Image
        src={notFoundImg}
        alt="404"
        className="h-screen w-full"
        width={540}
        height={480}
      />
      <Link
        href="/"
        className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-3/4 rounded-xl border border-[#eee] bg-white px-7 py-2 font-bold duration-500 hover:bg-[#444] hover:text-white"
      >
        صفحه اصلی
      </Link>
      <p className="absolute lg:right-1/3 lg:bottom-7 max-lg:bottom-2 whitespace-nowrap lg:-translate-x-1/3 max-lg:left-1/2 max-lg:-translate-x-1/2 -translate-y-3/4 rounded-xl border border-[#eee] bg-white px-7 py-2 font-bold duration-500 ">
        برای درخواست شما صفحه ایی یافت نشد.😓
      </p>
    </div>
  );
}

export default NotFound;
