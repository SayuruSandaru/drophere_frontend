class CookieManager {
    static setCookie(name: string, value: string, days?: number): void {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 86400000); // 86400000 is the number of milliseconds in a day
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; Secure; SameSite=Strict`;
        console.log(`Set Cookie: ${name}=${value}${expires}; path=/; Secure; SameSite=Strict`);
    }

    static getCookie(name: string): string | undefined {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        console.log(`Current Cookies: ${document.cookie}`);
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.startsWith(nameEQ)) {
                const cookieValue = decodeURIComponent(c.substring(nameEQ.length));
                console.log(`Found Cookie: ${name}=${cookieValue}`);
                return cookieValue;
            }
        }
        console.log(`Cookie not found: ${name}`);
        return undefined;
    }

    static clearCookie(name: string): void {
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict`;
        console.log(`Cleared Cookie: ${name}`);
    }
}

export default CookieManager;
