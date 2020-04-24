
var tableGrid = document.getElementById('table');
var walls = [], weightButtonPressed = false,negativeWeight = false, removeButton = false;

function Node(nodeId,nodeType){
  this.nodeId = nodeId;
  this.nodeType = nodeType;
  this.nodeWeight = 0;
  this.distance = Infinity;
  this.steps = 0;
  this.edges = "";
}

function Board() {
  this.mousePressed = false;
  this.boardArray = [];
  this.start = "";
  this.target = "";
  this.nodes = {};
}

// Functions initialization
Board.prototype.initialise = function() {
  this.createGrid();
  this.addEventListeners();
};

// Grid creation
Board.prototype.createGrid = function(){
for (var rows = 0; rows < 15; rows++){
  let aRow = document.createElement("tr");
  let boardRow = [], nodeType;

  for (var cols = 0; cols < 50; cols++){
    var tableData = document.createElement("td");
    var dataDiv = document.createElement("div");
    var newNode;

    dataDiv.id = `${rows}-${cols}`;
    dataDiv.className = "cell";

    if (rows == 7 && cols == 11){
      nodeType = "start";
      this.start = dataDiv.id;
      dataDiv.style.backgroundColor = "green";
      dataDiv.innerText = "S";
      dataDiv.style.color = "yellow";
    } else if (rows == 7 && cols == 37){
      nodeType = "target";
      this.target = dataDiv.id;
      dataDiv.style.backgroundColor = "red";
      dataDiv.innerText = "X";
      dataDiv.style.color = "yellow";
    }
    else{
    nodeType = "unvisited";
  }

    newNode = new Node(dataDiv.id,nodeType);

    this.nodes[dataDiv.id] = newNode;
    tableData.appendChild(dataDiv);
    aRow.appendChild(tableData);
    boardRow.push(newNode);

    }

  tableGrid.appendChild(aRow);
  this.boardArray.push(boardRow);

  }
}

// Mouse event handlers
Board.prototype.addEventListeners = function(){
for (var i=0;i<15;i++){
  for(var j=0;j<50;j++){
    // var id = `${i}-${j}`;

    let item = document.getElementById(`${i}-${j}`);

    item.onmouseover = (e) => {
      e.preventDefault();
      // item.style.backgroundColor = "blue";
      if (Board.mousePressed){
        var id = item.id;

        if(this.nodes[id].nodeType==="unvisited"){
            if(weightButtonPressed){
              this.nodes[id].nodeWeight += 1;
              item.innerText = this.nodes[id].nodeWeight;
            }

            else if (this.nodes[`${id}`].nodeWeight==0){
            // walls.push(id);
            this.nodes[id].nodeType = "wall";
            var img = document.createElement("img");
            var att = document.createAttribute("src");
            att.value = "imgs/thread-lock.jpg";
            img.setAttributeNode(att);
            img.className = "img";
            // item.style.backgroundColor = "#134750";
            item.appendChild(img);
          }
        }
        // else if(this.nodes[id].nodeType==="wall"){
        //   var imgElement = item.getElementsByClassName("img")[0];
        //   item.removeChild(imgElement);
        //   this.nodes[id].nodeType = "unvisited";
        // }
      }
    }

    item.onmousedown = (e) => {
      e.preventDefault();
      // Board.nodes[`${i}-${j}`].nodeType = "wall";
      Board.mousePressed = true;
      // var id = item.id;
}

    item.onmouseup = (e) => {
      var id = item.id;
      e.preventDefault();
      Board.mousePressed = false;
      // console.log(`right section id:${id} ${this.nodes[id].nodeType}`);
      if(this.nodes[id].nodeType==="unvisited"){
          if(weightButtonPressed){
            this.nodes[id].nodeWeight += 1;
            item.innerText = this.nodes[id].nodeWeight;
          }


          else if (this.nodes[`${id}`].nodeWeight==0){
          // walls.push(id);
          this.nodes[id].nodeType = "wall";
          var img = document.createElement("img");
          var att = document.createAttribute("src");
          att.value = "imgs/thread-lock.jpg";
          img.setAttributeNode(att);
          img.className = "img";
          // item.style.backgroundColor = "#134750";
          item.appendChild(img);
        }
        else if (this.nodes[`${id}`].nodeWeight>0){
          this.nodes[id].nodeWeight -= 1;
          if(this.nodes[id].nodeWeight===0)
            item.innerText = "";
          else
            item.innerText = this.nodes[id].nodeWeight;
        }
      }
      else if(this.nodes[id].nodeType==="wall"){
        var imgElement = item.getElementsByClassName("img")[0];
        item.removeChild(imgElement);
        this.nodes[id].nodeType = "unvisited";
        // console.log(`right section id:${id} ${this.nodes[id].nodeType}`);
      }
    }
  }
}
}

// Keyboard events listeners/handlers

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 87) {
    weightButtonPressed = true;
  }
});

document.addEventListener('keyup', function (evt) {
  if (evt.keyCode === 88) {
    // console.clear();
    weightButtonPressed = false;
  }
});

let newObject = new Board();
newObject.initialise();

document.getElementsByClassName("button")[0].onclick = () => {
    dijkstra_Function(newObject.nodes, newObject.start, newObject.target, newObject.boardArray);
}
