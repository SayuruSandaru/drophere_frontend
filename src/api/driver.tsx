import { setRecoil } from 'recoil-nexus';
import { driverState } from 'state';
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