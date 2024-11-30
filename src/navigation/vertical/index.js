import { Mail, Home, Airplay, Circle, MessageCircle, User,Clipboard,FileText,Menu, DollarSign} from "react-feather";

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
        id: 'course',
        title: 'لیست دوره ها',
        icon: <Circle size={12} />,
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
        ]
      },
      {
        id: "coursesAssistants",
        title: " لیست منتور ها ",
        icon: <Clipboard size={20} />,
        children: [
          {
            id: "courseAssistant list",
            title: " منتور ها",
            icon: <Circle size={12} />,
            navLink: "/assistants/list",
          },
          {
            id: "assistantsWork list",
            title: "فعالیت ها",
            icon: <Circle size={12} />,
            navLink: "/assistants/works",
          },
          {
            id: "courseAssistant view",
            title: "نمایش منتور",
            icon: <Circle size={12} />,
            navLink: "/assistants/view",
          },
        ]
      },
      {
        id: "reserve list",
        title: "لیست رزرو ها",
        icon: <Circle size={12} />,
        navLink: "/courses/reserves",
      },
    ],
  },
  {
    id: "Blogs",
    title: "اخبار و مقالات",
    icon: <FileText size={20} />,
    children: [
      {
        id: "listOfNews",
        title: "لیست اخبار و مقالات",
        icon: <Circle size={12} />,
        navLink: "/News/list",
      },
      {
        id: "viewOfNews",
        title: "نمایش خبر و مقاله",
        icon: <Circle size={12} />,
        navLink: "/News/view",
      },
      {
        id: "EditOfNews",
        title: "ویرایش خبر و مقاله",
        icon: <Circle size={12} />,
        navLink: "/News/edit",
      },
      {
        id: "AddOfNews",
        title: "افزودن خبر و مقاله",
        icon: <Circle size={12} />,
        navLink: "/News/add",
      },
    ],
  },
  {
    id: "category",
    title: "دسته بندی ها",
    icon: <Menu size={20} />,
    children: [
      {
        id: "CategoryNews",
        title: " دسته بندی اخبار و مقالات ",
        icon: <Circle size={12} />,
        navLink: "/Cayegory/CategoryNews"
      },
      
    ]
  },
  {
    id: "comments",
    title: "نظرات",
    icon: <MessageCircle size={20} />,
    children: [
      {
        id: "CourseComments",
        title: " نظرات دوره ",
        icon: <Circle size={12} />,
        navLink: "/CourseComment"
      },
    ]
  },
  {
    id: "Payments",
    title: "پرداخت ها",
    icon: <DollarSign size={20} />,
    navLink: "/payments",
  },
];
