import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../features/store';
import { fetchNextNumber, sendAnswer, endCurrentSession } from '../features/sessionSlice';
import { useNavigate } from 'react-router-dom';

// A component that is responsible for handling the session

const Session: React.FC<{ sessionId: number }> = ({ sessionId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentNumber = useAppSelector((state) => state.session.currentNumber);
    const duration = useAppSelector((state) => state.session.duration);
    const [answer, setAnswer] = useState('');

    // Fetch the next number when the component is mounted
    useEffect(() => {
        dispatch(fetchNextNumber(sessionId));
    }, [dispatch, sessionId]);

    // Submit the answer to the server
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(sendAnswer({ sessionId, number: currentNumber!, answer }));
        setAnswer('');
        dispatch(fetchNextNumber(sessionId));
    };

    const handleEndSession = async () => {
        await dispatch(endCurrentSession(sessionId));
        navigate(`/sessions/${sessionId}/results`);
    };

    // End the session if the duration has passed
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleEndSession();
        }, duration * 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [duration, handleEndSession]);

    return (
        <div>
            <h3>Session in Progress</h3>
            {currentNumber && (
                <div>
                    <p>Current Number: {currentNumber}</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            <button onClick={handleEndSession}>End Session</button>
        </div>
    );
};

export default Session;
