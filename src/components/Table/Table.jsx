import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button'
import {Card, CardContent, Typography, Tooltip} from '@mui/material';
import InfoModal from '../InfoModal/InfoModal.jsx';

function Table() {


    // const [shuffledCards, setShuffledCards] = useState([])
    const [deck, setDeck] = useState([])
    const [dealerHand, setDealerHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [playerStatus, setPlayerStatus] = useState(false)
    const [revealDealer, setRevealDealer] = useState(false);
    const [gameStatus, setGameStatus] = useState(false)
    const [winner, setWinner] = useState('');
    const [cardCount, setCardCount] = useState(0);
    const [playerMoney, setPlayerMoney] = useState(500);
    const [totalBet, setTotalBet] = useState(10);
    const [toggleInfo, setToggleInfo] = useState(false);
        // TODO: Here will be the shuffle dispatch
    // Shuffle itself will happen on the back end, yes?

    // Instead of building a shuffle deck, just draw random cards from the deck, which is the same thing.

    // First build the shuffle here.
    // Deal out two cards to both dealer and player
    // If dealer has 21, game over.



    const createDeck = () => {
        if (gameStatus) {
            Swal.fire('You already have a game in progress')
            return;
        }
        let tempDeck = [];
        let i = 0;
        while (i < 2) {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        const cards = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2]
        console.log('clicked')
        for (let card in cards) {
            for (let suit in suits) {
                tempDeck.push({suit: suits[suit], value: cards[card]})                
            }
        }
        i++;
    }
        setCardCount(0);
        console.log('Deck is', tempDeck)
        setDeck(tempDeck);
    }

    const dealRandomCards = () => {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const dealtCard = deck[randomIndex];
    
        setDeck((prevDeck) => prevDeck.filter((card) => card !== dealtCard));
    
        if (typeof dealtCard.value != 'string' && dealtCard.value < 10) {
                 setCardCount(prevCount => prevCount + 1)
            } else {
                setCardCount(prevCount => prevCount -1)
            }
        return dealtCard;
    };
    
    const dealCards = async () => {
        if (deck.length != 0 && gameStatus) {
            Swal.fire('You already have a game in progress');
            return;
        }
        else if (deck.length == 0) {
            Swal.fire({
                title: "You haven't shuffled the shoe!",
                text: "You need to click the button that says shuffle the shoe.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm lazy, shuffle it for me."
              }).then((result) => {
                if (result.isConfirmed) {
                  createDeck();
                  Swal.fire({
                    title: "Shuffled!",
                    text: "Now try dealing those cards again.",
                    icon: "success"
                  });
                }
              });
        } else {
            setGameStatus(true);
            newGame();
        for (let i = 0; i < 2; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setPlayerHand(prevHand => [...prevHand, dealRandomCards()]);
                    setDealerHand(prevHand => [...prevHand, dealRandomCards()]);
                    resolve();
                }, 800);
            });
        }}
    };

    // This is what happens when a new game is initiated after an existing game is completed.
    const newGame = () => {
        setGameStatus(false);
        setPlayerStatus(true);
        setRevealDealer(false);
        setWinner('');
        setPlayerHand([])
        setDealerHand([])
        setPlayerMoney(playerMoney - 10)
        setTotalBet(20)
    }

    const doubleDown = () => {
        setPlayerMoney(playerMoney - 10)
        setTotalBet(totalBet + 10)
        hitCard();
        playerStay();
    } 

    // Add a new card to your hand.
    const hitCard = () => {
        if (!revealDealer) {
        setPlayerHand(prevHand => [...prevHand, dealRandomCards()])
        } else {
            Swal.fire('This hand is over!')
        }
    }

    const playerStay = () => {
        // trigger dealer actions to hit or stay and determine winner
        // Separate dealer and player totals into their own states?
        // Move to next player?
        if (!revealDealer) {
        console.log('reveal dealer')
        setRevealDealer(true);
        if (calculateValue(dealerHand) < 17) {
            // If so, keep drawing cards until the hand value is 17 or higher
            setTimeout(() => {
                let updatedDealerHand = [...dealerHand];
                while (calculateValue(updatedDealerHand) < 17) {
                    updatedDealerHand.push(dealRandomCards());
                    setDealerHand(updatedDealerHand);
                }
            }, 500); // Adjust delay as needed
            
        }
        setTimeout(() => {
            console.log('calculating winner')
            calculateWinner()}, 1500);
        }
        else {
            Swal.fire('This hand is over!')
        }
    }

    // Displays the winner at the end of each hand
        const calculateWinner = () => {
            const playerTotal = calculateValue(playerHand);
            const dealerTotal = calculateValue(dealerHand);
        
            if (playerTotal > 21) {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                 setWinner('Dealer wins! Player busts.');
            } else if (dealerTotal > 21) {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setPlayerMoney(playerMoney + totalBet);
                setWinner('Player wins! Dealer busts.');
            } else if (playerTotal === dealerTotal) {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setWinner("It's a push. No winner."); 
            } else if (playerTotal > dealerTotal) {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setPlayerMoney(playerMoney + totalBet);
                setWinner(`Player wins!`); 
            } else {
                console.log('player total', playerTotal)
                console.log('dealer total', dealerTotal)
                setWinner('Dealer wins!');
            }
        }
       
        

    const calculateValue = (hand) => {
        let total = 0;
        let ace = 0;
        for (let card of hand) {
            if (card.value === 'A') {
                ace += 1}
            if (typeof card.value != 'string') {
                total += card.value
            }
            else {
                if (ace === 1) {
                    total += 11
                    ace += 1
                }
                else {
                    total += 10;
                }}}
            if (total > 21 && ace > 0) {
                console.log('Ace check', total)
                total -= 10;
            }
        return total;
    }

    const updatePlayerStatus = () => {
        if (calculateValue(playerHand) > 21) {
            setPlayerStatus(!playerStatus)
        }
    }

// Provides the proper symbol for each suit
    const cardSuit = (suit) => {
        switch (suit) {
            case 'Hearts' :
                return String.fromCharCode(9829);
            case 'Diamonds' :
                return String.fromCharCode(9830);
            case 'Spades' :
                return String.fromCharCode(9824);
            case 'Clubs' :
                return String.fromCharCode(9827);
        }
    }

    useEffect(() => {
        const dealerTotal = calculateValue(dealerHand);
        if (revealDealer && dealerHand.length > 0) {
            setTimeout(() => calculateWinner(), 1500);
        } else if (dealerTotal === 21) {
            setTimeout(() => playerStay(), 1500);
            setWinner('Blackjack! Dealer wins!')
        }
    }, [dealerHand, revealDealer]);

    useEffect(() => {
        if (gameStatus && deck.length < 10) {
            createDeck();
        }
    }, [deck])


    useEffect(() => {
        updatePlayerStatus()
    },[playerHand, dealerHand])

  return(
    <div>
      <h2>This is the Table!</h2>
      <h3>{winner}</h3>
      <Tooltip title={`There are ${deck.length} cards in the Shoe`}>
        <Button className="gameButton" variant="contained" onClick={() => createDeck()}>
            Shuffle the Shoe
        </Button>
      </Tooltip>
      <Button className="gameButton" variant="contained" onClick={() => dealCards()}>
        Deal Cards
      </Button>
      <Button className="gameButton" variant="contained" onClick={() => setToggleInfo(!toggleInfo)}>
        Info
      </Button>
      
      <div>
        <p><h4>Dealer Hand:</h4> <br></br> <div className="dealerHand">{dealerHand.length > 0 && revealDealer ? dealerHand.map((card, i) => (
                        <div key={i}>
                        <Card sx={{width: 100, height: 150, margin: 2}} className={card.suit == "Hearts" || card.suit == "Diamonds" ? 'redCard' : 'blackCard'}>
                            <CardContent>
                                <Typography variant="h3" color={card.suit == "Hearts" || card.suit == "Diamonds" ? "red" : 'black'}>
                                    {card.value}{cardSuit(card.suit)}
                                </Typography>
                            </CardContent>
                        </Card>
                        </div>
                    ))  : dealerHand.length > 0 ? 
                                <Card sx={{width: 100, height: 150, margin: 2}} className={dealerHand[0].suit == 'Hearts' || dealerHand[0].suit == 'Diamonds' ? 'redCard' : 'blackCard'}>
                                    <CardContent>
                                        <Typography variant="h3" color={dealerHand[0].suit == 'Hearts' || dealerHand[0].suit == 'Diamonds' ? 'red' : 'black'}>
                                            {dealerHand[0].value}{cardSuit(dealerHand[0].suit)}
                                        </Typography>
                                    </CardContent>
                                </Card> : ''}
                                
                                </div>
                                {revealDealer ? <h4>Dealer Total: {calculateValue(dealerHand)}</h4> : ''}</p>

        <p><h4>Player Hand:</h4>
            <div className="playerHand">{playerHand.length > 0 ? playerHand.map((card) => {
            return (
                <Card sx={{width: 100, height: 150, margin: 2}} className={card.suit == "Hearts" || card.suit == "Diamonds" ? 'redCard' : 'blackCard'}>
                    <CardContent sx={{justifyContent: 'center'}}>
                        <Typography variant="h3" color={card.suit == "Hearts" || card.suit == "Diamonds" ? "red" : 'black'}>
                            {card.value}{cardSuit(card.suit)} 
                        </Typography>
                    </CardContent>
                </Card>)}) : ''}
                </div>
                <h4>Total: {calculateValue(playerHand)}</h4>
                {calculateValue(playerHand) > 21 ? <h4>BUST!</h4> : ''}
                {playerStatus ? <>
                    <Button className="gameButton" variant="contained" onClick={() => hitCard()}>Hit</Button>
                    <Button className="gameButton" variant="contained" onClick={() => playerStay()}>Stand</Button>
                    {playerHand.length > 1 && (calculateValue(playerHand) == 9 || calculateValue(playerHand) == 10 || calculateValue(playerHand) == 11) ? 
                    <Button className="gameButton" variant="contained" onClick={() => doubleDown()}>Double Down</Button> : ''}
                </> : ''
                }
        </p>
        <h3>Available money: {playerMoney}</h3>
        {/* <h3>Current Card Count: {cardCount}</h3> */}
        </div>
        {toggleInfo && <InfoModal closeModal={() => {setToggleInfo(!toggleInfo)}}/>}
      
    </div>
  )
}

export default Table;
