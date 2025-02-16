import axios from 'axios';
const API_URL = 'http://localhost:5000/api/candidates';

export const getCandidates = async () => {
    return await axios.get(API_URL + '/get');
};

export const getCandidate = async (id: string) => {;
    return await axios.get(`${API_URL}/${getCandidate}/${id}`);
};
