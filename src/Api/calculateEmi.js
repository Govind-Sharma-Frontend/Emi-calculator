import axios from "axios"
axios.defaults.baseURL='http://localhost:4001/v1'


export const calculateEmiApi = async (data) => {
    try {
        const response = await axios.post('/calculateEmiAmount',data);
        return response.data
    } catch (error) {
        console.log('throw error---->', error);
        return error;
    }
}