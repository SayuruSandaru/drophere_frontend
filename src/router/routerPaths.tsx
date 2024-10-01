import { Route, Routes } from "react-router-dom";
import { RouterPaths } from "./routerConfig";
import Login from "pages/login/index";
import Register from "../pages/register/index";
import Home from "pages/home";
import Complain from "pages/complain";
import Order from "pages/order/index";
import SearchDelivery from "pages/search - delivery";
import Ride from "pages/ride - search";
import Profile from "pages/owner_profile";
import OrderDelivery from "pages/order - delivery";
import DriverRegister from "pages/register_driver/index";
import PrivateRoute from "pages/components/privateRoute"; // Already imported
import Cride from "pages/Create-ride/Create/create-ride";
import HomeDelivery from "pages/home - delivery";
import LandingPage from "pages/landing";
import ContactUs from "pages/contact";
import OrderPageRide from "pages/order/index";
import DriverDashboard from "pages/driver-dashboard";
import Rides from "pages/driver-dashboard/rides";
import Requests from "pages/driver-dashboard/requests";
import DashboardHome from "pages/driver-dashboard/dashboard-home";
import MyRide from "pages/myride";
import AdminDashboard from "pages/admin-dashboard";
import AdminHome from "pages/admin-dashboard/home";
import AdminUsers from "pages/admin-dashboard/users";
import AdminDispute from "pages/admin-dashboard/dispute";
import AdminDriverRegRequest from "pages/admin-dashboard/registration-request";
import AdminAnalytics from "pages/admin-dashboard/analytics";
import AdminLogin from "pages/login/adminlogin";
import ForgotPassword from "pages/forgot-password";
import ResetPassword from "pages/reset-password";

const RouterConfig: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={RouterPaths.ADMINLOGIN} element={<AdminLogin />} />
      <Route path={RouterPaths.LOGIN} element={<Login />} />
      <Route path={RouterPaths.REGISTER} element={<Register />} />
      <Route path={RouterPaths.FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route path={RouterPaths.RESETPASSWORD} element={<ResetPassword />} />
      <Route path={RouterPaths.LANDING} element={<LandingPage />} />
      <Route path={RouterPaths.CONTACT} element={<ContactUs />} />

      {/* Private Routes */}
      <Route
        path={RouterPaths.ORDERDELIVERY}
        element={<PrivateRoute element={<OrderDelivery />} />}
      />
      <Route
        path={RouterPaths.DRIVERREGISTER}
        element={<PrivateRoute element={<DriverRegister />} />}
      />
      <Route
        path={RouterPaths.RIDE}
        element={<PrivateRoute element={<Home />} />}
      />
      <Route
        path={RouterPaths.ORDER}
        element={<PrivateRoute element={<OrderPageRide />} />}
      />
      <Route
        path={RouterPaths.SEARCHDELIVERY}
        element={<PrivateRoute element={<SearchDelivery />} />}
      />
      <Route
        path={RouterPaths.SEARCHRIDE}
        element={<PrivateRoute element={<Ride />} />}
      />
      <Route
        path={RouterPaths.PROFILE}
        element={<PrivateRoute element={<Profile />} />}
      />
      <Route
        path={RouterPaths.DRIVERPROFILE}
        element={<PrivateRoute element={<Profile />} />}
      />
      <Route
        path={RouterPaths.CREATERIDE}
        element={<PrivateRoute element={<Cride />} />}
      />
      <Route
        path={RouterPaths.HOMEDELIVERY}
        element={<PrivateRoute element={<HomeDelivery />} />}
      />
      <Route
        path={RouterPaths.COMPLAIN}
        element={<PrivateRoute element={<Complain />} />}
      />
      <Route
        path={RouterPaths.DRIVERDASHBOARD}
        element={<PrivateRoute element={<DriverDashboard />} />}
      >
        <Route
          path={RouterPaths.DASHBOARDHOME}
          element={<PrivateRoute element={<DashboardHome />} />}
        />
        <Route
          path={RouterPaths.DASHBOARDRIDES}
          element={<PrivateRoute element={<Rides />} />}
        />
        <Route
          path={RouterPaths.DASHBOARDREQUESTS}
          element={<PrivateRoute element={<Requests />} />}
        />
      </Route>
      <Route
        path={RouterPaths.MYRIDES}
        element={<PrivateRoute element={<MyRide />} />}
      />
      <Route
        path={RouterPaths.ADMINDASHBOARD}
        element={<PrivateRoute element={<AdminDashboard />} />}
      >
        <Route
          path={RouterPaths.ADMINHOME}
          element={<PrivateRoute element={<AdminHome />} />}
        />
        <Route
          path={RouterPaths.ADMINUSERS}
          element={<PrivateRoute element={<AdminUsers />} />}
        />
        <Route
          path={RouterPaths.ADMINDISPUTE}
          element={<PrivateRoute element={<AdminDispute />} />}
        />
        <Route
          path={RouterPaths.ADMINDRIVERREGREQUEST}
          element={<PrivateRoute element={<AdminDriverRegRequest />} />}
        />
        <Route
          path={RouterPaths.ADMINANALYTICS}
          element={<PrivateRoute element={<AdminAnalytics />} />}
        />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
