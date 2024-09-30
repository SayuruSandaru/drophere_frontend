import ApiService from "./apiService";

class UserService extends ApiService {
  public async getUserDetails(): Promise<any> {
    try {
      const response = await this.get("/users");
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


  public async updateUserStatus(userId: number, status: string): Promise<any> {
    try {
        const response = await this.post('/user/status', { user_id: userId, status });
        return response;
    } catch (error) {
        console.error('Error updating user status: ', error);
        throw error;
    }
}

  

}

export default new UserService();
