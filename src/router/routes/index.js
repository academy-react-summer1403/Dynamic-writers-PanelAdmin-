
// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import Wizard from "../../pages/NewCourse";
import Error500 from "../../pages/Error500";
import AssistantList from "../../pages/Assistants/AssistantList";
import AssistantView from "../../pages/Assistants/AssistantView";
import WorkAssistantsList from "../../pages/WorkAssistants/WorkAssistantsList";
import CourseLevelsList from "../../pages/CourseLevels/CourseLevelsList";
import ClassRoomsList from "../../pages/ClassRooms/ClassRoomsList";
import BuildingsList from "../../pages/Buildings/BuildingsList";
import Technology from "../../pages/Technology/Technology";
import StatusList from "../../pages/Status/StatusList";
import DepartmentList from "../../pages/Department/DepartmentList";
import TermList from "../../pages/Term/TermList";

const getLayout = {
  blank: <BlankLayout />,
  horizontal: <HorizontalLayout />,
  vertical: <VerticalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const NewsView = lazy(() => import('../../pages/News/view'))
const NewsEdit = lazy(() => import('../../pages/News/edit'))
const NewsAdd = lazy(() => import('../../pages/News/add'))
const NewsList = lazy(() => import('../../pages/News/list'))
const CommentsCourseList = lazy(() => import("../../pages/CourseComments/list"));
const DetailComment = lazy(() => import("../../pages/CourseComments/view/TableHover"));
const DetailCommentNews = lazy(() => import("../../pages/News/view/TableHover"));

const CategoryNews = lazy(() => import("../../pages/Category/CategoryNews"));

const CoursesList = lazy(() => import('../../pages/Courses/list'))
const CourseView = lazy(() => import('../../pages/Courses/view'))
const UserList = lazy(() => import('../../pages/user/list'))
const UserView = lazy(() => import('../../pages/user/view'))
const ReserveList = lazy(() => import('../../pages/Reserve/ReserveList'))
const Payments = lazy(() => import('../../pages/Payments/CoursePayment'))

const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/payments",
    element: <Payments />,
  },
  {
    path: "/terms",
    element: <TermList />,
  },
  {
    path: "/technology",
    element: <Technology />,
  },
  {
    path: "/status",
    element: <StatusList />,
  },
  {
    path: "/departments",
    element: <DepartmentList />,
  },
  {
    path: "/assistants/works",
    element: <WorkAssistantsList />,
  },
  {
    path: "/courseLevels",
    element: <CourseLevelsList />,
  },
  {
    path: "/classRooms",
    element: <ClassRoomsList />,
  },
  {
    path: "/buildings",
    element: <BuildingsList />,
  },
  {
    path: "/assistants/list",
    element: <AssistantList />,
  },
  {
    path: "/assistants/view/:id",
    element: <AssistantView />,
  },
  {
    path: "/assistants/view",
    element: <Navigate to='/assistants/view/ae32dcc5-279d-ef11-b6e7-9ae1b6d917d9' />,
  },
  {
    path: "/CourseComment",
    element: <CommentsCourseList />,
  },
  {
    path: '/comments/view',
    element: <Navigate to='/comments/view/b0e7ea29-c58b-ef11-b6e1-c9f96e84244f/52af918a-1f31-ef11-b6c8-c6ea51a59bbe' />
  },
  {
    path: "/comments/view/:id/:courseId",
    element: <DetailComment />,
  },
  {
    path: "/commentsNews/view",
    element: <Navigate to='/commentsNews/view/1' />
  },
  {
    path: "/commentsNews/view/:id",
    element: <DetailCommentNews />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    element: <CoursesList />,
    path: '/courses/list'
  },
  {
    element: <ReserveList />,
    path: '/courses/reserves'
  },
  {
    element: <Wizard />,
    path: '/courses/new'
  },
  {
    path: '/courses/view',
    element: <Navigate to='/courses/view/0ed74730-9012-ef11-b6c2-f4b229435c5d' />
  },
  {
    element: <CourseView />,
    path: '/courses/view/:id'
  },
  {
    element: <UserList />,
    path: '/user/list'
  },
  {
    path: '/user/view',
    element: <Navigate to='/user/view/1' />
  },
  {
    element: <UserView />,
    path: '/user/view/:id'
  },
  {
    element: <NewsList />,
    path: '/News/list'
  },
  {
    element: <Navigate to='/News/view/1' />,
    path: '/News/view'
  },
  {
    element: <NewsView />,
    path: '/News/view/:id'
  },
  {
    element: <Navigate to='/News/edit/1' />,
    path: '/News/edit'
  },
  {
    element: <NewsEdit />,
    path: '/News/edit/:id'
  },
  {
    element: <NewsAdd />,
    path: '/News/add'
  },
  {
    element: <CategoryNews />,
    path: '/Cayegory/CategoryNews'
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error500",
    element: <Error500 />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            isObjEmpty(route.element.props) && isBlank === false 
              ?
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
