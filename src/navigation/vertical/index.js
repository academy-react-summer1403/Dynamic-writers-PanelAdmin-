import { Mail, Home, Airplay, Circle, MessageCircle, User, Clipboard } from "react-feather";

export default [
  {
    id: "dashboard",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "users",
    title: "کاربران",
    icon: <User size={20} />,
    children: [
      {
        id: "list",
        title: "لیست کاربران",
        icon: <Circle size={12} />,
        navLink: "/user/list",
      },
      {
        id: "view",
        title: "نمایش کاربر",
        icon: <Circle size={12} />,
        navLink: "/user/view",
      },
    ],
  },
  {
    id: "courses",
    title: " دوره ها ",
    icon: <Clipboard size={20} />,
    children: [
      {
        id: "course list",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/courses/list",
      },
      {
        id: "view course",
        title: "نمایش دوره",
        icon: <Circle size={12} />,
        navLink: "/courses/view",
      },
      {
        id: "addCourse",
        title: "دوره جدید",
        icon: <Circle size={12} />,
        navLink: "/courses/new",
      },
    ],
  },
  {
    id: "comments",
    title: "نظرات",
    icon: <MessageCircle size={20} />,
    navLink: "/comments",
  },
  // {
  //   id: "secondPage",
  //   title: "Second Page",
  //   icon: <Mail size={20} />,
  //   navLink: "/second-page",
  // },
  // {
  //   id: "smaplePage",
  //   title: "Sample Page",
  //   icon: <Airplay size={20} />,
  //   // navLink: "/sample",
  //   children: [
  //     {
  //       id: "invoiceList",
  //       title: "List",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/invoice/list",
  //     },
  //   ],
  // },
];
