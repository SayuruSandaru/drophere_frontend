import { start } from "repl";
import rideService from "./services/rideService";

export const searchRides = async (search: {
    pickup_lat: number;
    pickup_lng: number;
    destination_lat: number;
    destination_lng: number;
    date?: string;
    passenger_count?: number
}): Promise<any> => {
    
    try {
        console.log(search);
        const requestPayload: any = {
            "pickup_lat": search.pickup_lat,
            "pickup_lng": search.pickup_lng,
            "destination_lat": search.destination_lat,
            "destination_lng": search.destination_lng,
            "date": search.date,
            "passenger_count": search.passenger_count,
        };

        if (search.date) {
            requestPayload.date = search.date;
        }

        if (search.passenger_count) {
            requestPayload.passenger_count = search.passenger_count;
        }

        const response = await rideService.searchRides(requestPayload);

        if (response.status === "error") {
            throw new Error("Failed to search rides");
        }
        return response;
    } catch (error) {
        console.error("Error searching for rides: ", error);
        throw error;
    }
};


export const createRide = async (ride: {
    driver_id: number;
    vehicle_id: number;
    status: string;
    start_time: string;
    current_location: string;
    route: string;
    start_location: string;
    end_location: string;
}): Promise<any> => {
    try {
        const response = await rideService.createRide({
            driver_id: ride.driver_id,
            vehicle_id: ride.vehicle_id,
            status: ride.status,
            start_time: ride.start_time,
            current_location: ride.current_location,
            route: ride.route,
            start_location: ride.start_location,
            end_location: ride.end_location,
        });
        if (response.status === "error") {
            throw new Error("Failed to create ride");
        }
        return response;
    } catch (error) {
        console.error("Error creating ride: ", error);
        throw error;
    }
};



// export const getDirections = async (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }): Promise<any> => {
//     try {
//         const response = await rideService.getDirections(
//             origin,
//             destination,);
//         if (response.status === "error") {
//             throw new Error("Failed to get directions");
//         }
//         return response;
//     } catch (error) {
//         console.error("Error getting directions: ", error);
//         throw error;
//     }
// }

