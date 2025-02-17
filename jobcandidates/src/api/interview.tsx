import axios from 'axios';
const API_URL = 'http://localhost:5000/api/interviews';

export const getInterviews = async () => {
    return await axios.get(API_URL + '/get');
};

export const getInterview = async (id: string) => {
    ;
    return await axios.get(`${API_URL}/${getInterview}/${id}`);
};
