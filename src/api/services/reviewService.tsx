import ApiService from "./apiService";

class ReviewService extends ApiService {
  public async createReview(review: { description: string, rating: number, driver_id: number }): Promise<any> {
    try {
      const response = await this.post("/review/add",
        {
          "description": review.description,
          "rating": review.rating,
          "driver_id": review.driver_id
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error creating review: ", error);
      throw error;
    }
  }

  public async getReviews(driver_id: string): Promise<any> {
    try {
      console.log("Fetching reviews for driver form service:", driver_id);
      const response = await this.get(`/reviews/driver/${driver_id}`);
      console.log("API Response:", response); // Log entire API response
      if (response && response.status === "success" && Array.isArray(response.reviews)) {
        return response.reviews; // Adjust based on actual response structure
      } else {
        console.error("Response data is not an array");
        return [];
      }
    } catch (error) {
      console.error("Error getting reviews: ", error);
      throw error;
    }
  }




  public async getReviewById(id: string): Promise<any> {
    try {
      const response = await this.get(`/review/${id}`);
      console.log("API Response:", response); // Log entire API response

      if (response && response.status === "success" && response.review) {
        return response.review; // Adjust based on actual response structure
      } else {
        console.error("Review not found or invalid response structure");
        throw new Error("Review not found or invalid response structure");
      }
    } catch (error) {
      console.error("Error getting review: ", error);
      throw error;
    }
  }
}

export default new ReviewService();
