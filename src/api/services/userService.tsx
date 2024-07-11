import ApiService from "./apiService";

class UserService extends ApiService {

    public async createDispute(dispute: any): Promise<any> {
        try {
            console.log(dispute);
            const response = await this.post("/user/dispute/create",
                {
                    "category": dispute.category,
                    "status": dispute.status,
                    "message": dispute.message
                }
            );
            return response;
        } catch (error) {
            console.error("Error creating dispute: ", error);
            throw error;
        }
    }
}
export default new UserService();

