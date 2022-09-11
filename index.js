//tic-tac-toe script - MB

//set gameOver to false since game has just started
let gameOver = false

//reset lastPlay at start of play
let lastPlay = null

//Declare abstraction for grid. Each tuple will represent a row of the grid. Values are 0 for 'x', 1 for '0' and 'e' for empty
const board = [['e','e','e'],['e','e','e'],['e','e','e']]


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
    for (let row of board) {
        colArray.push(row[col])
    }
    console.log(colArray)
    console.log(board[row])
    //because we assign 0 to x plays, 1 to o plays, and 'e' to empty we can check for a win by checking the sum (===) across the row, down the col, and along the diagnoal of the current play
    //a sum of 0 means an x win, a sum of 3 means an 'o' win. For now we'll handle the row and column check. I'll leave the diagonal check separately
    //find sum acroos the row
    let rowSum = null
    for (let num of board[row]) {
        rowSum += num
    }
    
    console.log(rowSum)
    //find sum down column
    let colSum = null
    for (let num of colArray) {
        colSum += num
    }
    console.log(colSum)
    //see if 'x' or 'o' wins across a row or down a column. If so return true
    if (colSum === 0 || rowSum === 0 || colSum === 3 || rowSum === 3) {
        //figure out who won. If colSum or row Sum was 0, x won. Otherwise, 'o' won because one of the winning conditions was met if we're in here
        let winner = (colSum===0 || rowSum ===0) ? 'x' : 'o'
        alert(`${winner} wins`)
        gameOver = true
        return true
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
    const row = event.target.dataset.row
    const col = event.target.dataset.col
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
                console.log(board)
                //call to check for win/tie. Pass last play to identify possible winner
                checkWinTie(row, col)
            } else if (lastPlay === 'x') {
                //show o
                oImg.classList.toggle('hidden')
                //record last play
                lastPlay = 'o'
                //update board
                board[row][col] = 1
                console.log(board)
                //check for win/tie. Pass last play to identify possible winner
                checkWinTie(row, col)

            }
        }
    }
    

}

const addListeners = () => {
    const boxes = document.querySelectorAll('.box')
    for (box of boxes) {
        box.addEventListener('click',toggleBox)
    }
}




document.addEventListener('DOMContentLoaded', () => {
    makeGrid()
    addImages()
    addListeners()
})