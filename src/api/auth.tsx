import { setRecoil } from 'recoil-nexus';
import { userState } from '../state';
import CookieManager from './cookieManager';
import authService from './services/authService';

// Function to handle login
export const login = async (credentials: { email: string; password: string }): Promise<void> => {
    try {
        const response = await authService.login(credentials.email, credentials.password);

        // if (!response.token) {
        //     throw new Error('No token returned');
        // }

        // CookieManager.setCookie("token", response.token, 7);
        // setRecoil(tokenState, response.token);
        setRecoil(userState, response.user);
    } catch (error) {
        if (error.message.includes('Invalid password')) {
            throw new Error('Invalid email or password.');
        } else if (error.message === 'Failed to fetch') {
            throw new Error('Network error. Please try again.');
        } else {
            throw new Error('An unknown error occurred. Please try again.');
        }
    }
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
