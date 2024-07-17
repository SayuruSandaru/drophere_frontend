import ApiService from "./apiService";

class ReservationService extends ApiService {
    public async createReservation(reservation: any): Promise<any> {
        try {
            console.log(reservation);
            const response = await this.post("/reservation/create",
                {
                    "driver_id": reservation.driver_id,
                    "ride_id": reservation.ride_id,
                    "status": reservation.status,
                    "price": reservation.price,
                    "passenger_count": reservation.passenger_count,
                }
            );
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






    public async getReservationsByStatus(status: string): Promise<any> {
        try {
            const response = await this.post("/reservation/available", {
                "status": status
            });
            return response;
        } catch (error) {
            console.error("Error getting reservations by status: ", error);
            throw error;
        }
    }
}

export default new ReservationService();