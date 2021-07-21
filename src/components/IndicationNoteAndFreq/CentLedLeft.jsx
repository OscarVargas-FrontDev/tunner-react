import React from 'react';
import {ArrowRight, FastForward} from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core'

const useStyle = makeStyles({
    root: {
        fontSize: 80,
        color: green[500]
    }
})

function CentLedLeft({cent}) {
    
    const classes = useStyle();

    const Led = (cent) =>{

        if(cent <= -10){
            return <FastForward className = {classes.root}/>
        }else
            return <ArrowRight className = {classes.root}/>
    }

    return (
        <div>
            {Led(cent)} 
        </div>
    );
};

export default CentLedLeft;
