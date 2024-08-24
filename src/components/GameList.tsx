import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../features/store';
import { fetchGames } from '../features/gamesSlice';
import { Link } from 'react-router-dom';

// A component that displays a list of games

const GameList: React.FC = () => {
    const dispatch = useAppDispatch();
    // Select the list of games from the store
    const games = useAppSelector((state) => state.games.games);

    // Fetch the list of games when the component is mounted
    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    return (
        <div>
            <h2>Available Games</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.gameId}>
                        <Link to={`/games/${game.gameId}`}>{game.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameList;