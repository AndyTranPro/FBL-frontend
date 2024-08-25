import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import GameList from '../components/GameList';
import GameForm from '../components/GameForm';

// The Home page, which displays the game form and the list of games

const Home: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Box
                    sx={{
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        color: 'white',
                        justifyContent: 'center'
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            justifyContent: 'center',
                            WebkitBackgroundClip: 'text',
                            fontFamily: 'cursive',
                            fontWeight: 'bold'
                        }}
                    >
                        FizzBuzz Game Creator
                    </Typography>
                </Box>
                <Grid container spacing={4} mt={4}>
                    <Grid item xs={12} md={6}>
                        <GameForm />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GameList />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;