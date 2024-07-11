import ApiService from "./apiService";

class UserService extends ApiService {  

    public async createDispute(dispute: any): Promise<any> {
        try {
            console.log(dispute);
            const response = await this.post("/dispute/create",
                {
                    "user_Id": dispute.user_Id,
                    "$category":dispute.category,
                    "$status":dispute.status,
                    "$message":dispute.message
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

