
let suits = ['h', 's', 'd', 'c']
let values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']

let winner
let dealerSum = 0
let playerSum = 0
let dCard = []
let pCard = []
let cardDeck = []
let playerStay = false

const mDisplayEl = document.getElementById('message-box')
const startButtonEl = document.getElementById('start-btn')
const hitButtonEl = document.getElementById('hit-btn')
const stayButtonEl = document.getElementById('stay-btn')

const playerSumDisplay = document.getElementById('p-sum')
const playerBoardEl = document.getElementById('player-cards')
const dealerBoardEl = document.getElementById('dealers-cards')

startButtonEl.addEventListener('click', handlePlayClick)
hitButtonEl.addEventListener('click', handleHitClick)
stayButtonEl.addEventListener('click', handleStayClick)

  function init() {
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
    dealNew()
    render()
  }

  function calculateHitCard() {
    render(pCard)
  
  }

  function dealNew(){
    for(h = 0; h < 2; h++){
      dCard.push(cardDeck.pop())
      pCard.push(cardDeck.pop())
    }
  }

  function render() {
    dealerBoardEl.innerHTML = ""
    playerBoardEl.innerHTML = ""

    dCard.forEach(card => {
      let dealerCardEl = document.createElement('div')
      dealerCardEl.classList.add(`${card.face}`, `card`)
      dealerBoardEl.appendChild(dealerCardEl)
    })

    pCard.forEach(card => {
      let playerCardEl = document.createElement('div')
      playerCardEl.classList.add(`${card.face}`, `card`)
      playerBoardEl.appendChild(playerCardEl)
    })

  }
  
  function calculateCards (hand) {
    let total = 0
    hand.forEach(card => {
      total += card.value 
    })
    return total
  }

  function checkWin() {
    if(playerSum > 21){
      mDisplayEl.innerHTML = 'Player Busts!'
    }else if(playerSum === 21){
      mDisplayEl.innerHTML = 'BlackJack!'
    }else if(playerStay && dealerSum > 21){
        mDisplayEl.innerHTML = 'Dealer Busts'
      }else if(playerStay && dealerSum > playerSum){
        mDisplayEl.innerHTML = 'Dealer Wins!'
      }else if(playerStay && dealerSum < playerSum){
        mDisplayEl.innerHTML = 'Player Wins!'
      }else if (playerStay && dealerSum === playerSum){
        mDisplayEl.innerHTML = 'Push!'
      }
  }
    
  function calculateDealerHand() {
    while(dealerSum < 17){
      dCard.push(cardDeck.pop())
      dealerSum = calculateCards(dCard)
    }
  }
    
  function handlePlayClick() {
    gameStart()
    playerSum = calculateCards(pCard)
  }

  function handleHitClick() {
    pCard.push(cardDeck.pop())
    playerSum = calculateCards(pCard)
    calculateHitCard(pCard)
  }

  function handleStayClick() {
    playerStay = true
    calculateDealerHand()
    render()
    checkWin()
  }

  init()