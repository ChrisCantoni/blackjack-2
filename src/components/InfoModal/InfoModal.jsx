import AccordionList from '../Accordion/Accordion'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

function InfoModal({closeModal}) {

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === 'modal-container') closeModal();
        }}>
            <div className="modal">
                <h3>How to Play</h3>
                <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          The Shoe
        </AccordionSummary>
        <AccordionDetails>
                To start, there are no cards. To create the decks for playing, click <em>Shuffle the Shoe</em>. 
                The Shoe contains two full decks, so it's possible you will encounter the same card. 
                This isn't a bug, it's part of the fun! At any time you can hover over the Shuffle button to see how many cards are left in the Shoe.
                But if the Shoe gets too low it will automatically reshuffle.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          The Score
        </AccordionSummary>
        <AccordionDetails>
        If you're unfamiliar with Blackjack, it's very simple. You receive cards trying to get as
            close to 21 as possible without going over. Each card is worth its number except for face cards: K, Q, J which are all worth 10.
            Aces can be worth 11 or 1. So getting an ace and a 7 would be worth 18, but if you put a five with it, the Ace becomes
            a 1 and you end up with 13. 
            You receive 2 cards to start and from there you can either receive another card, <strong>hit</strong>, or stop with the hand you have, stay.
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          The Deal
        </AccordionSummary>
        <AccordionDetails>
        Only one of the dealer's cards is revealed to start, however the dealer will immediately let you know if they have Blackjack and you will simply lose
            that hand, unless you have Blackjack yourself, in which case you will receive your bet back.
            Once you decide to stay, the dealer will reveal their hand and hit until they reach 17 or higher. Whoever is closest to 21 without going over wins.
        </AccordionDetails>
      </Accordion>
    </div>
            </div>
        </div>
    )
}

export default InfoModal;