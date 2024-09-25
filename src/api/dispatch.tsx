// api/dispatch.tsx
import dispatchService from "./services/dispatchService";

export const getDispatchDetails = async (): Promise<any[]> => {
  try {
    const response = await dispatchService.getDispatchDetails();
    if (response.status === "error") {
      throw new Error("Failed to get dispatch details");
    }
    return response.disputes; // Access the disputes array
  } catch (error) {
    console.error("Error getting dispatch details: ", error);
    throw error;
  }
};

export const updateDisputeStatus = async (disputeId: number, status: string): Promise<any> => {
  try {
    const response = await dispatchService.updateDisputeStatus(disputeId, status);
    if (response.status === "error") {
      throw new Error("Failed to update dispute status");
    }
    return response; // Handle the response as needed
  } catch (error) {
    console.error("Error updating dispute status: ", error);
    throw error;
  }
};
