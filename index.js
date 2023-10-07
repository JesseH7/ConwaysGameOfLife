var numRows = 40
var numCols = 94
var elementGrid = []
var play = false
createGrid()
displayGrid()
let nextFrameButton = document.createElement("button")
nextFrameButton.innerText = "Next Frame"
document.body.append(nextFrameButton)
nextFrameButton.addEventListener("click", (ev)=>{
    nextFrame()
})
let startButton = document.createElement("button")
startButton.innerText = "Start"
document.body.append(startButton)
startButton.addEventListener("click", (ev)=>{
    play = true
    start()
})
let stopButton = document.createElement("button")
stopButton.innerText = "Stop"
document.body.append(stopButton)
stopButton.addEventListener("click", (ev)=>{
    play = false
})

function createGrid(){
    for (let i=0; i<numRows; i++){
        elementGrid[i] = []
        for (let j=0; j<numCols; j++){
            let square = document.createElement("div")
            square.classList.add("dead")
            square.addEventListener("click", (ev)=> {
                if (square.classList[0]==="dead"){
                    square.classList.remove("dead")
                    square.classList.add("alive")
                }
                else{
                    square.classList.remove("alive")
                    square.classList.add("dead")
                }
                
            })
            elementGrid[i][j] = square
            
        }
    }
}
function displayGrid(){
    for (let i=0; i<numRows; i++){
        for (let j=0; j<numCols; j++){
            document.body.append(elementGrid[i][j])
        }
    }
}
function start(){
    setInterval(() => {
        nextFrame()
    }, 100);
}
function nextFrame(){
    let temp = elementGrid.map(row => row.map(cell => cell.cloneNode()));
    for (let i = 0; i < this.numRows; i++) {
        for (let j = 0; j < this.numCols; j++) {
            if(temp[i][j].classList[0]==="dead"){
                resurrect(i, j, temp)
            }
            else{
                kill(i, j, temp)
            }

        }
    }
    
}
function kill(row, col, tempGrid){
    let count = 0
    for(let i = row-1; i<= row+1; i++){
        for(let j = col-1; j<= col+1; j++){
            try {
                console.log(i, j)
                if (i===row && j===col){
                    continue
                }
                else if (tempGrid[i][j].classList[0]==="alive"){
                    console.log(tempGrid)
                    count++
                }
            } catch (error) {
                continue
            }
        }
    }
    console.log(count)
    if (!((count===2) || (count===3))){
        elementGrid[row][col].classList.remove("alive")
        elementGrid[row][col].classList.add("dead")
    }
}
function resurrect(row, col, tempGrid){
    let count = 0
    for(let i = row-1; i<= row+1; i++){
        for(let j = col-1; j<= col+1; j++){
            try {
                if (i===row && j===col){
                    continue
                }
                else if (tempGrid[i][j].classList[0]==="alive"){
                    count++
                }
            } catch (error) {
                continue
            }
        }
    }
    if (count===3){
        elementGrid[row][col].classList.remove("dead")
        elementGrid[row][col].classList.add("alive")
    }
    return tempGrid
}

