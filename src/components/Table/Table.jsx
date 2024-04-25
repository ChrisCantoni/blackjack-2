import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button'
import {Card, CardContent, Typography } from '@mui/material';

import WinnerBanner from '../WinnerBanner/WinnerBanner.jsx'
import Header from '../Header/Header.jsx';

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
    
    const [toggleWinner, setToggleWinner] = useState(false);
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
        setToggleWinner(false);
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
        //setGameStatus(false);
        setToggleWinner(false);
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
        setTotalBet(totalBet + 20)
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
        setGameStatus(false);
        setTimeout(() => {
            console.log('calculating winner')
            calculateWinner();
            setToggleWinner(!toggleWinner)}, 1500);
        }
        else {
            Swal.fire('This hand is over!')
        }
    }

    // Displays the winner at the end of each hand
        const calculateWinner = () => {
            const playerTotal = calculateValue(playerHand);
            const dealerTotal = calculateValue(dealerHand);
            console.log('Dealer total', dealerTotal)
            console.log('Player total', playerTotal)
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
            }}
        
       
        

    const calculateValue = (hand) => {
        let total = 0;
        let ace = 0;
        for (let card of hand) {
            if (typeof card.value != 'string') {
                total += card.value
                } else {
                    total += 10;
                    if (card.value === 'A') {
                        total += 1;
                        ace += 1;
                    }}
                while (total > 21 && ace > 0) {
                console.log('Ace check', total)
                total -= 10;
                ace -= 1;}
            }
        return total;
        }

    const updatePlayerStatus = () => {
        if (calculateValue(playerHand) > 21) {
            setWinner('Bust!')
            setGameStatus(false);
            setPlayerStatus(!playerStatus);
            setToggleWinner(!toggleWinner);
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

    // TODO: Have a end of game function to check everything

    useEffect(() => {
        updatePlayerStatus()
    },[playerHand, dealerHand])

  return(
    <div>
    <Header createDeck={createDeck} dealCards={dealCards} deck={deck} />
    <div className="table">
      
      
      
      <div className="playingArea">
        <h4>Dealer Hand:</h4> <div className="dealerHand">{dealerHand.length > 0 && revealDealer ? dealerHand.map((card, i) => (
                        <div className="cardDisplay" key={i}>
                        <Card sx={{ width: 100, height: 150, margin: 2}} className={card.suit == "Hearts" || card.suit == "Diamonds" ? 'redCard' : 'blackCard'}>
                            <CardContent>
                                <Typography variant="h3" color={card.suit == "Hearts" || card.suit == "Diamonds" ? "red" : 'black'}>
                                    {card.value}{cardSuit(card.suit)}
                                </Typography>
                            </CardContent>
                        </Card>
                        </div>
                    ))  : dealerHand.length > 0 ?
                                <><div className="cardDisplay"> 
                                <Card sx={{width: 100, height: 150, margin: 2}} className={dealerHand[0].suit == 'Hearts' || dealerHand[0].suit == 'Diamonds' ? 'redCard' : 'blackCard'}>
                                    <CardContent>
                                        <Typography variant="h3" color={dealerHand[0].suit == 'Hearts' || dealerHand[0].suit == 'Diamonds' ? 'red' : 'black'}>
                                            {dealerHand[0].value}{cardSuit(dealerHand[0].suit)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                </div>
                                <div className="cardDisplay">
                                <Card className="dealerHidden" sx={{width: 100, height: 150, margin: 2}}>
                                    <CardContent>
                                        <Typography variant="h3">
                                        </Typography>
                                    </CardContent>
                                </Card>
                                </div>
                                </>
                                 : ''}
                                
                                </div>
                                {revealDealer ? <h4>Dealer Total: {calculateValue(dealerHand)}</h4> : ''}

        <h4>Player Hand:</h4>
            <div className="playerHand">{playerHand.length > 0 ? playerHand.map((card, i) => {
            return (
                <div className="cardDisplay">
                    <Card key={i} sx={{width: 100, height: 150, margin: 2}} className={card.suit == "Hearts" || card.suit == "Diamonds" ? 'redCard' : 'blackCard'}>
                        <CardContent sx={{justifyContent: 'center'}}>
                            <Typography variant="h3" color={card.suit == "Hearts" || card.suit == "Diamonds" ? "red" : 'black'}>
                                {card.value}{cardSuit(card.suit)} 
                            </Typography>
                        </CardContent>
                    </Card> 
                </div>)}) : ''}
                </div>
                <h4>Total: {calculateValue(playerHand)}</h4>
                
                {playerStatus ? <>
                    <Button className="gameButton" variant="contained" onClick={() => hitCard()}>Hit</Button>
                    <Button className="gameButton" variant="contained" onClick={() => playerStay()}>Stand</Button>
                    {playerHand.length === 2 && (calculateValue(playerHand) == 9 || calculateValue(playerHand) == 10 || calculateValue(playerHand) == 11) ? 
                    <Button className="gameButton" variant="contained" onClick={() => doubleDown()}>Double Down</Button> : ''}
                </> : ''
                }
        
        <h3>Available money: {playerMoney}</h3>
        {/* <h3>Current Card Count: {cardCount}</h3> */}
        </div>
        
        {toggleWinner && <WinnerBanner dealCards={() => dealCards()} winner={winner} closeModal={() => {setToggleWinner(!toggleWinner)}}/>}
      
    </div>
    </div>
  )
}

export default Table;
