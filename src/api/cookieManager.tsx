class CookieManager {

    static setCookie(name: string, value: string, days?: number): void {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 86400000);
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; Secure; SameSite=Strict`;
    }

    static getCookie(name: string): string | undefined {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.startsWith(nameEQ)) {
                return decodeURIComponent(c.substring(nameEQ.length));
            }
        }
        return undefined;
    }

    static clearCookie(name: string): void {
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict`;
    }
}

export default CookieManager;
