import React, { useState } from 'react';
import { useAppDispatch } from '../features/store';
import { addGame } from '../features/gamesSlice';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';

// A form component to create a new game

const GameForm: React.FC = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);
    const [rules, setRules] = useState<{ number: string; word: string }[]>([{ number: '', word: '' }]);
    const dispatch = useAppDispatch();

    // Add a new rule to the form
    const handleAddRule = () => {
        setRules([...rules, { number: '', word: '' }]);
    };

    // Submit the form to create a new game
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formattedRules = rules.reduce((acc, rule) => {
            acc[parseInt(rule.number)] = rule.word;
            return acc;
        }, {} as Record<number, string>);

        await dispatch(addGame({ name, author, min, max, rules: formattedRules }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography
            variant="h4"
            gutterBottom
            sx={{
                textAlign: 'center',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold'
            }}
            >
            Create a New Game
        </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Game Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Min"
                        type="number"
                        value={min}
                        onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                        fullWidth
                        variant="outlined"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Max"
                        type="number"
                        value={max}
                        onChange={(e) => setMax(parseInt(e.target.value))}
                        fullWidth
                        variant="outlined"
                        inputProps={{ min: min }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Rules
                    </Typography>
                    {rules.map((rule, index) => (
                        <Grid container spacing={2} key={index} marginBottom={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Number"
                                    value={rule.number}
                                    onChange={(e) => {
                                        const newRules = [...rules];
                                        newRules[index].number = e.target.value;
                                        setRules(newRules);
                                    }}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Word"
                                    value={rule.word}
                                    onChange={(e) => {
                                        const newRules = [...rules];
                                        newRules[index].word = e.target.value;
                                        setRules(newRules);
                                    }}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddRule}
                        sx={{ fontWeight: 'bold' }}
                    >
                        Add Rule
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2, fontWeight: 'bold' }}
                    >
                        Create Game
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GameForm;