import { routes } from "@/routes/routes";
import {
  Ban,
  CalendarSearch,
  Check,
  CircleEllipsis,
  FilePen,
  Home,
  LayoutDashboard,
  Loader,
  MessageSquare,
  MessagesSquare,
  School,
  Settings,
  Settings2,
  SquarePen,
  UserRound,
  UserRoundPlus,
  X,
} from "lucide-react";

export const navItems = [
  {
    title: "داشبورد و اطلاعات کاربری",
    type: "text",
  },

  {
    title: "داشبورد",
    type: "link",
    href: routes.studio.dashboard,
    icon: (size, strokeWidth) => (
      <LayoutDashboard size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "پروفایل آتلیه",
    type: "link",
    href: routes.studio.profile,
    icon: (size, strokeWidth) => (
      <School size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "اشتراک ها",
    type: "link",
    href: routes.studio.subscription.root,
    icon: (size, strokeWidth) => (
      <CalendarSearch size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "درخواست های رزرو",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <SquarePen size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه",
        href: routes.studio.reserve.root,
        icon: (size, strokeWidth) => (
          <FilePen size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },

      {
        title: "در انتظار تایید",
        href: routes.studio.reserve.pending.root,
        icon: (size, strokeWidth) => (
          <Loader size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "در انتظار پرداخت",
        href: routes.studio.reserve.payment.root,
        icon: (size, strokeWidth) => (
          <CircleEllipsis size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تایید و پرداخت شده",
        href: routes.studio.reserve.accept.root,
        icon: (size, strokeWidth) => (
          <Check size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "رد شده",
        href: routes.studio.reserve.reject.root,
        icon: (size, strokeWidth) => (
          <Ban size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "کنسل شده",
        href: routes.studio.reserve.cancel.root,
        icon: (size, strokeWidth) => (
          <X size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "مدیریت نظرات",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <MessagesSquare size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه نظرات",
        href: routes.studio.comments.root,
        icon: (size, strokeWidth) => (
          <MessageSquare size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "مدیریت سرویس",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Settings2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه سرویس های من",
        href: routes.studio.services.root,
        icon: (size, strokeWidth) => (
          <Settings size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "زمانبندی",
    type: "link",
    href: routes.studio.timing.root,
    icon: (size, strokeWidth) => (
      <CalendarSearch size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
];
