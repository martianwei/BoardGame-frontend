import React from 'react';
import { Grid, Box } from '@mui/material';

const GameboardPage = () => {
    return (
        <Box sx={{ maxWidth: 500, margin: '100px auto' }}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Gameboard rows={6} columns={5} />
                </Grid>
            </Grid>
        </Box>
    );
};

const Gameboard = ({ rows, columns }) => {
    return (
        <Grid container spacing={0}>
            {Array.from({ length: rows }, (_, row) => (
                <Grid container item key={row} xs={12}>
                    {Array.from({ length: columns }, (_, col) => (
                        <Intersection
                            key={col}
                            hasOutline={col !== columns - 1 && row !== rows - 1}
                            isCircle={
                                (col === 1 && row === 1) ||
                                (col === 1 && row === 3) ||
                                (col === 3 && row === 1) ||
                                (col === 3 && row === 3)
                            }
                        />
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

const Intersection = ({ hasOutline, isCircle }) => {
    return (
        <Box
            sx={{
                width: '50px',
                height: '50px',
                position: 'relative',
                outline: hasOutline ? '1px solid' : 'none',
            }}
        >

            {isCircle ? <Circle /> : <Rectangle />}
        </Box>
    );
};


const Rectangle = () => {
    return (
        <Box
            sx={{
                width: '40px',
                height: '20px',
                position: 'absolute',
                outline: '1px solid',
                backgroundColor: 'white',
                top: '0',
                left: '0',
                transform: 'translate(-50%, -50%)',
            }}
        ></Box>
    );
};
const Circle = () => {
    return (
        <Box
            sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                outline: '1px solid',
                backgroundColor: 'white',
                position: 'absolute',
                top: '0',
                left: '0',
                transform: 'translate(-50%, -50%)',
            }}
        ></Box>
    )
}



export default GameboardPage;
