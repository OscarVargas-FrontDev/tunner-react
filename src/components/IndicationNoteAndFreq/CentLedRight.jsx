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

        if (cent >= 10) {
            return <FastRewind
                className={classes.root}
            />
        }

        if (cent < 10 && cent > 5) {
            return <ArrowLeft
                className={classes.root}
            />
        }
        if (cent <= 5 && cent > -5) {
            return <ArrowLeft
                className={classes.root}
                style={{ color: green[500] }}
            />
        }
    };

    return (
        <div>
            {Led(cent)} 
        </div>

    );
};

export default CentLedRight;
