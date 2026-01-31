import LoginUser from "../pages/login/LoginUser";
import Header from "../components/header/header";
import RegisterUser from "../pages/register/RegisterUser";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/reset-password/ResetPassword";
import ProfileUser from "../pages/profile/ProfileUser";
import AdminUsers from "../pages/users/AdminUsers";

const routes = [
    {
        path: "/",
        element: <Header />,
    },
    {
        path: "/login",
        element: <LoginUser />,
    },
    {
        path: "/register",
        element: <RegisterUser />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
    {
        path: "/profile",
        element: <ProfileUser />,
    },
    {
        path: "/users",
        element: <AdminUsers />,
    },
];

export default routes;
