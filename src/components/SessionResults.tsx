import React from 'react';
import { useAppSelector } from '../features/store';
import { useNavigate } from 'react-router-dom';


interface SessionResultsProps {
    sessionId: number;
}

// A component to display the results of the session

const SessionResults: React.FC<SessionResultsProps> = ({ sessionId }) => {
    const score = useAppSelector((state) => state.session.score);
    const navigate = useNavigate();
    const totalQuestions = useAppSelector((state) => state.session.numQuestions);

    console.log("SessionResults: ", sessionId, score, totalQuestions);

    const BackToHomePage = () => {
        navigate("/");
    };

    return (
        <div>
            <div style={{display: 'none'}}>{sessionId}</div>
            <h3>Game Over!</h3>
            <p>Your Score: {score}/{totalQuestions}</p>
            <button onClick={BackToHomePage}>Back to home</button>
        </div>
    );
};

export default SessionResults;
