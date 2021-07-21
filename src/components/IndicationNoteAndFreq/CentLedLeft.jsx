import React from 'react';
import {ArrowRight, FastForward} from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core';

let useStyle = makeStyles({
    root: {
        fontSize: 80,
        color: red[500]
    }
})

function CentLedLeft({cent}) {
    
    let classes = useStyle();

    const Led = (cent) =>{

        if(cent <= -10){
            return <FastForward
            className={classes.root}
            />
        }

        if(cent >-10 && cent < -5){
            return <ArrowRight
            className={classes.root}
            />
        }
        if(cent >= -5 && cent < 5){
            return <ArrowRight
            className={classes.root}
                style={{ color: green[500] }}
            />
        }
    }

    return (
        <div>
            {Led(cent)} 
        </div>
    );
};

export default CentLedLeft;
