import LoginUser from "../pages/login/LoginUser";
import Header from "../components/header/header";
import RegisterUser from "../pages/register/RegisterUser";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/reset-password/ResetPassword";

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
];

export default routes;
