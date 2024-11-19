"use client";

import Image from "next/image";
import { routes } from "@/routes/routes";
import Link from "next/link";
import UserPass from "./components/user-pass";
import bg from "@/public/img/auth/bg.png";
import logo from "@/public/img/logo/logo.svg";

const LoginPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
      className="flex items-center justify-center lg:h-screen"
    >
      <div className="mx-auto rounded-xl shadow-2xl max-xl:w-4/5 xl:w-3/5">
        <div className="grid items-center justify-center max-lg:grid-cols-1 lg:grid-cols-2">
          <div className="flex lg:h-[48rem] max-lg:h-[30rem]  flex-col items-center justify-evenly rounded-r-xl bg-white">
            <h1 className="text-center text-2xl">ورود</h1>
            <div className="mx-auto w-4/5">
              <UserPass />
            </div>
          </div>
          <div className="flex h-[48rem] flex-col items-center justify-evenly rounded-l-xl bg-[#DCD9D8] backdrop-blur-[4px] bg-opacity-30 max-lg:hidden">
            <Link href={"/"}>
            <Image
              src={logo}
              width={480}
              height={360}
              alt="logo"
              className="w-80"
            />
            </Link>
            <Link
              href={routes.auth.signUp}
              className="rounded-xl bg-[#68807A] px-9 py-2 text-white"
            >
              ثبت نام در سایت
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
