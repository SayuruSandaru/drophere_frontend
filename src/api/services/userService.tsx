// services/userService.tsx
import ApiService from "./apiService";

class UserService extends ApiService {
  public async getUserDetails(): Promise<any> {
    try {
      const response = await this.get("/user");
      return response;
    } catch (error) {
      console.error("Error getting user details: ", error);
      throw error;
    }
  }
}

export default new UserService();