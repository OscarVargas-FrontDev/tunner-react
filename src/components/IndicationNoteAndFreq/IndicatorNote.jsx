import React, { useState, useEffect } from 'react';
import {Grid, Box} from '@material-ui/core';
import CentLedLeft from './CentLedLeft';
import CentLedRight from './CentLedRight';

function IndicatorNote({cent, frequency, note}) {

    return (
        <Grid container justify-content="center" align-items="center" spacing={3}>
            <Grid item xs={3}>
                <CentLedLeft  cent={cent}/>
            </Grid>
            <Grid item xs={6}>
                <Box><h1>{note}</h1></Box>
                <Box component="small">{frequency}<span>HZ</span></Box>
            </Grid>
            <Grid item xs={3}>
                <CentLedRight cent={cent}/>
            </Grid>
        </Grid> 
    );
};

export default IndicatorNote;
