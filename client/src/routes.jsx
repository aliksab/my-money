import { Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import RegisterForm from "./components/Forms/RegisterForm";
import LoginForm from "./components/Forms/LoginForm";
import Home from "./pages/Home";
import Logbook from "./pages/Logbook";
import TradingViewWidget from "./pages/tradingview";
import EditUserPage from "./pages/EditUserPage";
import SettingProfile from "./pages/SettingProfile";
import Container from "./containers/Container";



const routes = (isLoggedIn, location) => [
    {
        path: "",
        element: <MainPage />,
    },
    {
        path: "auth",
        element: <Login />,
        children: [
            {
                path: "login",
                element: <LoginForm />,
            },
            {
                path: "register",
                element: <RegisterForm />,
            },
            {
                path: "*",
                element: <Navigate to='/auth/register' />,
            },
        ],
    },
    {
        path: "api",
        element: isLoggedIn ? (
            <Container />
        ) : (
            <Navigate to='/auth/login' state={{ referrer: location }} />
        ),
        children: [
            { path: "", element: <Home />},
            { path: "logbook", element: <Logbook /> },
            { path: "trading", element: <TradingViewWidget /> },
            { path: "editProfile", element: <EditUserPage /> },
            { path: "settingProfile", element: <SettingProfile /> },            
        ],
    },
    {
        path: "*",
        element: <Navigate to={isLoggedIn ? "/api" : "/"} />,
    },
];

export default routes;
