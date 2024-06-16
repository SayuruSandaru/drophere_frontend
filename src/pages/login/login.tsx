import AuthService from "api/authService";
import CookieManager from "api/cookieManager";
import { tokenState, userState } from "state";

export const login = async (credentials: { email: string; password: string }): Promise<void> => {
    try {
        const response = await AuthService.login(
            credentials.email,
            credentials.password
        );

        if (!response.token) {
            throw new Error('No token returned');
        }
        CookieManager.setCookie('token', response.token, 7);
        setRecoil(userState, response.user);
    } catch (error) {
        console.error('Failed to login:', error);
        throw error;
    }
};

function setRecoil(tokenState: any, token: any) {
    throw new Error("Function not implemented.");
}
