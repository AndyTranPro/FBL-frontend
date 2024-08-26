import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    createGame,
    getGames,
    startSession,
    getSession,
    getNextNumber,
    submitAnswer,
    endSession,
    getResults,
    api
} from '../api/api';

const mock = new MockAdapter(api);

describe('API utility functions', () => {
    afterEach(() => {
        mock.reset();
    });

    test('createGame should post game data and return response data', async () => {
        const mockResponse = { id: 1, name: 'Test Game' };
        mock.onPost('/games').reply(200, mockResponse);

        const result = await createGame('Test Game', 'John Doe', 1, 100, { 3: 'Fizz', 5: 'Buzz' });

        expect(result).toEqual(mockResponse);
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual({
            name: 'Test Game',
            author: 'John Doe',
            min: 1,
            max: 100,
            rules: { 3: 'Fizz', 5: 'Buzz' },
        });
    });

    test('getGames should fetch games and return response data', async () => {
        const mockResponse = [{ id: 1, name: 'Test Game' }];
        mock.onGet('/games').reply(200, mockResponse);

        const result = await getGames();

        expect(result).toEqual(mockResponse);
        expect(mock.history.get.length).toBe(1);
    });

    test('startSession should post session data and return response data', async () => {
        const mockResponse = { sessionId: 1, gameId: 1 };
        mock.onPost('/sessions').reply(200, mockResponse);

        const result = await startSession(1, 'John Doe', 60);

        expect(result).toEqual(mockResponse);
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual({
            gameId: 1,
            playerName: 'John Doe',
            duration: 60,
        });
    });

    test('getSession should fetch session data by sessionId and return response data', async () => {
        const mockResponse = { sessionId: 1, gameId: 1 };
        mock.onGet('/sessions/1').reply(200, mockResponse);

        const result = await getSession(1);

        expect(result).toEqual(mockResponse);
        expect(mock.history.get.length).toBe(1);
    });

    test('getNextNumber should fetch the next number for the session and return response data', async () => {
        const mockResponse = { number: 15 };
        mock.onGet('/sessions/1/next-number').reply(200, mockResponse);

        const result = await getNextNumber(1);

        expect(result).toEqual(mockResponse);
        expect(mock.history.get.length).toBe(1);
    });

    test('submitAnswer should post answer and return response data', async () => {
        const mockResponse = { correct: true };
        mock.onPost('/sessions/1/submit-answer').reply(200, mockResponse);

        const result = await submitAnswer(1, 15, 'FizzBuzz');

        expect(result).toEqual(mockResponse);
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual({
            number: 15,
            answer: 'FizzBuzz',
        });
    });

    test('endSession should post end session request and return response data', async () => {
        const mockResponse = { sessionId: 1, ended: true };
        mock.onPost('/sessions/1/end').reply(200, mockResponse);

        const result = await endSession(1);

        expect(result).toEqual(mockResponse);
        expect(mock.history.post.length).toBe(1);
    });

    test('getResults should fetch results by sessionId and return response data', async () => {
        const mockResponse = { score: 10, total: 15 };
        mock.onGet('/sessions/1/results').reply(200, mockResponse);

        const result = await getResults(1);

        expect(result).toEqual(mockResponse);
        expect(mock.history.get.length).toBe(1);
    });
});
