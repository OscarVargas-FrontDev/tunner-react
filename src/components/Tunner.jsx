import React, { useState, useEffect } from 'react'
import {Container} from '@material-ui/core'
import IndicatorNote from './IndicationNoteAndFreq/IndicatorNote';
import TunnerDisplay from './TunnerDisplay';

function Tunner() {

    const [turn, setTurn] = useState("off");

    const handleTurnChange = () =>{

        console.log("Flujo de Estado");
        if(turn === "on")
            setTurn("off");
        if(turn === "off")
            setTurn("on");
    };

    useEffect(() => {
        
        turn === "on"? alert("on") : alert("off");

    },[turn]);

    return (
        <Container maxWidth="sm">
            <TunnerDisplay turn={turn} onTurnChange={handleTurnChange}/>
            <IndicatorNote/>
        </Container>
    );
};

export default Tunner;
