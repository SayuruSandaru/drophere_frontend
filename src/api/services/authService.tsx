import { AnyFunction } from "@chakra-ui/utils";
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

  public async register(user: any): Promise<any> {
    try {
      const r = {
        "email": user.email,
        "password": user.password,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "username": user.username,
        "phone": user.phone,
        "profile_image": "NOT AVAILABLE"
      };
      console.log(r);
      const response = await this.post("/register", r, false);
      return response;
    } catch (error) {
      console.error("Error registering: ", error);
      throw error;
    }
  }

  public async getUser(): Promise<any> {  
    try {
      const response = await this.get("/user", true);
      return response;
    } catch (error) {
      console.error("Error getting user: ", error);
      throw error;
    }
  }
}

export default new AuthService();