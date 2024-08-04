// api/user.tsx
import userService from "./services/userService";

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