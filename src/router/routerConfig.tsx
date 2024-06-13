import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/login/index';
import Register from '../pages/register/index';
import Home from 'pages/home';
import SearchDelivery from 'pages/Delivery/Search';
// import SearchDelivery from 'pages/Delivery/Search';

export enum RouterPaths {
    LOGIN = "/",
    REGISTER = "/register",
    HOME = "/home",
    SEARCHDELIVERY="/delivery/search"
}

const RouterConfig: React.FC = () => {
    return (
        <Routes>
            <Route path={RouterPaths.LOGIN} element={<Login />} />
            <Route path={RouterPaths.REGISTER} element={<Register />} />
            <Route path={RouterPaths.HOME} element={<Home />} />
            <Route path={RouterPaths.SEARCHDELIVERY} element={<SearchDelivery />} />
        </Routes>
    );
}

export default RouterConfig;
