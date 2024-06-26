import ApiService from "./apiService";

class RideService extends ApiService {
    public async createRide(ride: any): Promise<any> {
        try {
            const response = await this.post("/ride/create",
                {
                    "driver_id": ride.driver_id,
                    "status": ride.status,
                    "start_time": ride.start_time,
                    "current_location": ride.current_location,
                    "route": ride.route,
                    "start_location": ride.start_location,
                    "end_location": ride.end_location
                }
            );
            return response;
        } catch (error) {
            console.error("Error creating ride: ", error);
            throw error;
        }
    }
}
