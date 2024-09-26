import { AnyFunction } from "@chakra-ui/utils";
import ApiService from "./apiService";


class AuthService extends ApiService {


  public async logout(): Promise<any> {
    try {
      const response = await this.post("/logout", {}, true);
      // Clear any local storage or state here
      localStorage.removeItem('token');
      
      // Assuming you store the token in localStorage
      return response;
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  }

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

  public async adminLogin(email: string, password: string): Promise<any> {
    try {
      const response = await this.post("/admin/login", {
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
        "profile_image": user.profile_image
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

  public async updateUserImg(email: string, url: string): Promise<any> {
    try {
      console.log('Updating user image. Email:', email, 'URL:', url);
      const response = await this.post("/update",
        {
          "email": email,
          "profile_image": url
        }
      );
      console.log('Update user image response:', response);
      return response;
    } catch (error) {
      console.error("Error updating user image: ", error);
      throw error;
    }
  }





}

export default new AuthService();