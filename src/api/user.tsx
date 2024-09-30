import userService from "./services/userService";
import CookieManager from "api/cookieManager";

export const getUserDetails = async (): Promise<any> => {
  try {
    const response = await userService.getUserDetails();
    if (response.status === "error") {
      throw new Error("Failed to get user details");
    }
    return response;
  } catch (error) {
    console.error("Error getting user details: ", error);
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<any> => {
  try {
    const response = await userService.getUserById(userId);
    if (response.status === "success") {
      return response; // Return the entire response object
    } else {
      throw new Error("Failed to get user by ID");
    }
  } catch (error) {
    console.error("Error getting user by ID: ", error);
    throw error;
  }
};


// Delete user by ID
export const deleteUser = async (userId: string): Promise<any> => {
  try {
    const token = CookieManager.getCookie("token"); // Fetch token from cookie (or however you store it)
    if (!token) {
      throw new Error("No authorization token found");
    }

    const response = await fetch(`http://localhost:8000/users/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
        'Content-Type': 'application/json',
      },
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      if (data.status === "success") {
        return data;
      } else {
        throw new Error(data.message || "Failed to delete user");
      }
    } else {
      // If the response is not JSON, read it as text
      const text = await response.text();
      console.error("Unexpected response:", text);
      throw new Error("Server returned an unexpected response");
    } 
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}: `, error);
    throw error;
  }
};

export const updateUserStatus = async (userId: number, status: string): Promise<any> => {
  try {
      const response = await userService.updateUserStatus(userId, status);
      if (response.status === 'error') {
          throw new Error('Failed to update user status');
      }
      return response; // Handle the response as needed
  } catch (error) {
      console.error('Error updating user status: ', error);
      throw error;
  }
};
