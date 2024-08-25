import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    startSession, 
    getNextNumber, 
    submitAnswer, 
    endSession as apiEndSession, 
    getResults
} from '../api/api';

// A feature to manage the session state

interface SessionState {
    sessionId: number | null;
    currentNumber: number | null;
    numQuestions: number;
    score: number;
    status: 'idle' | 'in-progress' | 'ended';
    duration: number;
    error: string | null;
}

// The initial state of the session slice
const initialState: SessionState = {
    sessionId: null,
    currentNumber: null,
    numQuestions: 0,
    score: 0,
    status: 'idle',
    duration: 0,
    error: null,
};

// begins a new session
export const beginSession = createAsyncThunk('session/beginSession', async (sessionData: { gameId: number; playerName: string; duration: number }) => {
    const response = await startSession(sessionData.gameId, sessionData.playerName, sessionData.duration);
    return response;
});

// fetches the next number in the session
export const fetchNextNumber = createAsyncThunk('session/fetchNextNumber', async (sessionId: number) => {
    const response = await getNextNumber(sessionId);
    return response;
});

// sends the answer to the server
export const sendAnswer = createAsyncThunk('session/sendAnswer', async (answerData: { sessionId: number; number: number; answer: string }) => {
    const response = await submitAnswer(answerData.sessionId, answerData.number, answerData.answer);
    return response.isCorrect;
});

// end the current session
export const endCurrentSession = createAsyncThunk('session/endCurrentSession', async (sessionId: number) => {
    await apiEndSession(sessionId);
    const results = await getResults(sessionId);
    return results;
});

// The session slice contains the session data and the status of the request
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        endSession(state) {
            state.status = 'ended';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(beginSession.fulfilled, (state, action) => {
                state.sessionId = action.payload.sessionId;
                state.status = 'in-progress';
                state.score = 0;
                state.numQuestions = 0;
                state.duration = action.payload.duration;
                state.error = null;
            })
            .addCase(fetchNextNumber.fulfilled, (state, action) => {
                state.currentNumber = action.payload;
            })
            .addCase(endCurrentSession.fulfilled, (state, action) => {
                state.status = 'ended';
                state.score = action.payload.finalScore;
                state.numQuestions = action.payload.totalQuestions;
            });
    },
});

export const { endSession } = sessionSlice.actions;
export default sessionSlice.reducer;
