import reviewService from "./services/reviewService";

export const createReview = async (review: { description: string, rating: number, driver_id: number }): Promise<any> => {
    try {
        console.log(review);
        const response = await reviewService.createReview({
            "description": review.description,
            "rating": review.rating,
            "driver_id": review.driver_id,
        });
        if (response.status === "error") {
            throw new Error("Failed to create review");
        }
        return response;
    } catch (error) {
        console.error("Error creating review: ", error);
        throw error;
    }
};

export const getReviews = async (): Promise<any> => {
    try {
       const response = await reviewService.getReviews();
       console.log("Fetched reviews:", response); // Log fetched reviews
       if (Array.isArray(response)) {
          return response;
       } else {
          console.error("Fetched reviews is not an array");
          return [];
       }
    } catch (error) {
       console.error("Error getting reviews: ", error);
       throw error;
    }
 };

 export const getReviewById = async (id: string): Promise<any> => {
    try {
        const response = await reviewService.getReviewById(id);
        if (response) {
            return response;
        } else {
            console.error("Review not found");
            throw new Error("Review not found");
        }
    } catch (error) {
        console.error("Error getting review: ", error);
        throw error;
    }
};
