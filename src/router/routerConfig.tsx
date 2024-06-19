// src/router/routerConfig.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/login/index';
import Register from '../pages/register/index';
import Home from 'pages/home';
import Order from 'pages/order/index';
import SearchDelivery from 'pages/search - delivery';
import Ride from 'pages/ride - search';
import Profile from 'pages/owner_profile';
import OrderDelivery from 'pages/order - delivery';
import DriverRegister from 'pages/register_driver/index';
import PrivateRoute from 'pages/components/privateRoute';
import Cride from 'pages/Create-ride/Create/create-ride';
import HomeDelivery from 'pages/home - delivery';

export enum RouterPaths {
    LOGIN = "/",
    REGISTER = "/register",
    HOME = "/home",
    HOMEDELIVERY = "/delivery",
    ORDER = "/order",
    SEARCHDELIVERY = "/delivery/search",
    SEARCHRIDE = "/ride/search",
    PROFILE = "/profile",
    ORDERDELIVERY = "/delivery/order",
    DRIVERREGISTER = "/drive/register",
    CREATERIDE = "/ride/create",
}

const RouterConfig: React.FC = () => {
    return (
        <Routes>
            <Route path={RouterPaths.LOGIN} element={<Login />} />
            <Route path={RouterPaths.REGISTER} element={<Register />} />
            <Route path={RouterPaths.ORDERDELIVERY} element={<OrderDelivery />} />
            <Route path={RouterPaths.DRIVERREGISTER} element={< DriverRegister />} />
            <Route path={RouterPaths.HOME} element={<PrivateRoute element={<Home />} />} />
            <Route path={RouterPaths.ORDER} element={<PrivateRoute element={<Order />} />} />
            <Route path={RouterPaths.SEARCHDELIVERY} element={<PrivateRoute element={<SearchDelivery />} />} />
            <Route path={RouterPaths.SEARCHRIDE} element={<PrivateRoute element={<Ride />} />} />
            <Route path={RouterPaths.PROFILE} element={<PrivateRoute element={<Profile />} />} />
            <Route path={RouterPaths.CREATERIDE} element={<Cride />} />
            <Route path={RouterPaths.HOMEDELIVERY} element={<HomeDelivery />} />
        </Routes>
    );
}

export default RouterConfig;
