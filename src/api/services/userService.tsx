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

  // get user by id
  public async getUserById(userId: string): Promise<any> {
    try {
      const response = await this.get(`/users/${userId}`);
      return response;
    } catch (error) {
      console.error(`Error getting user by ID ${userId}: `, error);
      throw error;
    }
  }
}

export default new UserService();
