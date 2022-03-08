import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/postIdPage";
import Login from "../pages/Login";


export const priveRoutes = [
    {path: '/about', element: <About/>, exact: true},
    {path: '/posts', element: <Posts/>, exact: true},
    {path: '/posts/:id', element: <PostIdPage/>, exact: true}
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '/about', element: <About/>, exact: true}
]
