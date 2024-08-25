import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../features/store';
import { fetchGames } from '../features/gamesSlice';
import { Link } from 'react-router-dom';
import { Typography, Box, List, ListItem, Button } from '@mui/material';

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
        <Box sx={{ mt: 1 }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 'bold'
                }}
            >
                Available Games
            </Typography>
            <List sx={{ height: '100%', overflow: 'auto' }}>
                {games.map((game) => (
                    <ListItem key={game.gameId} sx={{ justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={`/games/${game.gameId}`}
                            sx={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                                },
                            }}
                        >
                            {game.name}
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default GameList;