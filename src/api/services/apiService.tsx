import CookieManager from "api/cookieManager";


class ApiService {
    protected baseUrl: string = "localhost:8000";

    // private mergeToken(headers: Headers) {
    //     const token = CookieManager.getCookie("token");

    //     if (!token) {
    //         throw new Error("No token found");
    //     }

    //     headers.append("Authorization", `Bearer ${token}`);
    //     return headers;
    // }

    public async post(path: string, data: any, authorized = true): Promise<any> {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "PHPSESSID=2flilaupqne7idfcnrkmuk2o9n");

            // if (authorized) {
            //     this.mergeToken(headers);
            // }

            const requestOptions: RequestInit = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow',
                // credentials: 'include'
            };

            // if (authorized) {
            //     requestOptions.credentials = 'include'; // Include credentials (cookies) in the request if authorized
            // }

            const response = await fetch(this.baseUrl + path, requestOptions);

            if (!response.ok) {
                const errorText = await response.text();
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.message);
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

            // if (authorized) {
            //     this.mergeToken(headers);
            // }

            const requestOptions: RequestInit = {
                method: "POST",
                headers: authorized ? headers : undefined,
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

            // if (authorized) {
            //     this.mergeToken(headers);
            // }

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
