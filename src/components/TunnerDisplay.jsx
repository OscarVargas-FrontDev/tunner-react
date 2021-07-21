import React from 'react';
import ButtonMic from './ButtonMic';

function TunnerDisplay({turn, onTurnChange}) {

    console.log(onTurnChange);

    const handleClick = (e) =>{

        e.preventDefault();
        onTurnChange();
    }

    return (
        <ButtonMic turn ={turn} onClick={handleClick}/>
    )
}

export default TunnerDisplay;
