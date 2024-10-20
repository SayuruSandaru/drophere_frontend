import User from "model/user";
import ApiService from "./apiService";

class VehicleService extends ApiService {
    public async createVehicle(vehicle: { type: string, capacity: number, available: boolean, license_plate: string, model: string, year: number, image_url: string }): Promise<any> {
        try {
            const response = await this.post("/vehicle/add",
                {
                    "type": vehicle.type,
                    "capacity": vehicle.capacity,
                    "available": vehicle.available,
                    "license_plate": vehicle.license_plate,
                    "model": vehicle.model,
                    "year": vehicle.year,
                    "image_url": vehicle.image_url,
                }
            );
            console.log(response);
            return response;
        } catch (error) {
            console.error("Error creating vehicle: ", error);
            throw error;
        }
    }

    public async getVehicle(): Promise<any> {
        try {
            const response = await this.get("/vehicles");
            return response;
        } catch (error) {
            console.error("Error getting vehicle: ", error);
            throw error;
        }
    }

    public async getVehicleById(id: string): Promise<any> {
        try {
            const response = await this.get(`/vehicle/${id}`);
            return response;
        } catch (error) {
            console.error("Error getting vehicle: ", error);
            throw error;
        }
    }

    public async getVehicleByOwenerId(id: string): Promise<any> {
        try {
            const response = await this.get(`/vehicles/owner/${id}`);
            return response;
        } catch (error) {
            console.error("Error getting vehicle: ", error);
            throw error;
        }
    }


    public async getVehicleFeeDetails(): Promise<any> {
        try {
            const response = await this.get("/vehicle-fees");
            return response;
        } catch (error) {
            console.error("Error fetching vehicle fee details: ", error);
            throw error;
        }
    }

    public async updateVehicleFee(data: { vehicle_type: string, price_per_km: number }): Promise<any> {
        try {
            const response = await this.post("/vehicle-fee/update", data);
            return response;
        } catch (error) {
            console.error("Error updating vehicle fee: ", error);
            throw error;
        }
    }
}

export default new VehicleService();