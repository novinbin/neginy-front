import { routes } from "@/routes/routes";
import {
  Gem,
  Home,
  Images,
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  Package,
  Settings2,
} from "lucide-react";
import Settings from "react-multi-date-picker/plugins/settings";

export const navItems = [
  {
    title: "داشبورد و اطلاعات کاربری",
    type: "text",
  },

  {
    title: "داشبورد",
    type: "link",
    href: routes.user.dashboard,
    icon: (size, strokeWidth) => (
      <LayoutDashboard size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "گالری عروسی",
    type: "link",
    href: "/user/gallery",
    icon: (size, strokeWidth) => (
      <Images size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "درخواست های رزرو",
    type: "link",
    href: routes.user.reservation.root,
    icon: (size, strokeWidth) => (
      <MessagesSquare size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "پکیج های من",
    type: "link",
    href: routes.user.package.root,
    icon: (size, strokeWidth) => (
      <Package size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "لیست مراسم ها",
    type: "link",
    href: routes.user.ceremony.root,
    icon: (size, strokeWidth) => (
      <Gem size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
];
