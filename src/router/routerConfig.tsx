import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/login/index';
import Register from '../pages/register/index';
import Home from 'pages/home';
import Order from 'pages/order/index';
import SearchDelivery from 'pages/search - delivery';
import Ride from 'pages/ride - search';
// import SearchDelivery from 'pages/Delivery/Search';
import Profile from 'pages/owner_profile';

export enum RouterPaths {
    LOGIN = "/",
    REGISTER = "/register",
    HOME = "/home",
    ORDER = "/order",
    SEARCHDELIVERY = "/delivery/search",
    SEARCHRIDE = "/ride/search",
    PROFILE = "/profile"
}

const RouterConfig: React.FC = () => {
    return (
        <Routes>
            <Route path={RouterPaths.LOGIN} element={<Login />} />
            <Route path={RouterPaths.REGISTER} element={<Register />} />
            <Route path={RouterPaths.HOME} element={<Home />} />
            <Route path={RouterPaths.ORDER} element={<Order />} />
            <Route path={RouterPaths.SEARCHDELIVERY} element={<SearchDelivery />} />
            <Route path={RouterPaths.SEARCHRIDE} element={<Ride />} />
            <Route path={RouterPaths.PROFILE} element={<Profile />} />
        </Routes>
    );
}

export default RouterConfig;



