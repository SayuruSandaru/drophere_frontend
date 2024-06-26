import { setRecoil } from 'recoil-nexus';
import { driverState, isDriverState } from 'state';
import driverService from './services/driverService';

export const createDriver = async (driver: { street: string; city: string; province: string; proof_document: string }) => {
    try {
        const response = await driverService.createDriver(driver);
        if (response.status !== "error") {
            const res = await driverService.getDriverById(response.driver_id);
            console.log(res);
            if (res.status !== "error") {
                setRecoil(driverState, res.driver);
            }
        }
    } catch (error) {
        console.error('Failed to create or retrieve driver:', error);
        throw new Error("An error occurred during driver registration");

    }
}

export const getDriverById = async (driverId) => {
    try {
        const response = await driverService.getDriverById(driverId);
        if (response.status === "error") {
            throw new Error("Failed to retrieve driver");
        }
        return response.driver;
    } catch (error) {
        console.error('Failed to retrieve driver:', error);
        throw new Error("An error occurred during driver retrieval");
    }
};

export const driverByUser = async () => {
    try {
        const response = await driverService.getDriverByUserId();
        if (response.status === "error") {
        }
        console.log(response);
        setRecoil(isDriverState, true);
        setRecoil(driverState, response.driver);
        return true;
    } catch (error) {
        console.error('Failed to retrieve driver:', error);
        throw new Error("An error occurred during driver retrieval");
    }
};