import React from 'react';
import {ArrowLeft, FastRewind} from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles({
    root: {
        fontSize: 80,
        color: red[500]
    }
})

function CentLedRight({cent}) {
    
    const classes = useStyle();

    const Led = (cent) =>{

        if(cent >= 10){
            return <FastRewind className = {classes.root}/>
        }else
            return <ArrowLeft className = {classes.root}/>
    };

    return (
        <div>
            {Led(cent)} 
        </div>

    );
};

export default CentLedRight;
