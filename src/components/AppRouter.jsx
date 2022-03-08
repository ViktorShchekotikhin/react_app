import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import {Navigate} from "react-router";
import PostIdPage from "../pages/postIdPage";
import {priveRoutes, publicRoutes} from "../router/routes";
import Login from "../pages/Login";
import {AuthContext} from "../context";
import MyLoader from "./UI/MyLoader/MyLoader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)

    if(isLoading){
        return <MyLoader/>
    }
    return (
        isAuth
            ?
                <Routes>
                    {priveRoutes.map(route =>
                        <Route
                            exact = {route.exact}
                            path = {route.path}
                            element = {route.element}
                            key = {route.path} //not by course but error
                        />
                    )}
                    <Route path="/error" element={<Error />} />
                    <Route
                        path="*"
                        element={<Navigate to="/posts" />}
                    />
                </Routes>
            :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            exact = {route.exact}
                            path = {route.path}
                            element = {route.element}
                            key = {route.path} //not by course but error
                        />
                    )}
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="*"
                        element={<Navigate to="/login" />}
                    />
                </Routes>
    );
};

export default AppRouter;


