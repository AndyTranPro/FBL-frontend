import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../features/store';
import { beginSession } from '../features/sessionSlice';

// A page to start a new session for a game

const Game: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [duration, setDuration] = useState(60);

    const handleStartSession = async () => {
        await dispatch(beginSession({ gameId: Number(gameId), playerName, duration }));
        navigate(`/sessions/${gameId}`);
    };

    return (
        <div>
            <h2>Start a Session</h2>
            <div>
                <label>Player Name</label>
                <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            </div>
            <div>
                <label>Duration (seconds)</label>
                <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
            </div>
            <button onClick={handleStartSession}>Start Session</button>
        </div>
    );
};

export default Game;
