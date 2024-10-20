import ApiService from "./apiService";

class ReservationService extends ApiService {
    public async createReservation(reservation: any): Promise<any> {
        try {
            console.log("Creating reservation: ", reservation);
            const response = await this.post("/reservation/create", {
                "driver_id": reservation.driver_id,
                "ride_id": reservation.ride_id,
                "status": reservation.status,
                "price": reservation.price,
                "passenger_count": reservation.passenger_count,
            });
            return response;
        } catch (error) {
            console.error("Error creating reservation: ", error);
            throw error;
        }
    }

    public async createDeliveryOrder(order: any): Promise<any> {
        try {
            const response = await this.post("/reservation/create/delivery", {
                driver_id: order.driver_id,
                ride_id: order.ride_id,
                status: order.status,
                price: order.price,
                recipient_name: order.recipient_name,
                recipient_address: order.recipient_address,
                recipient_phone: order.recipient_phone,
                weight: order.weight,
            });
            return response;
        } catch (error) {
            console.error("Error creating delivery order: ", error);
            throw error;
        }
    }

    public async getReservationsByStatus(status: string, id): Promise<any> {
        try {
            console.log("Fetching reservations with status: ", status);
            console.log("User ID: ", id);
            const response = await this.post("/reservation/available", {
                "status": status,
                "user_id": id

            });
            console.log("Reservations fetched:", response);
            return response;
        } catch (error) {
            console.error("Error getting reservations by status: ", error);
            throw error;
        }
    }

    public async getReservationsByStatusDriverId(status: string, driverId: number): Promise<any> {
        try {
            console.log("Fetching reservations with status: ", status);
            console.log("Driver ID: ", driverId);
    
            const response = await this.post("/reservation/available/d", {
                "status": status,
                "driver_id": driverId
            });
    
            console.log("Reservations fetched:", response);
            return response;
        } catch (error) {
            console.error("Error getting reservations by status: ", error);
            throw error;
        }
    }

    public async updateReservationStatus(reservationId: string, status: string): Promise<any> {
        try {
            const requestData = {
                "reservation_id": reservationId,
                "status": status
            };

            console.log("Updating reservation status with request data: ", requestData); // Log request data

            const response = await this.post(`/reservation/update`, requestData);
            console.log("Response from server: ", response); // Log server response
            return response;
        } catch (error) {
            console.error("Error updating reservation status: ", error);
            throw error;
        }
    }

    public async getReservationsByRideId(rideId: number): Promise<any> {
        try {
            console.log("Fetching reservations for ride ID: ", rideId);
            const response = await this.get(`/reservation/ride/${rideId}`);
            console.log("Reservations fetched:", response);
            return response;
        } catch (error) {
            console.error("Error fetching reservations:", error);
            throw error;
        }
    }



}

export default new ReservationService();
