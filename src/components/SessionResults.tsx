import React from 'react';
import { useAppSelector } from '../features/store';

interface SessionResultsProps {
    sessionId: number;
}

// A component to display the results of the session

const SessionResults: React.FC<SessionResultsProps> = ({ sessionId }) => {
    const score = useAppSelector((state) => state.session.score);
    const totalQuestions = useAppSelector((state) => state.session.numQuestions);

    return (
        <div>
            <div style={{display: 'none'}}>{sessionId}</div>
            <h3>Game Over!</h3>
            <p>Your Score: {score}/{totalQuestions}</p>
        </div>
    );
};

export default SessionResults;
