import { useRecoilValue } from 'recoil';
import { tokenState } from 'state';
import CookieManager from './cookieManager';

class ApiService {
    protected baseUrl: string = "https://cors-anywhere.herokuapp.com/https://drophere-staging-665f7065c9e0.herokuapp.com";



    public async get(path: string, authorized = true): Promise<any> {
        try {
            var header = {
                "Content-Type": "application/json",
            };
            if (authorized) {
                header = this.mergeToken(header);
            }

            const response = await fetch(this.baseUrl + path, {
                headers: header
            });
            if (!response.ok) {
                throw new Error("Error fetching data: " + response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    }

    public async post(path: string, data: any, authorized = true): Promise<any> {
        try {
            var header = {
                "Content-Type": "application/json",
            };
            if (authorized) {
                header = this.mergeToken(header);
            }
            console.log(header)
            const response = await fetch(this.baseUrl + path, {
                method: "POST",
                headers: header,
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Error fetching data: " + response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    }

    private mergeToken(header: any) {
        const token = CookieManager.getCookie("token");

        if (!token) {
            throw new Error("No token found");
        }

        header["Authorization"] = `Bearer ${token}`;
        return header;
    }
}

export default ApiService;