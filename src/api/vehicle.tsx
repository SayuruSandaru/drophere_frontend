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