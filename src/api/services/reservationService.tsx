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
}

export default new ReservationService();