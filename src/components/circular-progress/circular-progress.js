import React from 'react';
import './circular-progress.css'
import { CircularProgress as MuiCircularProgress, Box } from '@material-ui/core';
export default function CircularProgress({children, color, ...props}) {
    return (
        <Box className="circular-progress" color={color}>
            <MuiCircularProgress {...props} color="inherit" />
            <div className="circular-progress__content">
                {children}
            </div>
        </Box>
    );
}