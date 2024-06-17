// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { RouterPaths } from 'router/routerConfig';
import { tokenState } from 'state';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const token = useRecoilValue(tokenState);

    return token ? element : <Navigate to={RouterPaths.LOGIN} />;
};

export default PrivateRoute;
