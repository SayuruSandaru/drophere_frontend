import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { RouterPaths } from 'router/routerConfig';
import { tokenState } from 'state';
import { Box, Text } from '@chakra-ui/react';
import CookieManager from 'api/cookieManager';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const token = CookieManager.getCookie("token");
    const [showMessage, setShowMessage] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!token) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setRedirect(true);
            }, 3000); // Show message for 3 seconds

            return () => clearTimeout(timer);
        }
    }, [token]);

    if (redirect) {
        return <Navigate to={RouterPaths.LOGIN} />;
    }

    return token ? element : (
        <Box textAlign="center" mt="20">
            <Text fontSize="xl" color="red.500">
                You need to be logged in to access this page. Redirecting to login...
            </Text>
        </Box>
    );
};

export default PrivateRoute;
