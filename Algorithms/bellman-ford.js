// Dynamic programming strategy
// Negative edges are allowed
// Repeatedly relax all the edges for n-1 times. n = number of vertices

var found = false, neighbors = [], copyOfBoardArray = [], copyOfNodes={}, counter=0, goBack = [], ready = false, totalDistance, onlyDistance=0, pairs = [], edges = {};
var animated, changed = false, colors = ["pink","#2ECC71","#E74C3C","#9B59B6","#3498DB","#1ABC9C"], colorIndex=0, prevNode, stringCompare = "";
var toAnimate = {}, cycles = 0;
function bellman_Function(nodes, start, end, boardArray){
  copyOfBoardArray = boardArray;
  copyOfNodes = nodes;
  changed = true;
   // Get all edges and Set them to infinity
     getEdges();

  edges[`${0}-${0}`] = 0;
  while(changed){
    if(colorIndex >= colors.length) colorIndex=0;
    cycles++;
    if(cycles>=750 && changed){
      alert("There is a dead cycle");
      ready = false;
      found = false;
      break;
    }
    ready = true;
    neighbors.push(nodes[start]);
    changed = false;
    counter++;
    runBellman();
    if(changed){
      for(var row=0;row<15;row++){
        for(var col=0;col<50;col++){
          if(copyOfBoardArray[row][col].nodeType !== "wall")
            copyOfNodes[`${row}-${col}`].nodeType = "unvisited";
        }
      }
    }

    colorIndex++;
  }
  if(ready)
    toAnimateFunction();

}

var innerIndex = 0, path = {};
function runBellman(){
  var string = "",current;
  for (var i=0; i<15; i++){
    for (var j=0; j<50; j++){
      current = `${i}-${j}`;
      toAnimate[innerIndex] = [];
      if(copyOfNodes[current].nodeType === "unvisited"){
        toAnimate[innerIndex].push(current);
        copyOfNodes[current].nodeType = "visited";
      }
      if(i<14 && copyOfNodes[`${i+1}-${j}`].nodeType !== "wall"){
        string = `${i+1}-${j}`;
        toAnimate[innerIndex].push(string);
        copyOfNodes[string].nodeType = "visited";

        if(edges[current] + 1 + copyOfBoardArray[i+1][j].nodeWeight < edges[string]){
          edges[string] = edges[current] + 1 + copyOfBoardArray[i+1][j].nodeWeight;
          path[string] = current;
          changed = true;
          }
      }
      if(j<49 && copyOfNodes[`${i}-${j+1}`].nodeType !== "wall"){
          string = `${i}-${j+1}`;
          toAnimate[innerIndex].push(string);
          copyOfNodes[string].nodeType = "visited";

          if(edges[current] + 1 + copyOfBoardArray[i][j+1].nodeWeight < edges[string]){
            edges[string] = edges[current] + 1 + copyOfBoardArray[i][j+1].nodeWeight;
            path[string] = current;
            changed = true;
            }
        }
      if(i>0 && copyOfNodes[`${i-1}-${j}`].nodeType !== "wall"){
        string = `${i-1}-${j}`;
          toAnimate[innerIndex].push(string);
          copyOfNodes[string].nodeType = "visited";

          if(edges[current] + 1 + copyOfBoardArray[i-1][j].nodeWeight < edges[string]){
            edges[string] = edges[current] + 1 + copyOfBoardArray[i-1][j].nodeWeight;
            path[string] = current;
            changed = true;
            }
        }
      if(j>0 && copyOfNodes[`${i}-${j-1}`].nodeType !== "wall"){
        string = `${i}-${j-1}`;
          toAnimate[innerIndex].push(string);
          copyOfNodes[string].nodeType = "visited";

          if(edges[current] + 1 + copyOfBoardArray[i][j-1].nodeWeight < edges[string]){
            edges[string] = edges[current] + 1 + copyOfBoardArray[i][j-1].nodeWeight;
            path[string] = current;
            changed = true;
            }
        }
      toAnimate[innerIndex].push(colorIndex);
      innerIndex++;
      }
    }
}

function getEdges(){
  for (var i=0; i<15; i++){
    for (var j=0; j<50; j++){
      edges[`${i}-${j}`] = Infinity;
    }
  }
}

var indicator=0, animationCounter=0, i=0, animationCycles = 0;
function toAnimateFunction(){
  var divElement;

  while(indicator == toAnimate[i][toAnimate[i].length-1] && i<innerIndex-1){
    for(var j=0; j<toAnimate[i].length; j++){
      if(j<toAnimate[i].length-1){
        coordinates = toAnimate[i][j];

        divElement = document.getElementById(coordinates);
        if(indicator==0){
          divElement.style.animation = `visited${toAnimate[i][toAnimate[i].length-1]} 0.5s ${animationCounter/500}s forwards`;
        }

        else{
          if(toAnimate[i][toAnimate[i].length-1]>0)
            divElement.style.backgroundColor = colors[toAnimate[i][toAnimate[i].length-1]-1];

          divElement.style.animation = `visited${toAnimate[i][toAnimate[i].length-1]} 0.5s ${animationCounter/500}s forwards`;
        }
        animated = divElement;
      }
    }
    i++;
    animationCounter+=10;
  }
  if(animationCycles < cycles){

    animated.onanimationend = () => {
      animationCycles++;
      indicator++;
      if(indicator >= colors.length)
        indicator=0;
      animationCounter=0
      toAnimateFunction();
    }
  }
  else{
    animated.onanimationend = () => {
      goBack = [];
      findShortestPathBellman();
      wayBackAnimationBellman();
    }
  }
}

var currentNode,row,col, lastAnimation;
function findShortestPathBellman(){

  var coordinates = "14-49", string = "", temp = "";
  row = Number(coordinates.split("-")[0]), col = Number(coordinates.split("-")[1]);
  var innerCounter=0;
  goBack.push(coordinates);
  // currentNode

  while(coordinates!=="0-0"){
    innerCounter++;
    coordinates = path[coordinates];
    goBack.push(coordinates);
    if(innerCounter>1000) break;
  }
}

function wayBackAnimationBellman(){
  var c=0;
  for (var i=goBack.length-1;i>=0;i--){
    c++;
    if (c>9){
    document.getElementById(goBack[i]).style.backgroundColor = colors[colorIndex-1];
    document.getElementById(goBack[i]).style.animation = `pathBack 0.5s ${c/10}s forwards`;
  }
    else{
      document.getElementById(goBack[i]).style.backgroundColor = colors[colorIndex-1];
    document.getElementById(goBack[i]).style.animation = `pathBack 0.5s 0.${c}s forwards`;
  }
  }
}
