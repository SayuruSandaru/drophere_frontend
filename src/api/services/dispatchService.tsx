// services/dispatchService.tsx
import ApiService from "./apiService";

class DispatchService extends ApiService {
  public async getDispatchDetails(): Promise<any> {
    try {
      const response = await this.get("/user/disputes");
      return response;
    } catch (error) {
      console.error("Error getting dispatch details: ", error);
      throw error;
    }
  }

  public async updateDisputeStatus(disputeId: number, status: string): Promise<any> {
    try {
      const response = await this.post(`/user/dispute/status`, { dispute_id: disputeId, status });
      return response;
    } catch (error) {
      console.error("Error updating dispute status: ", error);
      throw error;
    }
  }
}

export default new DispatchService();