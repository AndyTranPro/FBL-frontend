import React from 'react';
import { useParams } from 'react-router-dom';
import SessionResults from '../components/SessionResults';

const SessionResultsPage: React.FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>();

    return (
        <div>
            <SessionResults sessionId={Number(sessionId)} />
        </div>
    );
};

export default SessionResultsPage;