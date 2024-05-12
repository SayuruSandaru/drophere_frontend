import Login from 'pages/login/index';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/register/index';
export default function RouterConfig() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
}



