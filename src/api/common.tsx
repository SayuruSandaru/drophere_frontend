import commonService from './services/commonService';

export const fileUpload = async (file: File): Promise<any> => {
    try {
        const response = await commonService.fileUpload(file);
        if (response.status === "error") {
            throw new Error('File upload failed');
        }
        return response.url;
    } catch (error) {
        console.error('Error uploading file: ', error);
        throw error;
    }
};