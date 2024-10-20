import vehicleService from "./services/vehicleService";

export const createVehicle = async (vehicle: { type: string, capacity: number, license_plate: string, model: string, year: number, image_url: string }): Promise<any> => {
    try {
        console.log(vehicle);
        const response = await vehicleService.createVehicle({
            "type": vehicle.type,
            "capacity": vehicle.capacity,
            "available": true,
            "license_plate": vehicle.license_plate,
            "model": vehicle.model,
            "year": vehicle.year,
            "image_url": vehicle.image_url,
        });
        if (response.status === "error") {
            throw new Error("Failed to create vehicle");
        }
        return response;
    } catch (error) {
        console.error("Error creating vehicle: ", error);
        throw error;
    }
};



// Get vehicle fee details
export const getVehicleFeeDetails = async (): Promise<any> => {
    try {
        const response = await vehicleService.getVehicleFeeDetails();
        if (response.status === "error") {
            throw new Error("Failed to fetch vehicle fee details");
        }
        return response;
    } catch (error) {
        console.error("Error fetching vehicle fee details: ", error);
        throw error;
    }
};

export const updateVehicleFee = async (vehicleType: string, newFee: number): Promise<any> => {
    try {
        const response = await vehicleService.updateVehicleFee({
            vehicle_type: vehicleType,
            price_per_km: newFee,
        });
        if (response.status === "error") {
            throw new Error("Failed to update vehicle fee");
        }
        return response;
    } catch (error) {
        console.error("Error updating vehicle fee: ", error);
        throw error;
    }
};
