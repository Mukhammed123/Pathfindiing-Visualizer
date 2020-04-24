// Greedy Algorithm
// Negative edges are not allowed

var found = false, neighbors = [], copyOfBoardArray = [], copyOfNodes=[], counter=0, goBack = [], ready = false, totalDistance, onlyDistance=0;
var animated;
function dijkstra_Function(nodes, start, end, boardArray){
  copyOfBoardArray = boardArray;
  copyOfNodes = nodes;
  nodes[start].distance = 0;
  // nodes[start].nodeType = "visited";
  neighbors.push(nodes[start]);

    while(neighbors.length>0){
      sortArray();
      observeNodeDistance();
      counter++;

      if (found == true){
        neighbors = [];
        animated = document.getElementById(goBack[0].nodeId);
        animated.onanimationend = () => {
            wayBackAnimation();
          };
        break;
      }
      if (neighbors.length > 0) neighbors.shift();
    }

    if (found){
      findShortestPath();
    }
}


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
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

  if (col < 49 && (copyOfBoardArray[row][col + 1].nodeType == "unvisited" || copyOfBoardArray[row][col + 1].nodeType == "target") && (currentNode.distance + copyOfBoardArray[row][col + 1].nodeWeight + 1 < copyOfBoardArray[row][col + 1].distance)){
    if (copyOfBoardArray[row][col + 1].nodeType == "target"){
      goBack.push(copyOfBoardArray[row][col])

      neighbors = [];
      found = true;
      return true;
    }
    copyOfBoardArray[row][col + 1].steps = currentNode.steps + 1;
    copyOfBoardArray[row][col + 1].distance = currentNode.distance + 1 + copyOfBoardArray[row][col + 1].nodeWeight;
    copyOfBoardArray[row][col + 1].nodeType = "visited";
    document.getElementById(`${row}-${col+1}`).style.animation = `visited 0.5s ${counter/50}s forwards`;

    neighbors.push(copyOfBoardArray[row][col + 1]);
  }
  if (col > 0 && (copyOfBoardArray[row][col - 1].nodeType == "unvisited" || copyOfBoardArray[row][col - 1].nodeType == "target") && (currentNode.distance + copyOfBoardArray[row][col - 1].nodeWeight + 1 < copyOfBoardArray[row][col - 1].distance)){
    if (copyOfBoardArray[row][col - 1].nodeType == "target"){
      goBack.push(copyOfBoardArray[row][col])
      neighbors = [];
      found = true;
      return true;
    }
    copyOfBoardArray[row][col - 1].steps = currentNode.steps + 1;
    copyOfBoardArray[row][col - 1].distance = currentNode.distance + 1 + copyOfBoardArray[row][col - 1].nodeWeight;
    copyOfBoardArray[row][col - 1].nodeType = "visited";
    document.getElementById(`${row}-${col-1}`).style.animation = `visited 0.5s ${counter/50}s forwards`;

    neighbors.push(copyOfBoardArray[row][col - 1]);
  }
  if (row < 14 && (copyOfBoardArray[row + 1][col].nodeType == "unvisited" || copyOfBoardArray[row+1][col].nodeType == "target") && (currentNode.distance + copyOfBoardArray[row+1][col].nodeWeight + 1 < copyOfBoardArray[row+1][col].distance)){
    if (copyOfBoardArray[row+1][col].nodeType == "target"){
      goBack.push(copyOfBoardArray[row][col])
      neighbors = [];
      found = true;
      return true;
    }
    copyOfBoardArray[row + 1][col].steps = currentNode.steps + 1;
    copyOfBoardArray[row + 1][col].distance = currentNode.distance + 1 + copyOfBoardArray[row + 1][col].nodeWeight;
    copyOfBoardArray[row + 1][col].nodeType = "visited";
    document.getElementById(`${row+1}-${col}`).style.animation = `visited 0.5s ${counter/50}s forwards`;

    neighbors.push(copyOfBoardArray[row + 1][col]);
  }
  if (row > 0 && (copyOfBoardArray[row - 1][col].nodeType == "unvisited" || copyOfBoardArray[row-1][col].nodeType == "target") && (currentNode.distance + copyOfBoardArray[row-1][col].nodeWeight + 1 < copyOfBoardArray[row-1][col].distance)){
    if (copyOfBoardArray[row-1][col].nodeType == "target"){
      goBack.push(copyOfBoardArray[row][col])
      neighbors = [];
      found = true;
      return true;
    }
    copyOfBoardArray[row - 1][col].steps = currentNode.steps + 1;
    copyOfBoardArray[row - 1][col].distance = currentNode.distance + 1 + copyOfBoardArray[row - 1][col].nodeWeight;
    copyOfBoardArray[row - 1][col].nodeType = "visited";
    document.getElementById(`${row-1}-${col}`).style.animation = `visited 0.5s ${counter/50}s forwards`;

    neighbors.push(copyOfBoardArray[row - 1][col]);
  }
}


var currentNode,row,col;
function findShortestPath(){

  var coordinates = goBack[0].nodeId.split("-");
  row = Number(coordinates[0]), col = Number(coordinates[1]);
  var innerCounter=0;
  totalDistance = goBack[0].steps;
  currentNode = goBack[0]

  while(totalDistance>1){

  if (col > 0 && (currentNode.distance > copyOfBoardArray[row][col - 1].distance)){
      totalDistance -= 1;
      currentNode = copyOfBoardArray[row][col - 1];
      col--;
      goBack.push(currentNode)

  }

  else if (row < 14 && (currentNode.distance > copyOfBoardArray[row+1][col].distance)){
      totalDistance -= 1;
      currentNode = copyOfBoardArray[row+1][col];
      row++;
      goBack.push(currentNode)

  }
  else if (row > 0 && (currentNode.distance > copyOfBoardArray[row-1][col].distance)){
      totalDistance -= 1;
      currentNode = copyOfBoardArray[row-1][col];
      row--;
      goBack.push(currentNode)

  }
  else if (col < 49 && (currentNode.distance > copyOfBoardArray[row][col + 1].distance)){
      totalDistance -= 1;
      currentNode = copyOfBoardArray[row][col + 1];
      col++;
      goBack.push(currentNode)

  }
 }
}

function wayBackAnimation(){
  var c=0;
  for (var i=goBack.length-1;i>=0;i--){
    c++;
    if (c>9){
    document.getElementById(goBack[i].nodeId).style.backgroundColor = "pink";
    document.getElementById(goBack[i].nodeId).style.animation = `pathBack 0.5s ${c/10}s forwards`;
  }
    else{
      document.getElementById(goBack[i].nodeId).style.backgroundColor = "pink";
    document.getElementById(goBack[i].nodeId).style.animation = `pathBack 0.5s 0.${c}s forwards`;
  }
  }
}
