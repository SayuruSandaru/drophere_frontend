import ApiService from "./apiService";

class RideService extends ApiService {
    public async createRide(ride: any): Promise<any> {
        try {
            console.log(ride);
            const response = await this.post("/ride/create",
                {
                    "driver_id": ride.driver_id,
                    "vehicle_id": ride.vehicle_id,
                    "status": ride.status,
                    "start_time": ride.start_time,
                    "current_location": ride.current_location,
                    "route": ride.route,
                    "start_location": ride.start_location,
                    "end_location": ride.end_location,
                    "passenger_count": ride.passenger_count,
                }
            );
            return response;
        } catch (error) {
            console.error("Error creating ride: ", error);
            throw error;
        }
    }

    public async searchRides(search: any): Promise<any> {
        try {
            const data = {
                "pickup_lat": search.pickup_lat,
                "pickup_lng": search.pickup_lng,
                "destination_lat": search.destination_lat,
                "destination_lng": search.destination_lng,
                "date": search.date,
                "passenger_count": search.passenger_count,
            };
            const response = await this.post("/rides/search",
                data
            );
            return response;
        } catch (error) {
            console.error("Error searching for rides: ", error);
            throw error;
        }
    }

    public async getDirections(start: any, end: any): Promise<any> {
        try {
            const data = {
                "pickup_lat": start.lat,
                "pickup_lng": start.lng,
                "destination_lat": end.lat,
                "destination_lng": end.lng
            }
            console.log(data);
            const response = await this.post("/rides/direction", data);
            return response;
        } catch (error) {
            console.error('Failed to get directions:', error);
            throw error;
        }
    }

}

export default new RideService();