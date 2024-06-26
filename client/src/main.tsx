// React's Imports
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// App's Internal Imports
import {
  Home,
  Grades,
  Courses,
  CourseReport,
  StudentReport,
  CourseDetails,
  StudentDetails,
} from "./routes";
import "/public/styles/index.css";
import { Header, Footer } from "./components";

// App's External Imports
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <StudentDetails />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:id",
    element: <CourseDetails />,
  },
  {
    path: "/grades",
    element: <Grades />,
  },
  {
    path: "/report/student/:id",
    element: <StudentReport />,
  },
  {
    path: "/report/course/:id",
    element: <CourseReport />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextTopLoader color="#7E22CE" showSpinner={false} />
    <Header />
    <Toaster reverseOrder={false} position="top-center" />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>
);
