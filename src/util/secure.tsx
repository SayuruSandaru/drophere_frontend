import CryptoJS from "crypto-js";

const secretKey = "DroopheSecret";

export const encryptData = (data) => {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    } catch (error) {
        console.error("Error encrypting data", error);
        return null;
    }
};

export const decryptData = (ciphertext) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Error decrypting data", error);
        return null;
    }
};


export const setLocalStorage = (key, value) => {
    try {
        const encryptedData = encryptData(value);
        localStorage.setItem(key, encryptedData);
    } catch (error) {
        console.error("Error setting local storage", error);
    }
};

export const getLocalStorage = (key) => {
    try {
        const encryptedData = localStorage.getItem(key);
        if (!encryptedData) return null;
        return decryptData(encryptedData);
    } catch (error) {
        console.error("Error getting local storage", error);
        return null;
    }
};
