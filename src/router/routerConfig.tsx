import Login from 'pages/login/index';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/register/index';
import Ride from '../pages/ride - search/index';


export default function RouterConfig() {
    return (
        <Routes>
            <Route path={RouterPaths.LOGIN} element={<Login />} />
            <Route path={RouterPaths.REGISTER} element={<Register />} />
            <Route path={RouterPaths.RIDESEARCH} element={<Ride />} />

        </Routes>
    );
}

export enum RouterPaths {
    LOGIN = "/",
    REGISTER = "/register",
    RIDESEARCH = "/ride/search",

}
