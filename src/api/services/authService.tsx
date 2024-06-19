import ApiService from "./apiService";

class AuthService extends ApiService {
  public async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.post("/login", {
        email,
        password

      }, false);
      return response;
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  }

  public async register(username: string, email: string, password: string, firstname: string, lastname: string, phone: string, profile_image: string): Promise<any> {
    try {
      const response = await this.post("/register", {
        username,
        email,
        password,
        firstname,
        lastname,
        phone,
        profile_image
      }, false);
      return response;
    } catch (error) {
      console.error("Error registering: ", error);
      throw error;
    }
  }
}

export default new AuthService();