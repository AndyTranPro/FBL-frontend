import React, { useState } from 'react';
import { useAppDispatch } from '../features/store';
import { addGame } from '../features/gamesSlice';

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

        await dispatch(addGame({ name, author, rules: formattedRules }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Game Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                <label>Min</label>
                <input type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value) || 0)} min="0"/>
            </div>
            <div>
                <label>Max</label>
                <input type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value))} min={min}/>
            </div>
            <div>
                <label>Rules</label>
                {rules.map((rule, index) => (
                    <div key={index}>
                        <input type="text" placeholder="Number" value={rule.number} onChange={(e) => {
                            const newRules = [...rules];
                            newRules[index].number = e.target.value;
                            setRules(newRules);
                        }} />
                        <input type="text" placeholder="Word" value={rule.word} onChange={(e) => {
                            const newRules = [...rules];
                            newRules[index].word = e.target.value;
                            setRules(newRules);
                        }} />
                    </div>
                ))}
                <button type="button" onClick={handleAddRule}>Add Rule</button>
            </div>
            <button type="submit">Create Game</button>
        </form>
    );
};

export default GameForm;
