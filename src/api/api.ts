import axios from 'axios';

const API_BASE_URL = 'http://localhost:5054/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const createGame = async (name: string, author: string, rules: Record<number, string>) => {
    const response = await api.post('/games', { name, author, rules });
    return response.data;
};

export const getGames = async () => {
    const response = await api.get('/games');
    return response.data;
};

export const startSession = async (gameId: number, playerName: string, duration: number) => {
    const response = await api.post('/sessions', { gameId, playerName, duration });
    return response.data;
};

export const getSession = async (sessionId: number) => {
    const response = await api.get(`/sessions/${sessionId}`);
    return response.data;
};

export const getNextNumber = async (sessionId: number) => {
    const response = await api.get(`/sessions/${sessionId}/next-number`);
    return response.data;
};

export const submitAnswer = async (sessionId: number, number: number, answer: string) => {
    const response = await api.post(`/sessions/${sessionId}/submit-answer`, { number, answer });
    return response.data;
};

export const endSession = async (sessionId: number) => {
    const response = await api.post(`/sessions/${sessionId}/end`);
    return response.data;
};

export const getResults = async (sessionId: number) => {
    const response = await api.get(`/sessions/${sessionId}/results`);
    return response.data;
}
