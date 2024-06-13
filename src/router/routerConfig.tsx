import Login from 'pages/login/index';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/register/index';
import Ride from '../pages/ride/index';


export default function RouterConfig() {
    return (
        <Routes>
            <Route path={RouterPaths.LOGIN} element={<Login />} />
            <Route path={RouterPaths.REGISTER} element={<Register />} />
            <Route path={RouterPaths.RIDE} element={<Ride />} />
            {/* <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
}

export enum RouterPaths {
    LOGIN = "/",
    REGISTER = "/register",
    RIDE ="/ride"//

}
