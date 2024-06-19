import { setRecoil } from 'recoil-nexus';
import { driverState } from 'state';
import driverService from './services/driverService';

export const createDriver = async (driver: { email: string; password: string }) => {
    try {
        const response = await driverService.createDriver(driver);
        if (response.status === "error") {
            throw new Error('Driver creation failed');
        }
        const res = await driverService.getDriverById(response.driver_id);
        if (res.status === "error") {
            throw new Error('Driver creation failed');
        }
        setRecoil(driverState, res.driver);
    } catch (error) {
        console.error('Failed to create driver:', error);
        throw error;
    }
}