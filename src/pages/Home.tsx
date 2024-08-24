import React from 'react';
import GameList from '../components/GameList';
import GameForm from '../components/GameForm';

// The Home page, which displays the game form and the list of games

const Home: React.FC = () => {
    return (
        <div>
            <h1>FizzBuzz Game Creator</h1>
            <GameForm />
            <GameList />
        </div>
    );
};

export default Home;
