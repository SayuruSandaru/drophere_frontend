import ApiService from "./apiService";

class DriverService extends ApiService {
    public async createDriver(driver: any): Promise<any> {
        try {
            const response = await this.post("/driver/register",
                {
                    "street": driver.street,
                    "city": driver.city,
                    "province": driver.state,
                    "proof_document": driver.proof_document,
                }
            );
            return response;
        } catch (error) {
            console.error("Error creating driver: ", error);
            throw error;
        }
    }

    public async getDriver(): Promise<any> {
        try {
            const response = await this.get("/drivers");
            return response;
        } catch (error) {
            console.error("Error getting driver: ", error);
            throw error;
        }
    }

    public async getDriverById(id: string): Promise<any> {
        try {
            const response = await this.get(`/driver/${id}`);
            return response;
        } catch (error) {
            console.error("Error getting driver: ", error);
            throw error;
        }
    }
}

export default new DriverService();