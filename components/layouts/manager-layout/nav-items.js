import { routes } from "@/routes/routes";
import {
  AlignRight,
  BadgeInfo,
  BaggageClaim,
  BookImage,
  FileText,
  Gift,
  HandHeart,
  Headset,
  Home,
  ImageDown,
  ImagePlay,
  ImagePlus,
  Images,
  LayoutDashboard,
  LayoutGrid,
  LayoutList,
  LayoutPanelTop,
  MessageSquare,
  MessagesSquare,
  MonitorIcon,
  NotebookPen,
  Package,
  PanelBottom,
  PartyPopper,
  Presentation,
  Settings,
  Settings2,
  SquarePen,
  UserRoundPlus,
  Users,
  UsersRound,
} from "lucide-react";

export const navItems = [
  {
    title: "داشبورد و اطلاعات کاربری",
    type: "text",
  },

  {
    title: "داشبورد",
    type: "link",
    href: routes.admin.dashboard,
    icon: (size, strokeWidth) => (
      <LayoutDashboard size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "مدیریت کاربران",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Users size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه کاربران",
        href: routes.admin.users.root,
        icon: (size, strokeWidth) => (
          <UsersRound size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ساخت کاربر جدید",
        href: routes.admin.users.create,
        icon: (size, strokeWidth) => (
          <UserRoundPlus size={size || 18} strokeWidth={strokeWidth || 1.5} />
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
        href: routes.admin.comments.root,
        icon: (size, strokeWidth) => (
          <MessageSquare size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "اشتراک ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <LayoutList size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه اشتراک ها",
        href: routes.admin.subscriptions.root,
        icon: (size, strokeWidth) => (
          <LayoutGrid size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ساخت اشتراک جدید",
        href: routes.admin.subscriptions.create,
        icon: (size, strokeWidth) => (
          <SquarePen size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "سرویس",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Settings2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه سرویس ها",
        href: routes.admin.services.root,
        icon: (size, strokeWidth) => (
          <Settings size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ساخت سرویس جدید",
        href: routes.admin.services.create,
        icon: (size, strokeWidth) => (
          <NotebookPen size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "مدیریت کارت عروسی",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <BookImage size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "قالب پس زمینه",
        href: routes.admin.weddingCard.root,
        icon: (size, strokeWidth) => (
          <Images size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  // {
  //   title: "مدیریت متن کارت عروسی",
  //   type: "subMenu",
  //   icon: (size, strokeWidth) => (
  //     <FileText size={size || 18} strokeWidth={strokeWidth || 1.5} />
  //   ),
  //   subMenu: [
  //     {
  //       title: "متن کارت عروسی",
  //       href: routes.admin.weddingCardText.root,
  //       icon: (size, strokeWidth) => (
  //         <AlignRight size={size || 18} strokeWidth={strokeWidth || 1.5} />
  //       ),
  //     },
  //   ],
  // },
  {
    title: "مدیریت محتوای اصلی",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Presentation size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "تغییر عکس بنر",
        href: routes.admin.homePage.image,
        icon: (size, strokeWidth) => (
          <ImageDown size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تشریفات و خدمات عروسی",
        href: routes.admin.homePage.formality,
        icon: (size, strokeWidth) => (
          <PartyPopper size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "پرداخت آنلاین هدیه",
        href: routes.admin.homePage.online,
        icon: (size, strokeWidth) => (
          <Gift size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "خدمات ما صفحه اصلی",
        href: routes.admin.homePage.services,
        icon: (size, strokeWidth) => (
          <BaggageClaim size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "پنل تخصصی",
        href: routes.admin.homePage.panel,
        icon: (size, strokeWidth) => (
          <LayoutPanelTop size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ودینگ پلنر",
        href: routes.admin.homePage.planner,
        icon: (size, strokeWidth) => (
          <HandHeart size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "مدیریت محتوای صفحات",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Presentation size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "پاورقی سایت",
        href: routes.admin.homePage.footer,
        icon: (size, strokeWidth) => (
          <PanelBottom size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "درباره ما سایت",
        href: routes.admin.homePage.about,
        icon: (size, strokeWidth) => (
          <BadgeInfo size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تماس با ما سایت",
        href: routes.admin.homePage.contact,
        icon: (size, strokeWidth) => (
          <Headset size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "خدمات سایت",
        href: routes.admin.homePage.servicPage,
        icon: (size, strokeWidth) => (
          <MonitorIcon size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "محیطی مجزا نسبت به هر کسب و کار",
        href: routes.admin.homePage.enviroment,
        icon: (size, strokeWidth) => (
          <Images size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "مدیریت پکیج ها",
    type: "link",
    href: routes.admin.package.root,
    icon: (size, strokeWidth) => (
      <Package size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
  {
    title: "اشتراک های گالری",
    type: "link",
    href: routes.admin.gallery,
    icon: (size, strokeWidth) => (
      <Package size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
];
