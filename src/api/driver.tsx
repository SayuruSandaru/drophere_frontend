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
            return true;
        } else if (response.message === "Driver already registered") {
            // Handle the case where the driver is already registered
            console.error('Driver already registered');
            throw new Error("Driver already registered");
        }
    } catch (error) {
        // Ensure the error message is always a string
        const errorMessage = error.message || 'An error occurred during driver registration';
        console.error('Failed to create or retrieve driver:', errorMessage);
        throw new Error(errorMessage);
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
        console.log(response);
        if (response.status === "error" && response.message === "Driver not found") {
            return false;
        }
        console.log(response);
        setRecoil(isDriverState, true);
        setRecoil(driverState, response.driver);
        return true;
    } catch (error) {
        if (error.message === "Driver not found") {
            return false;
        } else {
            return false;
        }
    }
};