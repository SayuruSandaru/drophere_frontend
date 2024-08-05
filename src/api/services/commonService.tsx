import ApiService from "./apiService";

class CommonService extends ApiService {
    public async fileUpload(file: File): Promise<any> {
        try {
            console.log('Uploading file coomo:', file);
            const formData = new FormData();
            formData.append('file', file);
            const response = await this.uploadFile('/common/upload', formData);
            console.log('File uploaded:', response);
            return response;
        } catch (error) {
            console.error('Error uploading file: ', error);
            throw error;
        }
    }
}

export default new CommonService();