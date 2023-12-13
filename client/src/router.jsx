import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import HomaPage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import MyArticlesPage from "./views/MyArticlesPage" 

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomaPage/>,
        loader : () => !localStorage.getItem("access_token") && redirect('/login')
    },
    {
        path: "/login",
        element: <LoginPage/>,
        loader : () => localStorage.getItem("access_token") && redirect('/')
    },
    {
        path: "/register",
        element: <RegisterPage/>,
        loader : () => localStorage.getItem("access_token") && redirect('/')
    },
    {
        path: "/myarticles",
        element: <MyArticlesPage/>,
        loader : () => !localStorage.getItem("access_token") && redirect('/login')
    },
]);

export default router