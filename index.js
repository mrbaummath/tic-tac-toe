//tic-tac-toe script - MB

//set gameOver to false since game has just started
let gameOver = false

//reset lastPlay at start of play
let lastPlay = null

//Declare abstraction for grid. Each tuple will represent a row of the grid. Values are 0 for 'x', 1 for '0' and 'e' for empty
let board = [['e','e','e'],['e','e','e'],['e','e','e']]


//function to draw grid
const makeGrid = () => {
    //select the three rows in DOM
   const rows = document.querySelectorAll('.row')
   //crate an array of valid css style names to be assigned to rows
   const rowTypes = ['box box-top', 'box', 'box box-bottom']
   //generate box across each row, assigning the correct set of styles
   for (let i = 0; i < rows.length; i ++) {
    //create a left, middle, and right box and add to an array for iteration later
    let boxes = []
    //create left box and add correct column class
    let leftBox = document.createElement('div')
    boxes.push(leftBox)
    //create middle box. No need to add a class because the box class will be added later
    let middleBox = document.createElement('div')
    boxes.push(middleBox)
    //create right box and add correct column class
    let rightBox = document.createElement('div')
    boxes.push(rightBox)
    //add correct row class to these three boxes and append to current row node
    for (let box of boxes) {
        box.className = rowTypes[i]
        rows[i].appendChild(box)
    }
    //add classes to the boxes and add a column and row number to their data set which will help create an abstraction of the board inthe script
    leftBox.classList.add('box-left')
    leftBox.dataset.col = 0
    leftBox.dataset.row = i
    middleBox.dataset.col = 1
    middleBox.dataset.row = i
    rightBox.classList.add('box-right')
    rightBox.dataset.col = 2
    rightBox.dataset.row = i
   }

}

//function to check for win condition or tie. Parameter is the last move. If there is a winner, it should be the last player
const checkWinTie = (row, col) => {

    //for ease of checking the column of the last play, create an array which has the board's current state at the column of the last play. This is sort of a transpose and slice operation
    const colArray = []
    for (let r of board) {
        colArray.push(r[col])
    }
    //because we assign 0 to x plays, 1 to o plays, and 'e' to empty we can check for a win by checking the sum (===) across the row, down the col, and along the diagnoal of the current play
    //a sum of 0 means an x win, a sum of 3 means an 'o' win. For now we'll handle the row and column check. I'll leave the diagonal check separately
    //find sum acroos the row
    let rowSum = null

    for (let num of board[row]) {
        rowSum += num
    }
    //find sum down column
    let colSum = null
    for (let num of colArray) {
        colSum += num
    }
    //see if 'x' or 'o' wins across a row or down a column. If so return true
    if (colSum === 0 || rowSum === 0 || colSum === 3 || rowSum === 3) {
        //figure out who won. If colSum or row Sum was 0, x won. Otherwise, 'o' won because one of the winning conditions was met if we're in here
        let winner = (colSum===0 || rowSum ===0) ? 'x' : 'o'
        gameOver = true
        winMessage(winner)
        return true
    }
    //if we pass the row and column win condition, check for a diagonal win. A diagonal win can only occur on a play where row = col or where the row index + col index is 2
    let diagSum = null
    if (row===col) {
        diagSum = board[0][0] +board[1][1] + board[2][2]
    }
    if (row + col === 2) {
        diagSum = board[0][2] + board[1][1] + board[2][0]
    }
    if (diagSum === 0 || diagSum === 3) {
        let winner = (diagSum===0? 'x' : '0')
        gameOver = true
        winMessage(winner)
        return true
    }
    //if we pass all win conditions without a return but the board is full, a draw has been played
    if (!board.flat().includes('e')) {
        gameOver = true
        winMessage('none')
        return true
    }
    //if win and tie conditions are not met, game can continue. While maybe not needed, I will return false in case we end up needing to quickly check for an end later
    return false
}

const winMessage = (winner) => {
    const winMessage = document.querySelector('#winMessage')
    if (winner === 'none') {
        winMessage.innerHTML = 'Cat\'s game!'
    } else {
        winMessage.innerHTML = `Game over! ${winner.toUpperCase()} wins!`
    }
}

const addImages = () => {
    //grab all the box divs
    const boxes = document.querySelectorAll('.box')
     //assign paths to images to variables
     const xImageSrc = './images/tic-tac-x.png'
     const oImageSrc = './images/tic-tac-o.png'
    //create and append image nodes to each box
    for (let box of boxes) {
        //create image nodes for x and o
        const xImage = document.createElement('img')
        const oImage = document.createElement('img')
        //set src for images
        xImage.src = xImageSrc
        oImage.src = oImageSrc
        //set class for each
        xImage.classList.add('xImage', 'hidden')
        oImage.classList.add('oImage', 'hidden')
        //append
        box.appendChild(xImage)
        box.appendChild(oImage)
    }
 
} 

//function to make a user's play and record the move on the board abstraction
const toggleBox = (event) => {
    let xImg = event.target.querySelector('.xImage')
    let oImg = event.target.querySelector('.oImage')
    //Grab the row and col numbers from the target dataset to update the board later
    let row = parseInt(event.target.dataset.row)
    let col = parseInt(event.target.dataset.col)
    //check that game is still open
    if (!gameOver) {
        //check that square is empty
        if (xImg.classList.contains('hidden') && oImg.classList.contains('hidden')) {
            //change to 'x' if last play was 'o' or if no play has been made
            if (!lastPlay || lastPlay === 'o') {
                //show x
                xImg.classList.toggle('hidden')
                //record last play
                lastPlay = 'x'

                //assign correct value to the board
                board[row][col] = 0
                //call to check for win/tie. Pass last play to identify possible winner
                checkWinTie(row, col)
            } else if (lastPlay === 'x') {
                //show o
                oImg.classList.toggle('hidden')
                //record last play
                lastPlay = 'o'
                //update board
                board[row][col] = 1
                //check for win/tie. Pass last play to identify possible winner
                checkWinTie(row, col)

            }
        }
    //if game is over, alert players and encourage new play
    } else {
        alert("Game is over! Click the new game button to start over")
    }
    //call to current play to change player
    currentPlay(lastPlay)
}

const currentPlay = (lastPlay) => {
    const currentPlay = document.querySelector('#currentPlay')
    if (gameOver) {
        currentPlay.innerText = '---'
    } else if (lastPlay==='o' || lastPlay === null) {
        currentPlay.innerText = 'Current player: X'
    } else {
        currentPlay.innerText = 'Current player: O'
    }
}

const newGame = () => {
    //hide all plays made
    const xImgs = document.querySelectorAll('.xImage')
    const oImgs = document.querySelectorAll('.oImage')
    for (img of xImgs) {
        if (!img.classList.contains('hidden')) {
            img.classList.toggle('hidden')
        }
    }
    for (img of oImgs) {
        if (!img.classList.contains('hidden')) {
            img.classList.toggle('hidden')
        }
    }
    //set board abstraction back to empty
    board = [['e','e','e'],['e','e','e'],['e','e','e']]
    //set last play to null
    lastPlay = null
    //set gameOver to false
    gameOver = false
    //restmessage
    const messageNode = document.querySelector('#winMessage').innerText=''


}

const addListeners = () => {
    const boxes = document.querySelectorAll('.box')
    for (box of boxes) {
        box.addEventListener('click',toggleBox)
    }
    const newGameBtn = document.querySelector('#newGame')
    newGameBtn.addEventListener('click', newGame)
}




document.addEventListener('DOMContentLoaded', () => {
    makeGrid()
    addImages()
    addListeners()
})