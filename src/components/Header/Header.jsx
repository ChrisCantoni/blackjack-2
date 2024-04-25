import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import InfoModal from '../InfoModal/InfoModal.jsx';

function Header({createDeck, dealCards, deck}) {
    
    const [toggleInfo, setToggleInfo] = useState(false);

    return (
        <header className="App-header">
            <h1>Welcome to Black Jack's</h1>
            <Tooltip title={`There are ${deck.length} cards in the Shoe`}>
                <Button className="gameButton" variant="contained" onClick={() => createDeck()}>
                    Shuffle the Shoe
                </Button>
            </Tooltip>
            <Button className="gameButton" variant="contained" onClick={() => dealCards()}>
                Deal Cards
            </Button>
            <Button className="gameButton" variant="contained" onClick={() => setToggleInfo(!toggleInfo)}>
        How to Play
      </Button>
            {toggleInfo && <InfoModal closeModal={() => {setToggleInfo(!toggleInfo)}}/>}
        </header>
    )
}

export default Header;