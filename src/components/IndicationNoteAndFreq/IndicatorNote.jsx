import React, { useState, useEffect } from 'react';
import {Grid, Box} from '@material-ui/core';
import CentLedLeft from './CentLedLeft';
import CentLedRight from './CentLedRight';

function IndicatorNote() {

    /* const [simulation, setSimulation] = useState(Math.floor(Math.random()*(30)-15));

    let simulationNumber = setInterval(() => {
        setSimulation(Math.floor(Math.random()*(30)-15));
    }, 3000); */
    

    /* useEffect(() => {
        console.log(simulation);
    }, [simulation]) */


    return (
        <Grid container justify-content="center" align-items="center" spacing={3}>
            <Grid item xs={3}>
                <CentLedLeft  cent={15/* simulation */}/>
            </Grid>
            <Grid item xs={6}>
                <Box><h1>A</h1></Box>
                <Box component="small">440 hz</Box>
            </Grid>
            <Grid item xs={3}>
                <CentLedRight cent={15/* simulation */}/>
            </Grid>
        </Grid> 
    );
};

export default IndicatorNote;
