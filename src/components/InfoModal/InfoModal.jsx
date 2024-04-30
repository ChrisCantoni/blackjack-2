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
                <Typography variant="h3" sx={{marginBottom: 4}}>How to Play</Typography>
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
            <Typography>
            <p>To start, there are no cards. There's not even a deck! Blackjack traditionally uses several decks of cards stored in a "shoe" (not an actual shoe). 
            This Shoe contains two full decks, so it's possible you will encounter the same card. This isn't a bug, it's part of the fun!</p> 
            <p>At any time you can hover over the Shuffle button to see how many cards are left in the Shoe. 
            This way, you can practice your card counting without worrying about an angry pit boss throwing you out. Have at it!</p>
            
            <p>If the Shoe gets too low (less than 10 cards) it will automatically reshuffle.</p>
            </Typography>
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
            <Typography>
            <p>Every time you click Hit, you'll get another card. If you hit Stay, your job is over and its the dealer's turn. 
            Unless you click Hit too many times. Then your game will be over because you busted!</p>
            </Typography>
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
            <Typography>
                <p>
                Scoring in Blackjack is simple. You want the value of your cards as close to 21 as possible without going over. 
                Each card is worth its stated value. Face cards like K, Q, J are all worth 10. Therefore, 10 is the most common card value 
                (this is useful for card counting)</p>

                <p>Aces can be worth 11 or 1. So getting an ace and a 7 would be worth 18, but if you put a five with it (which would add up to 23), 
                    you would bust, so the Ace magically becomes a 1 and you end up with 13.</p> 


                <p>You receive 2 cards to start and from there you can either receive another card, <strong>hit</strong>, or stop with the hand you have, stay.</p>
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
          <Typography className='infoTitle' variant="h4" sx={{color: 'white'}}>The Dealer</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderBottom: 'solid gold', borderBottomWidth: '4px'}}>
            <Typography>
            <p>
            Only one of the dealer's cards is revealed to start. Once you are happy with your cards and click <strong>Stay</strong>, 
            the dealer's full hand will be revealed and they will hit until they reach 17 or higher.</p> 

            <p>The dealer will immediately let you know if they have <strong>Blackjack</strong> and you will simply lose that hand, 
            unless you have Blackjack yourself, in which case you will receive your bet back.
            </p>
            </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className='accordion' sx={{boxShadow: 'none'}}>
        <AccordionSummary
            sx={{ backgroundColor: 'darkgreen', border: '5px solid gold', 
            borderBottom:`${expanded === 'panel5' ? "none" : "5px solid gold"}`, borderRadius: '25px'  }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography className='infoTitle' variant="h4" sx={{color: 'white'}}>The Blackjack</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderBottom: 'solid gold', borderBottomWidth: '4px'}}>
            <Typography>
            <p>An Ace and a face card (or 10) makes <strong>21</strong>. If you are dealt that hand to start, you win a <strong>Blackjack!</strong></p>
             <p>You'll receive 1.5x your bet!</p>

            </Typography>
        </AccordionDetails>
      </Accordion>
      </Accordion>
    </div>
            </div>
        </div>
    )
}

export default InfoModal;