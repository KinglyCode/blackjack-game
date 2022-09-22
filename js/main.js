/*----- constants -----*/
let suits = ['h', 's', 'd', 'c']
//let suits = ['hearts', 'spades', 'diamonds', 'clubs']
let values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']
//let values = ['A', 'r02', 'r03', 'r04', 'r05', 'r06', 'r07', 'r08', 'r09', 'r10', 'J', 'Q', 'K']
///let dealerFaceCards = document.getElementsByClassName('dealer-cards')

  /*----- state variables -----*/

let winner
let dealerSum = 0
let playerSum = 0
let dCard = []
let pCard =[]
let cardDeck = []


  /*----- cached elements  -----*/

const mDisplayEl = document.getElementById('message-box')
const startButtonEl = document.getElementById('start-btn')
const hitButtonEl = document.getElementById('hit-btn')
const stayButtonEl = document.getElementById('stay-btn')

const playerBoardEl = document.getElementById('player-cards')
const dealerBoardEl = document.getElementById('dealers-cards')

  /*----- event listeners -----*/

startButtonEl.addEventListener('click', handlePlayClick)
hitButtonEl.addEventListener('click', handleHitClick)
stayButtonEl.addEventListener('click', handleStayClick)


  /*----- functions -----*/

  function init() {
    winner = null
    buildDeck()
  }

  function buildDeck() {
    for(i = 0; i < suits.length; i++){
      for(k = 0; k < values.length; k++){
        const cardObj = {
          face: suits[i] + values[k],
          value: Number(values[k]) || (values[k] === 'A' ? 11 : 10)
        }
        cardDeck.push(cardObj)
      }
    }
  
  }

  function shuffleDeck() {
    for(let i = 0; i < cardDeck.length; i++){
      let shuffleIdx = Math.floor(Math.random() * cardDeck.length)
      let deckChange = cardDeck[shuffleIdx]
      cardDeck[shuffleIdx] = cardDeck[i]
      cardDeck[i] = deckChange
    }

  }


  function gameStart() {
    pCard = []
    dCard = []
    shuffleDeck()
    //playerBoard()
    dealNew()
    render()
  }

  function dealNew(){
    for(h = 0; h < 2; h++){
      dCard.push(cardDeck.pop())
      pCard.push(cardDeck.pop())
    }
  }

  function render() {
    //Loop through player and dealer hands
    //For each card in the hand, create a div and apply the class
    //Append it to the DOM

    playerBoardEl.forEach(cardDeck)

  }
  
  function calculateCards () {
    //For each card in the dealers and players hand, add the sum.
  }

  function checkWin() {
    //If player equal to 21, they win
    //Else if the player has less 17 and dealer has more than 17, dealer wins, update
    //DOM with Dealer Wins
    //Else if the dealer has less than 17 and player has more than 17, player wins
    //update DOM to display Player Wins
    //otherwise, 

    if(playerSum === 21){
        mDisplayEl.innerHTML = 'You Win!' 
      }else if(playerSum > 21){
        mDisplayEl.innerHTML = 'Player Busts!'
      }else if(dealerSum > 21){
        mDisplayEl.innerHTML = 'Dealer Busts'
      }else if(playerSum < 17 && dealerSum > playerSum){
        mDisplayEl.innerHTML = 'Dealer Wins!'
      }else if(dealerSum < 17 && playerSum > dealerSum){
        mDisplayEl.innerHTML = 'Player Wins!'
      }else{
        mDisplayEl.innerHTML = 'Push!'
      }
    }
  
  
    

  function handlePlayClick() {
    gameStart()
    console.log(handlePlayClick)

  }

  function handleHitClick() {
    render()
    calculateCards()
    console.log(handleHitClick)

  }

  function handleStayClick() {
    checkWin()
    calculateCards()
    console.log(handleStayClick)

  }

  init()