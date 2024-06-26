import CookieManager from "api/cookieManager";


class ApiService {
    protected baseUrl: string = "https://drophere-staging-665f7065c9e0.herokuapp.com";

    private mergeToken(headers: Headers) {
        const token = CookieManager.getCookie("token");

        if (!token) {
            throw new Error("No token found");
        }

        headers.append("Authorization", `Bearer ${token}`);
        return headers;
    }

    public async post(path: string, data: any, authorized = true): Promise<any> {
        try {
            const headers = new Headers({
                "Content-Type": "application/json",
            });

            if (authorized) {
                this.mergeToken(headers);
            }

            const requestOptions: RequestInit = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            const response = await fetch(this.baseUrl + path, requestOptions);

            if (!response.ok) {
                const errorText = await response.text();
                const errorJson = JSON.parse(errorText);
                throw new Error(`Error fetching data: ${response.statusText} - ${errorJson.message}`);
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async uploadFile(path: string, fileData: FormData, authorized = true): Promise<any> {
        try {
            const headers = new Headers();

            if (authorized) {
                this.mergeToken(headers);
            }

            const requestOptions: RequestInit = {
                method: "POST",
                headers: authorized ? headers : undefined, // Use headers only if authorization is required
                body: fileData,
                redirect: 'follow'
            };

            const response = await fetch(this.baseUrl + path, requestOptions);

            if (!response.ok) {
                const errorText = await response.text();
                const errorJson = JSON.parse(errorText);
                throw new Error(`Error uploading file: ${response.statusText} - ${errorJson.message}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error uploading file: ", error);
            throw error;
        }
    }


    public async get(path: string, authorized = true): Promise<any> {
        try {
            const headers = new Headers({
                "Content-Type": "application/json",
            });

            if (authorized) {
                this.mergeToken(headers);
            }

            const requestOptions: RequestInit = {
                method: "GET",
                headers: headers,
                redirect: 'follow'
            };

            const response = await fetch(this.baseUrl + path, requestOptions);

            if (!response.ok) {
                throw new Error("Error fetching data: " + response.statusText);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    }
}

export default ApiService;
