import { routes } from "@/routes/routes";
import {
  CalendarSearch,
  Cog,
  Home,
  LayoutDashboard,
  LayoutList,
  MessageSquare,
  MessagesSquare,
  Settings,
  Settings2,
} from "lucide-react";

export const navItems = [


  {
    title: "داشبورد و اطلاعات کاربری",
    type: "text",
  },

  {
    title: "داشبورد",
    type: "link",
    href: routes.weddingPlaner.dashboard,
    icon: (size, strokeWidth) => (
      <LayoutDashboard size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "اشتراک ها",
    type: "link",
    href: routes.weddingPlaner.subscription.root,
    icon: (size, strokeWidth) => (
      <CalendarSearch size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
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
        href: routes.weddingPlaner.comments.root,
        icon: (size, strokeWidth) => (
          <MessageSquare size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "مدیریت خدمات",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Settings2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه خدمات من",
        href: routes.weddingPlaner.services.root,
        icon: (size, strokeWidth) => (
          <Settings size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "زمانبندی",
    type: "link",
    href: routes.weddingPlaner.timing.root,
    icon: (size, strokeWidth) => (
      <CalendarSearch size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
];
