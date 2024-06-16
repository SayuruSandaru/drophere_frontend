import ApiService from "./apiService";

class AuthService extends ApiService {
  public async login(email: string, password: string): Promise<any> {
    try {
      // const response = await this.post("/login", {
      //   email,
      //   password,
      // }, false);
      //   fetch(this.baseUrl + path, {
      //     method: "POST",
      //     headers: header,
      //     body: JSON.stringify(data),
      // });

      const response = await fetch("https://cors-anywhere.herokuapp.com/https://drophere-staging-665f7065c9e0.herokuapp.com" + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);
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