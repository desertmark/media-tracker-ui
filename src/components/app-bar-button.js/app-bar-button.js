import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './app-bar-button.css';

export default function AppBarButton({ to, children}) {
    return (
        <div className="app-bar-button">
            <Link to={to}>
                <Button>
                    {children}
                </Button>
            </Link>
        </div>
    );
}