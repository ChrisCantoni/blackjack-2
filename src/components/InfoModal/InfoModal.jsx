import AccordionList from '../Accordion/Accordion'
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

function InfoModal({closeModal}) {

    const [expanded, setExpanded] = useState('')

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    }

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === 'modal-container') closeModal();
        }}>
            <div className="modal">
                <Typography variant="h3" sx={{marginBottom: 2}}>How to Play</Typography>
                <div>
        <Accordion expanded={true} className="accordion" sx={{boxShadow: 'none'}}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="accordion" sx={{boxShadow: 'none'}}>
        <AccordionSummary
            sx={{border: '5px solid gold', borderBottom:`${expanded === 'panel1' ? "none" : "5px solid gold"}`,
            borderRadius: '25px'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        ><Typography className='infoTitle' variant="h4" sx={{color: 'white'}}>The Shoe</Typography>
          
        </AccordionSummary>
        <AccordionDetails sx={{borderBottom: 'solid gold', borderBottomWidth: '4px'}}>
                To start, there are no cards. To create the decks for playing, click <em>Shuffle the Shoe</em>. 
                The Shoe contains two full decks, so it's possible you will encounter the same card. 
                This isn't a bug, it's part of the fun! At any time you can hover over the Shuffle button to see how many cards are left in the Shoe.
                But if the Shoe gets too low it will automatically reshuffle.
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='accordion' sx={{boxShadow: 'none'}}>
        <AccordionSummary
            sx={{ backgroundColor: 'darkgreen', border: '5px solid gold', 
            borderBottom:`${expanded === 'panel2' ? "none" : "5px solid gold"}`, borderRadius: '25px'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        ><Typography className='infoTitle' variant="h4" sx={{color: 'white'}}>The Hit</Typography>
          
        </AccordionSummary>
        <AccordionDetails sx={{borderBottom: 'solid gold', borderBottomWidth: '4px'}}>
                Every time you choose to hit, you get another card.
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='accordion' sx={{boxShadow: 'none'}}>
        <AccordionSummary
            sx={{ backgroundColor: 'darkgreen', border:'5px solid gold', 
            borderBottom:`${expanded === 'panel3' ? "none" : "5px solid gold"}`, borderRadius: '25px'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          className='infoTitle'
        >
          <Typography className='infoTitle' variant="h4" sx={{color: 'white'}}>The Score</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderBottom: 'solid gold', borderBottomWidth: '4px'}}>
            <Typography>If you're unfamiliar with Blackjack, it's very simple. You receive cards trying to get as
            close to 21 as possible without going over. Each card is worth its number except for face cards: K, Q, J which are all worth 10.
            Aces can be worth 11 or 1. So getting an ace and a 7 would be worth 18, but if you put a five with it, the Ace becomes
            a 1 and you end up with 13. 
            You receive 2 cards to start and from there you can either receive another card, <strong>hit</strong>, or stop with the hand you have, stay.
            </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className='accordion' sx={{boxShadow: 'none'}}>
        <AccordionSummary
            sx={{ backgroundColor: 'darkgreen', border: '5px solid gold', 
            borderBottom:`${expanded === 'panel4' ? "none" : "5px solid gold"}`, borderRadius: '25px'  }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography className='infoTitle' variant="h4" sx={{color: 'white'}}>The Deal</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderBottom: 'solid gold', borderBottomWidth: '4px'}}>
        Only one of the dealer's cards is revealed to start, however the dealer will immediately let you know if they have Blackjack and you will simply lose
            that hand, unless you have Blackjack yourself, in which case you will receive your bet back.
            Once you decide to stay, the dealer will reveal their hand and hit until they reach 17 or higher. Whoever is closest to 21 without going over wins.
        </AccordionDetails>
      </Accordion>
      </Accordion>
    </div>
            </div>
        </div>
    )
}

export default InfoModal;