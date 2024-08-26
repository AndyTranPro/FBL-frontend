import sessionReducer, {
    beginSession,
    fetchNextNumber,
    sendAnswer,
    endCurrentSession,
    SessionState,
    endSession,
} from '../features/sessionSlice'; // Adjust the import path as needed
import {
    startSession,
    getNextNumber,
    submitAnswer,
    endSession as apiEndSession,
    getResults,
} from '../api/api';

jest.mock('../api/api');

describe('sessionSlice', () => {
    let initialState: SessionState;

    beforeEach(() => {
        initialState = {
            sessionId: null,
            currentNumber: null,
            numQuestions: 0,
            score: 0,
            status: 'idle',
            duration: 0,
            error: null,
        };
    });

    describe('reducers and extraReducers', () => {
        it('should handle initial state', () => {
            expect(sessionReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });

        it('should handle endSession action', () => {
            const nextState = sessionReducer(initialState, endSession());
            expect(nextState.status).toEqual('ended');
        });

        it('should handle beginSession.fulfilled', () => {
            const payload = {
                sessionId: 1,
                duration: 60,
            };
            const nextState = sessionReducer(initialState, beginSession.fulfilled(payload, '', { gameId: 1, playerName: 'John Doe', duration: 60 }));
            expect(nextState.sessionId).toEqual(payload.sessionId);
            expect(nextState.status).toEqual('in-progress');
            expect(nextState.duration).toEqual(payload.duration);
            expect(nextState.score).toEqual(0);
            expect(nextState.numQuestions).toEqual(0);
            expect(nextState.error).toBeNull();
        });

        it('should handle fetchNextNumber.fulfilled', () => {
            const payload = 42;
            const nextState = sessionReducer(initialState, fetchNextNumber.fulfilled(payload, '', 1));
            expect(nextState.currentNumber).toEqual(payload);
        });

        it('should handle endCurrentSession.fulfilled', () => {
            const payload = {
                finalScore: 10,
                totalQuestions: 15,
            };
            const nextState = sessionReducer(initialState, endCurrentSession.fulfilled(payload, '', 1));
            expect(nextState.status).toEqual('ended');
            expect(nextState.score).toEqual(payload.finalScore);
            expect(nextState.numQuestions).toEqual(payload.totalQuestions);
        });
    });

    describe('async actions', () => {
        it('beginSession should dispatch correct actions on success', async () => {
            const mockResponse = { sessionId: 1, duration: 60 };
            (startSession as jest.Mock).mockResolvedValueOnce(mockResponse);

            const dispatch = jest.fn();
            const thunk = beginSession({ gameId: 1, playerName: 'John Doe', duration: 60 });

            await thunk(dispatch, () => ({ session: initialState }), null);

            const [pending, fulfilled] = dispatch.mock.calls;

            expect(pending[0].type).toEqual(beginSession.pending.type);
            expect(fulfilled[0].type).toEqual(beginSession.fulfilled.type);
            expect(fulfilled[0].payload).toEqual(mockResponse);
        });

        it('fetchNextNumber should dispatch correct actions on success', async () => {
            const mockResponse = 42;
            (getNextNumber as jest.Mock).mockResolvedValueOnce(mockResponse);

            const dispatch = jest.fn();
            const thunk = fetchNextNumber(1);

            await thunk(dispatch, () => ({ session: initialState }), null);

            const [pending, fulfilled] = dispatch.mock.calls;

            expect(pending[0].type).toEqual(fetchNextNumber.pending.type);
            expect(fulfilled[0].type).toEqual(fetchNextNumber.fulfilled.type);
            expect(fulfilled[0].payload).toEqual(mockResponse);
        });

        it('sendAnswer should dispatch correct actions on success', async () => {
            const mockResponse = { isCorrect: true };
            (submitAnswer as jest.Mock).mockResolvedValueOnce(mockResponse);

            const dispatch = jest.fn();
            const thunk = sendAnswer({ sessionId: 1, number: 42, answer: 'Fizz' });

            await thunk(dispatch, () => ({ session: initialState }), null);

            const [pending, fulfilled] = dispatch.mock.calls;

            expect(pending[0].type).toEqual(sendAnswer.pending.type);
            expect(fulfilled[0].type).toEqual(sendAnswer.fulfilled.type);
            expect(fulfilled[0].payload).toEqual(mockResponse.isCorrect);
        });

        it('endCurrentSession should dispatch correct actions on success', async () => {
            const mockResults = { finalScore: 10, totalQuestions: 15 };
            (apiEndSession as jest.Mock).mockResolvedValueOnce({});
            (getResults as jest.Mock).mockResolvedValueOnce(mockResults);

            const dispatch = jest.fn();
            const thunk = endCurrentSession(1);

            await thunk(dispatch, () => ({ session: initialState }), null);

            const [pending, fulfilled] = dispatch.mock.calls;

            expect(pending[0].type).toEqual(endCurrentSession.pending.type);
            expect(fulfilled[0].type).toEqual(endCurrentSession.fulfilled.type);
            expect(fulfilled[0].payload).toEqual(mockResults);
        });
    });
});
