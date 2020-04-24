// // Dynamic Programming Algorithm
// // Negative edges are not allowed
// // All pairs shortest path

var found = false, neighbors = [], copyOfBoardArray = [], copyOfNodes=[], counter=0, goBack = [], ready = false, totalDistance, onlyDistance=0,sstart;
var animated, lastElement, mustVisitNodes = {}, toAnimate = [], globalCounter = 0,colors = ["pink","#2ECC71","#E74C3C","#9B59B6","#3498DB","#1ABC9C"];

function setMustVisitNodes(){
  for(var i=0; i<15; i++){
    for(var j=0; j<50; j++){
      mustVisitNodes[`${i}-${j}`] = "unvisited";
    }
  }
}

function refreshFunction(){
  goBack = [];
  totalDistance = 0;
  found = false;
  counter = 0;
  for(var row=0; row<15; row++){
    for(var col=0; col<50; col++){
      if(copyOfBoardArray[row][col].nodeType !== "wall" && !(row===14 && col===49)){
        copyOfBoardArray[row][col].nodeType = "unvisited";
        copyOfBoardArray[row][col].steps = 0;
        copyOfBoardArray[row][col].distance = Infinity;
        document.getElementById(`${row}-${col}`).style.backgroundColor = "white";
        document.getElementById(`${row}-${col}`).style.animation = "none";
        if(document.getElementById(`${row}-${col}`).innerText === "S")
          document.getElementById(`${row}-${col}`).innerText = "";
      }
    }
  }
}

function checkFunction(){
  refreshFunction();
  var flag = false;
  for(var i=0; i<15; i++){
    for(var j=0; j<50; j++){
      if(mustVisitNodes[`${i}-${j}`] === "unvisited"){
        if(copyOfBoardArray[i][j].nodeType === "wall"){
          mustVisitNodes[`${i}-${j}`] = "visited";
        }else{
          flag = true;
          mustVisitNodes[`${i}-${j}`] = "visited";
          document.getElementById(`${i}-${j}`).style.backgroundColor = "green";
          document.getElementById(`${i}-${j}`).innerText = "S";
          break;
        }
      }
    }
    if(flag) break;
  }
  if(flag) loopingFunction(i,j);
}

function loopingFunction(r,c){
  globalCounter++;
  if(globalCounter >= colors.length)
    globalCounter = 0;
  // console.log(`${r}-${c}`);
  copyOfBoardArray[r][c].nodeType = "start";
  copyOfBoardArray[r][c].distance = 0;
  neighbors.push(copyOfBoardArray[r][c]);
  found = false;
  while(neighbors.length > 0){
    sortArray();
    observeNodeDistance();
    neighbors.shift();
    counter++;

    if(found){
      if(copyOfBoardArray[13][49].distance <= copyOfBoardArray[14][48].distance)
        goBack.push(copyOfBoardArray[13][49]);
      else
        goBack.push(copyOfBoardArray[14][48]);
      animated = document.getElementById(goBack[0].nodeId);
    }
  }
  if(lastElement.id === copyOfBoardArray[r][c].nodeId){
    checkFunction();
  }
  else{
    toAnimateFunction();
    if(found){
      lastElement.onanimationend = () => {
        lastElement.onanimationend = () => {
          ;
        }
        findShortestPath();
        wayBackAnimation();
        animated.onanimationend = () => {
          animated.onanimationend = () => {
            ;
          }
          checkFunction();
        }
      }
    }
    else{
      lastElement.onanimationend = () => {
        lastElement.onanimationend = () => {
          ;
        }
      checkFunction();
      }
    }
  }
}


function floyd_Function(nodes, boardArray){
  console.log("Run!");
  copyOfBoardArray = boardArray;
  copyOfNodes = nodes;
  var start = "0-0";
  mustVisitNodes[start] = "visited";
  nodes[start].distance = 0;
  nodes[start].nodeType = "start";
  neighbors.push(nodes[start]);

    while(neighbors.length>0){
      sortArray();
      observeNodeDistance();
      counter++;

      if (found == true){
        if(copyOfBoardArray[13][49].distance <= copyOfBoardArray[14][48].distance)
          goBack.push(copyOfBoardArray[13][49]);
        else
          goBack.push(copyOfBoardArray[14][48]);

        animated = document.getElementById(goBack[0].nodeId);
      }
      if (neighbors.length > 0) neighbors.shift();
    }
    toAnimateFunction();
    if(lastElement.id === start){
      checkFunction();
    }
    else{
      if (found){
        animated.onanimationend = () => {
          findShortestPath();
          wayBackAnimation();
          animated.onanimationend = () =>{
            animated.onanimationend = () => {
              ;
            }
            checkFunction();
          }
        };
      }else{
      lastElement.onanimationend = () =>{
        lastElement.onanimationend = () =>{
          ;
        }
        checkFunction();
      };
    }
  }
}

function sortArray(){
  var temp;
  for (var i=0;i<neighbors.length; i++){
    for (var j=0;j<i;j++){
      if(neighbors[i].distance < neighbors[j].distance){
        temp = neighbors[i];
        neighbors[i] = neighbors[j];
        neighbors[j] = temp;
      }
    }
  }
}

function observeNodeDistance(){
  var i = 0;
  var index = neighbors[i].nodeId;
  var currentNode = neighbors[i];
  var coordinates = index.split("-");
  var row = parseInt(coordinates[0]), col = parseInt(coordinates[1]);
  lastElement = document.getElementById(currentNode.nodeId);
  toAnimate.push([]);

  if (col < 49){
    if(copyOfBoardArray[row][col + 1].nodeType === "unvisited"){
      copyOfBoardArray[row][col + 1].nodeType = "visited";
      toAnimate[counter].push(`${row}-${col+1}`);
      lastElement = document.getElementById(`${row}-${col+1}`);
      neighbors.push(copyOfBoardArray[row][col + 1]);
    }

    if (copyOfBoardArray[row][col + 1].nodeType == "target"){
      found = true;
    }

    if(currentNode.distance + copyOfBoardArray[row][col + 1].nodeWeight + 1 < copyOfBoardArray[row][col + 1].distance){
      copyOfBoardArray[row][col + 1].steps = currentNode.steps + 1;
      copyOfBoardArray[row][col + 1].distance = currentNode.distance + 1 + copyOfBoardArray[row][col + 1].nodeWeight;
    }
  }
  if (col > 0){
    if(copyOfBoardArray[row][col - 1].nodeType === "unvisited"){
      toAnimate[counter].push(`${row}-${col-1}`);
      lastElement = document.getElementById(`${row}-${col-1}`);
      neighbors.push(copyOfBoardArray[row][col - 1]);
      copyOfBoardArray[row][col - 1].nodeType = "visited"
  }

    if (copyOfBoardArray[row][col - 1].nodeType == "target"){
      found = true;
    }

    if(currentNode.distance + copyOfBoardArray[row][col - 1].nodeWeight + 1 < copyOfBoardArray[row][col - 1].distance){
      copyOfBoardArray[row][col - 1].steps = currentNode.steps + 1;
      copyOfBoardArray[row][col - 1].distance = currentNode.distance + 1 + copyOfBoardArray[row][col - 1].nodeWeight;
    }
  }

  if (row < 14){
    if(copyOfBoardArray[row+1][col].nodeType === "unvisited"){
      toAnimate[counter].push(`${row+1}-${col}`);
      lastElement = document.getElementById(`${row+1}-${col}`);
      neighbors.push(copyOfBoardArray[row+1][col]);
      copyOfBoardArray[row+1][col].nodeType = "visited";
    }

    if (copyOfBoardArray[row+1][col].nodeType == "target"){
      found = true;
    }

    if(currentNode.distance + copyOfBoardArray[row+1][col].nodeWeight + 1 < copyOfBoardArray[row+1][col].distance){
      copyOfBoardArray[row+1][col].steps = currentNode.steps + 1;
      copyOfBoardArray[row+1][col].distance = currentNode.distance + 1 + copyOfBoardArray[row+1][col].nodeWeight;
    }
  }

  if (row > 0){
    if(copyOfBoardArray[row-1][col].nodeType === "unvisited"){
      toAnimate[counter].push(`${row-1}-${col}`);
      lastElement = document.getElementById(`${row-1}-${col}`);
      neighbors.push(copyOfBoardArray[row-1][col]);
      copyOfBoardArray[row-1][col].nodeType = "visited";
    }

    if (copyOfBoardArray[row-1][col].nodeType == "target"){
      found = true;
    }

    if(currentNode.distance + copyOfBoardArray[row-1][col].nodeWeight + 1 < copyOfBoardArray[row-1][col].distance){
      copyOfBoardArray[row-1][col].steps = currentNode.steps + 1;
      copyOfBoardArray[row-1][col].distance = currentNode.distance + 1 + copyOfBoardArray[row-1][col].nodeWeight;
    }
  }
  toAnimate[counter].push(globalCounter);
}


var currentNode,row,col;
function findShortestPath(){

  var coordinates = goBack[0].nodeId.split("-");
  row = Number(coordinates[0]), col = Number(coordinates[1]);
  var innerCounter=0;
  totalDistance = goBack[0].steps;
  currentNode = goBack[0]

  while(totalDistance > 1){

  if (col > 0 && copyOfBoardArray[row][col - 1].nodeType !== "wall" && (currentNode.distance > copyOfBoardArray[row][col - 1].distance)){
      totalDistance -= 1;
      currentNode = copyOfBoardArray[row][col - 1];
      col--;
      goBack.push(currentNode)

  }

  else if (row < 14 && copyOfBoardArray[row+1][col].nodeType !== "wall" && (currentNode.distance > copyOfBoardArray[row+1][col].distance)){
      totalDistance -= 1;
      currentNode = copyOfBoardArray[row+1][col];
      row++;
      goBack.push(currentNode)

  }
  else if (row > 0 && copyOfBoardArray[row-1][col].nodeType !== "wall" && (currentNode.distance > copyOfBoardArray[row-1][col].distance)){
      totalDistance -= 1;
      currentNode = copyOfBoardArray[row-1][col];
      row--;
      goBack.push(currentNode)

  }
  else if (col < 49 && copyOfBoardArray[row][col + 1].nodeType !== "wall" && (currentNode.distance > copyOfBoardArray[row][col + 1].distance)){
      totalDistance -= 1;
      currentNode = copyOfBoardArray[row][col + 1];
      col++;
      goBack.push(currentNode)

  }
 }
}
function toAnimateFunction(){
  var animationCounter=0;
  while(toAnimate.length > 0){
    for(var i=0; i<toAnimate[0].length-1; i++){
      document.getElementById(toAnimate[0][i]).style.animation = `visited${globalCounter} 0.5s ${animationCounter/50}s forwards`;
    }
    animationCounter++;
    toAnimate.shift();
  }
}

function wayBackAnimation(){
  var c=0;
  for (var i=goBack.length-1;i>=0;i--){
    c++;
    if (c>9){
      animated = document.getElementById(goBack[i].nodeId);
      document.getElementById(goBack[i].nodeId).style.backgroundColor = `${colors[globalCounter]}`;
      document.getElementById(goBack[i].nodeId).style.animation = `pathBack 0.5s ${c/10}s forwards`;
  }
    else{
      animated = document.getElementById(goBack[i].nodeId);
      document.getElementById(goBack[i].nodeId).style.backgroundColor = `${colors[globalCounter]}`;
      document.getElementById(goBack[i].nodeId).style.animation = `pathBack 0.5s 0.${c}s forwards`;
  }
  }
}
