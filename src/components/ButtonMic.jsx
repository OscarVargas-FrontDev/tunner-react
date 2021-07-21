import React, { useState } from 'react';
import {IconButton} from '@material-ui/core';
import {Mic, PowerSettingsNew} from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';


function ButtonMic({turn, onClick}) {

    return (
        <IconButton 
        onClick={onClick} 
        size="medium" 
        aria-label="active mic"
        style={{ color: turn === "on"? green[500] : red[500] }}
        >
            {turn === "on"? <Mic style={{ fontSize: 40 }}/> : <PowerSettingsNew style={{ fontSize: 40 }}/>}
        </IconButton>
    );
};

export default ButtonMic;
