"use client";

import { axios } from "@/lib/axios";
import bg from "@/public/img/weddingCard/bg.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { userSchema } from "@/lib/validation/admin/user";
import useMount from "@/hooks/use-mount";
import Link from "next/link";
import { routes } from "@/routes/routes";
import SideBar from "./sidebar/sidebar";
import Header from "./header/header";

const WeddingCardLayout = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex min-h-screen w-full flex-row"
    >
   
      <div className="flex w-full flex-col lg:w-full">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-3">
          <div className="min-h-full rounded-lg p-3 py-5">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default WeddingCardLayout;
