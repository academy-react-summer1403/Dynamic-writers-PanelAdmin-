import { Mail, Home, Airplay, Circle, MessageCircle, User,Clipboard,FileText,Menu, DollarSign, Grid, Settings, Briefcase, Users} from "react-feather";
import { FaBuilding } from "react-icons/fa";

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
            id: "scheduleList ",
            title: " زمان کلاس ها",
            icon: <Circle size={12} />,
            navLink: "/scheduleList",
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
        icon: <Circle size={20} />,
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
        ]
      },
      {
        id: "reserve list",
        title: "لیست رزرو ها",
        icon: <Circle size={12} />,
        navLink: "/courses/reserves",
      },
      {
        id: "socialGroups",
        title: "لیست گروه ها",
        icon: <Circle size={12} />,
        navLink: "/socialGroups",
      },
      {
        id: "category",
        title: "دسته بندی ها",
        icon: <Circle size={20} />,
        children: [
          {
            id: "technology",
            title: '  تکنولوژی',
            icon: <Circle size={12} />,
            navLink: "/technology",
          },
          {
            id: "status",
            title: "  وضعیت ها",
            icon: <Circle size={12} />,
            navLink: "/status",
          },
          {
            id: "courseLevels",
            title: "  سطح ها",
            icon: <Circle size={12} />,
            navLink: "/courseLevels",
          },
          {
            id: "classRooms",
            title: " کلاس ها",
            icon: <Circle size={12} />,
            navLink: "/classRooms",
          },
          {
            id: "terms",
            title: " ترم ها",
            icon: <Circle size={12} />,
            navLink: "/terms",
          },
        ]
      },
    ],
  },
  {
    id: "Payments",
    title: "پرداخت ها",
    icon: <DollarSign size={20} />,
    navLink: "/payments",
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
      {
        id: "CategoryNews",
        title: " افزودن دسته بندی ",
        icon: <Circle size={12} />,
        navLink: "/Cayegory/CategoryNews"
      },
    ],
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
    id: "buildings",
    title: "ساختمان ها",
    icon: <FaBuilding size={20} />,
    children: [
      {
        id: "buildings",
        title: "ساختمان ها",
        icon: <Circle size={20} />,
        navLink: "/buildings",
      },
      {
        id: "departments",
        title: "بخش ها",
        icon: <Circle size={20} />,
        navLink: "/departments",
      },
    ]
  },
  {
    id: "jobs",
    title: "شغل ها",
    icon: <Briefcase size={20} />,
    navLink: "/jobs",
  },
];
