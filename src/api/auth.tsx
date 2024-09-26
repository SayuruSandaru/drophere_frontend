import User from 'model/user';
import { Convert } from 'model/userModal';
import { setCookie } from 'undici-types';
import { tokenState, userState } from '../state';
import CookieManager from './cookieManager';
import authService from './services/authService';


export const login = async (credentials: { email: string; password: string }) => {
    try {
        const response = await authService.login(credentials.email, credentials.password);
        if (!response.token) {
            throw new Error('No token returned');
        }
        CookieManager.setCookie("token", response.token, 5);
        const res = await authService.getUser();
        if (res.status !== "success") {
            throw new Error('Failed to fetch user details');
        }
        const user = Convert.toUserModal(JSON.stringify(res));
        User.setUserDetail(user);
        return { user, token: response.token };
    } catch (error) {
        console.error('Failed to login:', error);
        throw error;
    }
};

export const adminLogin = async (credentials: { email: string; password: string }) => {
    try {
        const response = await authService.adminLogin(credentials.email, credentials.password);
        if (!response.token) {
            throw new Error('No token returned');
        }
        CookieManager.setCookie("token", response.token, 5);
        const res = await authService.getUser();
        if (res.status !== "success") {
            throw new Error('Failed to fetch user details');
        }
        const user = Convert.toUserModal(JSON.stringify(res));
        User.setUserDetail(user);
        return { user, token: response.token };
    } catch (error) {
        console.error('Failed to login:', error);
        throw error;
    }
}

export const updateUserData = async () => {
    const res = await authService.getUser();
    if (res.status !== "success") {
        throw new Error('Failed to fetch user details');
    }
    const user = Convert.toUserModal(JSON.stringify(res));
    User.setUserDetail(user);

};


export const registerUser = async (details: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    username: string;
    phone: string;
    profile_image: string;
}): Promise<void> => {
    try {
        console.log("Registering user");
        console.log("profile_image: ", details.profile_image);
        const response = await authService.register(
            {
                'email': details.email,
                'password': details.password,
                'firstname': details.firstname,
                'lastname': details.lastname,
                'username': details.username,
                'phone': details.phone,
                'profile_image': details.profile_image
            }
        );
        if (response.status !== "success") {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Failed to register:', error);
        throw error;
    }
};

// export const fetchUserDetails = async (): Promise<void> => {
//     try {
//         const token = CookieManager.getCookie("token");
//         if (!token) {
//             throw new Error('No token available');
//         }

//         const user = await AuthApi.getUserDetails();
//         setRecoil(userState, user);
//     } catch (error) {
//         console.error('Failed to fetch user details:', error);
//         throw error;
//     }
// };

// export const logout = (): void => {
//     CookieManager.deleteCookie("token");
//     setRecoil(tokenState, null);
//     setRecoil(userState, null);
// };
