import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/login/index';
import Register from '../pages/register/index';

export enum RouterPaths {
    LOGIN = "/",
    REGISTER = "/register",
    HOME = "/home"
}

const RouterConfig: React.FC = () => {
    return (
        <Routes>
            <Route path={RouterPaths.LOGIN} element={<Login />} />
            <Route path={RouterPaths.REGISTER} element={<Register />} />
            {/* Additional routes can be added here */}
        </Routes>
    );
}

export default RouterConfig;
