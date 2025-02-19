import axios from 'axios';
const API_URL = 'http://localhost:5000/api/candidates';

export const getCandidates = async () => {
    return await axios.get(API_URL + '/all');
};

export const getCandidate = async (id: string) => {
    return await axios.get(`${API_URL}/get_${id}`);
};
export const newCandidate= async () => {
    return await axios.get(`${API_URL}/newcandidate`);
};
