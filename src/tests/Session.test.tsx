import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Session from '../components/Session';
import { fetchNextNumber, sendAnswer, endCurrentSession } from '../features/sessionSlice';

jest.mock('../features/sessionSlice', () => ({
    fetchNextNumber: jest.fn(),
    sendAnswer: jest.fn(),
    endCurrentSession: jest.fn(),
}));

const mockStore = configureStore([]);

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const renderComponent = (store: any, sessionId: number) => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <Session sessionId={sessionId} />
            </MemoryRouter>
        </Provider>
    );
};

describe('Session Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            session: {
                currentNumber: 42,
                duration: 30,
            },
        });
        store.dispatch = jest.fn();
    });

    test('fetches next number', () => {
        const sessionId = 1;
        renderComponent(store, sessionId);

        expect(store.dispatch).toHaveBeenCalledWith(fetchNextNumber(sessionId));
    });

    test('renders current number and time left', () => {
        renderComponent(store, 1);

        expect(screen.getByText(/Current Number: 42/i)).toBeInTheDocument();
        expect(screen.getByText(/Time Left: 30s/i)).toBeInTheDocument();
    });

    test('updates time left every second', async () => {
        renderComponent(store, 1);

        expect(screen.getByText(/Time Left: 30s/i)).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText(/Time Left: 29s/i)).toBeInTheDocument(), {
            timeout: 1100,
        });
    });

    test('submits the answer and fetches next number', async () => {
        renderComponent(store, 1);

        const input = screen.getByLabelText(/Your Answer/i);
        const form = screen.getByRole('button', { name: /Submit/i });

        fireEvent.change(input, { target: { value: 'Fizz' } });
        fireEvent.click(form);

        await waitFor(() => {
            expect(store.dispatch).toHaveBeenCalledWith(sendAnswer({ sessionId: 1, number: 42, answer: 'Fizz' }));
            expect(store.dispatch).toHaveBeenCalledWith(fetchNextNumber(1));
        });
    });

    test('ends the session and navigates to results', async () => {
        renderComponent(store, 1);

        const endButton = screen.getByRole('button', { name: /End Session/i });
        fireEvent.click(endButton);

        await waitFor(() => {
            expect(store.dispatch).toHaveBeenCalledWith(endCurrentSession(1));
            expect(mockNavigate).toHaveBeenCalledWith('/sessions/1/results');
        });
    });
});