import AccordionItem from '../AccordionItem/AccordionItem';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

function AccordionList() {
    const rules = [
        {
            id: 'Shoe',
            title: 'Shuffling the Shoe',
            description: `To start, there are no cards. To create the decks for playing, click <em>Shuffle the Shoe</em>. 
                    The Shoe contains two full decks, so it's possible you will encounter the same card. 
                    This isn't a bug, it's part of the fun! At any time you can hover over the Shuffle button to see how many cards are left in the Shoe.
                    But if the Shoe gets too low it will automatically reshuffle.`
                },
        {
            id: 'count',
            title: 'Scoring',
            description: `If you're unfamiliar with Blackjack, it's very simple. You receive cards trying to get as
            close to 21 as possible without going over. Each card is worth its number except for face cards: K, Q, J which are all worth 10.
            Aces can be worth 11 or 1. So getting an ace and a 7 would be worth 18, but if you put a five with it, the Ace becomes
            a 1 and you end up with 13. You receive 2 cards to start and from there you can either receive another card, <strong>hit</strong>, or stop with the hand you have, stay.`
        },
        {
            id: 'dealer',
            title: 'Now the Dealer',
            description: `Only one of the dealer's cards is revealed to start, however the dealer will immediately let you know if they have Blackjack and you will simply lose
            that hand, unless you have Blackjack yourself, in which case you will receive your bet back.
            Once you decide to stay, the dealer will reveal their hand and hit until they reach 17 or higher. Whoever is closest to 21 without going over wins.`
        }]

const [open, setOpen] = useState('0');

const handleToggle = (index) => {
    if (open === index) {
        return setOpen('0')
    }
    setOpen(index);
}

//     <p>
//     If you're unfamiliar with Blackjack, it's very simple. You receive cards trying to get as
//     close to 21 as possible without going over. Each card is worth its number except for face cards: K, Q, J which are all worth 10.
//     Aces can be worth 11 or 1. So getting an ace and a 7 would be worth 18, but if you put a five with it, the Ace becomes
//     a 1 and you end up with 13.</p> <p>You receive 2 cards to start and from there you can either receive another card, <strong>hit</strong>, or stop with the hand you have, <strong>stay</strong>.
// </p>

// <p>Only one of the dealer's cards is revealed to start, however the dealer will immediately let you know if they have <strong>Blackjack</strong> and you will simply lose
//     that hand, unless you have Blackjack yourself, in which case you will receive your bet back.
//     Once you decide to stay, the dealer will reveal their hand and hit until they reach <strong>17</strong> or higher. Whoever is closest to 21 without going over wins.
// </p>

// <p>You can also <strong>Double Down</strong>. If your initial cards equal <strong>9, 10, or 11</strong>, you can choose to double your bet and receive one additional card.
//     With any luck your additional card will be a 10 and you'll be in a good position to beat the dealer.
// </p>


    return (
<div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
        // <div className="wrapper">
        //     <div className="accordionList">
        //     {rules.map((rule, i) => (
        //         <li className="accordionListItem" key={rule.title}>
        //             <div className={cn("accordionItem", (open === i) && "opened")} onClick={() => handleToggle(i)}>
        //             <h3 className="title">{rule.title}</h3>
        //             <span className={'icon'} />
        //             </div>
        //             <div className={`${open === i ? 'inner-isopen' : 'inner'}`}>
        //                 <div className={`description  ${open === i ? 'content-isopen' : 'content'}`}>
        //                     <p className='paragraph'>{rule.description}</p>
        //                 </div>
        //             </div>
        //         </li>
        //     ))}
        //     </div>
        // </div>
    )
}

export default AccordionList;