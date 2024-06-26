import rideService from "./services/rideService";

export const searchRides = async (search: { pickup_lat: number; pickup_lng: number; destination_lat: number; destination_lng: number }): Promise<any> => {
    try {
        console.log(search);
        const response = await rideService.searchRides({
            "pickup_lat": search.pickup_lat,
            "pickup_lng": search.pickup_lng,
            "destination_lat": search.destination_lat,
            "destination_lng": search.destination_lng,
        });
        if (response.status === "error") {
            throw new Error("Failed to search rides");
        }
        return response;
    } catch (error) {
        console.error("Error searching for rides: ", error);
        throw error;
    }
};
