// Greedy Algorithm
// Negative edges are not allowed

var found = false, neighbors = [], copyOfBoardArray = [], copyOfNodes=[], counter=0, goBack = [], ready = false, totalDistance, onlyDistance=0;
var animated;
function dijkstra_Function(nodes, start, end, boardArray){
  copyOfBoardArray = boardArray;
  copyOfNodes = nodes;
  nodes[start].distance = 0;
  nodes[start].nodeType = "start";
  nodes[end].nodeType = "target";
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
      goBack.push(copyOfBoardArray[row][col]);

      neighbors = [];
      found = true;
      return true;
    }
    copyOfBoardArray[row][col + 1].steps = currentNode.steps + 1;
    copyOfBoardArray[row][col + 1].distance = currentNode.distance + 1 + copyOfBoardArray[row][col + 1].nodeWeight;
    copyOfBoardArray[row][col + 1].nodeType = "visited";
    copyOfBoardArray[row][col + 1].edges = `${currentNode.nodeId}_${copyOfBoardArray[row][col + 1].nodeId}`;
    // document.getElementById(`${row}-${col+1}`).style.animation = `visited 0.5s ${counter/50}s forwards`;
    var item = document.getElementById(`${row}-${col+1}`);
    var temp = item.getElementsByTagName("img")[0];
    temp.style.zIndex = "3";
    temp.style.animationName = "cf3FadeInOut";
    temp.style.animationDuration = `${counter/40}s`;
    temp.style.animationFillMode = "forwards";
    // item.removeChild(temp);
    // temp.style.display = "none";


    var img = document.createElement("img");
    var att = document.createAttribute("src");
    att.value = "imgs/visitedGrass.jpg";
    img.setAttributeNode(att);
    img.className = "img";
    item.appendChild(img);

    temp = item.getElementsByClassName("img")[1];
    temp.style.zIndex = "2";

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
    copyOfBoardArray[row][col - 1].edges = `${currentNode.nodeId}_${copyOfBoardArray[row][col - 1].nodeId}`;
    // document.getElementById(`${row}-${col-1}`).style.animation = `visited 0.5s ${counter/50}s forwards`;

    var item = document.getElementById(`${row}-${col-1}`);
    var temp = item.getElementsByTagName("img")[0];
    temp.style.zIndex = "3";
    temp.style.animationName = "cf3FadeInOut";
    temp.style.animationDuration = `${counter/40}s`;
    temp.style.animationFillMode = "forwards";
    // item.removeChild(temp);
    // temp.style.display = "none";

    item.style.transitionDelay = `${counter/40}s`;

    var img = document.createElement("img");
    var att = document.createAttribute("src");
    att.value = "imgs/visitedGrass.jpg";
    img.setAttributeNode(att);
    img.className = "img";
    item.appendChild(img);

    temp = item.getElementsByClassName("img")[1];
    temp.style.zIndex = "2";

    neighbors.push(copyOfBoardArray[row][col - 1]);
  }
  if (row < 20 && (copyOfBoardArray[row + 1][col].nodeType == "unvisited" || copyOfBoardArray[row+1][col].nodeType == "target") && (currentNode.distance + copyOfBoardArray[row+1][col].nodeWeight + 1 < copyOfBoardArray[row+1][col].distance)){
    if (copyOfBoardArray[row+1][col].nodeType == "target"){
      goBack.push(copyOfBoardArray[row][col])
      neighbors = [];
      found = true;
      return true;
    }
    copyOfBoardArray[row + 1][col].steps = currentNode.steps + 1;
    copyOfBoardArray[row + 1][col].distance = currentNode.distance + 1 + copyOfBoardArray[row + 1][col].nodeWeight;
    copyOfBoardArray[row + 1][col].nodeType = "visited";
    copyOfBoardArray[row + 1][col].edges = `${currentNode.nodeId}_${copyOfBoardArray[row + 1][col].nodeId}`;
    // document.getElementById(`${row+1}-${col}`).style.animation = `visited 0.5s ${counter/50}s forwards`;

    var item = document.getElementById(`${row+1}-${col}`);
    var temp = item.getElementsByTagName("img")[0];
    temp.style.zIndex = "3";
    temp.style.animationName = "cf3FadeInOut";
    temp.style.animationDuration = `${counter/40}s`;
    temp.style.animationFillMode = "forwards";
    // item.removeChild(temp);
    // temp.style.display = "none";

    item.style.transitionDelay = `${counter/40}s`;

    var img = document.createElement("img");
    var att = document.createAttribute("src");
    att.value = "imgs/visitedGrass.jpg";
    img.setAttributeNode(att);
    img.className = "img";
    item.appendChild(img);

    temp = item.getElementsByClassName("img")[1];
    temp.style.zIndex = "2";

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
    copyOfBoardArray[row - 1][col].edges = `${currentNode.nodeId}_${copyOfBoardArray[row - 1][col].nodeId}`;
    // document.getElementById(`${row-1}-${col}`).style.animation = `visited 0.5s ${counter/50}s forwards`;

    var item = document.getElementById(`${row-1}-${col}`);
    var temp = item.getElementsByTagName("img")[0];
    temp.style.zIndex = "3";
    temp.style.animationName = "cf3FadeInOut";
    temp.style.animationDuration = `${counter/40}s`;
    temp.style.animationFillMode = "forwards";
    // item.removeChild(temp);
    // temp.style.display = "none";

    item.style.transitionDelay = `${counter/40}s`;

    var img = document.createElement("img");
    var att = document.createAttribute("src");
    att.value = "imgs/visitedGrass.jpg";
    img.setAttributeNode(att);
    img.className = "img";
    item.appendChild(img);

    temp = item.getElementsByClassName("img")[1];
    temp.style.zIndex = "2";

    neighbors.push(copyOfBoardArray[row - 1][col]);
  }
}


var currentNode,next;
function findShortestPath(){

  var coordinates = goBack[0].nodeId.split("-");
  totalDistance = goBack[0].steps;
  currentNode = goBack[0]

  while(currentNode.nodeType !== "start"){
    coordinates = currentNode.edges.split("_");
    next = coordinates[0];
    currentNode = copyOfNodes[next];
    goBack.push(currentNode);
 }
}

function wayBackAnimation(){
  var c=0;
  for (var i=goBack.length-2;i>=0;i--){
    c++;
    var item = document.getElementById(`${goBack[i].nodeId}`);
    var check = item.getElementsByClassName("asphalt");
    if(check.length == 0){
      var img = document.createElement("img");
      var att = document.createAttribute("src");
      att.value = "imgs/asphalt.jpg";
      img.setAttributeNode(att);
      img.className = "asphalt";
      animated = img;
      img.style.animationName = "appear";
      img.style.animationDuration = `${c/10}s`;
      item.appendChild(img);
    }
  }
}
