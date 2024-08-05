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

export const getUserById = async (userId: string): Promise<any> => {
  try {
    const response = await userService.getUserById(userId);
    if (response.status === "error") {
      throw new Error("Failed to get user by ID");
    }
    return response;
  } catch (error) {
    console.error("Error getting user by ID: ", error);
    throw error;
  }
};
