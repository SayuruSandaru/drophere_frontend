import ApiService from "./apiService";

class DriverService extends ApiService {
    public async createDriver(driver: any): Promise<any> {
        try {
            const response = await this.post("/driver/register",
                {
                    "street": driver.street,
                    "city": driver.city,
                    "province": driver.province,
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

    public async getDriverByUserId(): Promise<any> {
        try {
            const response = await this.post("/driver/user", {});
            return response;
        } catch (error) {
            console.error("Error getting driver: ", error);
            throw error;
        }
    }

    
    public async updateDriverStatus(driverId: number, status: string): Promise<any> {
        try {
          console.log(`Updating status for driverId: ${driverId} with status: ${status}`);
          const response = await this.put(`/driver/${driverId}/status`, { status: status });
          console.log("Response:", response);
          return response;
        } catch (error) {
          console.error('Error updating driver status:', error);
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Unknown error occurred');
          }
        }
      }
      
      

}
    

export default new DriverService();