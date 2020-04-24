
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
for (var rows = 0; rows < 21; rows++){
  let aRow = document.createElement("tr");
  let boardRow = [], nodeType;

  for (var cols = 0; cols < 50; cols++){
    var tableData = document.createElement("td");
    var dataDiv = document.createElement("div");
    var newNode;

    dataDiv.id = `${rows}-${cols}`;
    dataDiv.className = "cell";

    if (rows == 10 && cols == 11){
      nodeType = "start";
      this.start = dataDiv.id;
      dataDiv.style.backgroundColor = "green";
      // dataDiv.innerText = "S";
      // dataDiv.style.color = "yellow";

      var img = document.createElement("img");
      var att = document.createAttribute("src");
      att.value = "imgs/visitedGrass.jpg";
      img.setAttributeNode(att);
      img.className = "startGrass";
      dataDiv.appendChild(img);
      nodeType = "unvisited";

      img = document.createElement("img");
      att = document.createAttribute("src");
      att.value = "imgs/startingPoint.png";
      img.setAttributeNode(att);
      img.className = "startFire";
      dataDiv.appendChild(img);

    } else if (rows == 10 && cols == 37){
      // https://www.google.com.tw/search?q=finish+line+pixel+art+square&tbm=isch&ved=2ahUKEwiL1pzBu93nAhUHc5QKHXM1D7oQ2-cCegQIABAA&oq=finish+line+pixel+art+square&gs_l=img.3...15825.20460..21306...0.0..0.153.669.4j3......0....1..gws-wiz-img.......0i30.VetGFqHkfk4&ei=rxVNXsvCJofm0QTz6rzQCw&authuser=0&bih=657&biw=1366&hl=en#imgrc=Ospk1SMTDLlwtM
        nodeType = "target";
        this.target = dataDiv.id;
        // dataDiv.style.backgroundColor = "red";
        // dataDiv.innerText = "X";
        // dataDiv.style.color = "yellow";
        var img = document.createElement("img");
        var att = document.createAttribute("src");
        att.value = "imgs/finalPoint.png";
        img.setAttributeNode(att);
        img.className = "startGrass";
        img.style.zIndex = "3";
        dataDiv.appendChild(img);
        nodeType = "unvisited";
    }
    else{
      var img = document.createElement("img");
      var att = document.createAttribute("src");
      att.value = "imgs/unvisitedGrass.jpg";
      img.setAttributeNode(att);
      img.className = "img";
      dataDiv.appendChild(img);
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
for (var i=0;i<21;i++){
  for(var j=0;j<50;j++){
    // var id = `${i}-${j}`;

    let item = document.getElementById(`${i}-${j}`);

    item.onmouseover = (e) => {
      e.preventDefault();
      // item.style.backgroundColor = "blue";
      if (Board.mousePressed){
        var id = item.id;

        if(this.nodes[id].nodeType==="unvisited" && this.nodes[id].nodeId !== "10-11" && this.nodes[id].nodeId !== "10-37"){
            if(weightButtonPressed){
              this.nodes[id].nodeWeight += 1;
              // item.innerText = this.nodes[id].nodeWeight;
              var img = document.createElement("img");
              var att = document.createAttribute("src");
              att.value = "imgs/sandStone.jpg";
              img.setAttributeNode(att);
              img.className = "stone";
              img.style.top = `${this.nodes[id].nodeWeight*3}%`;
              img.style.left = `${this.nodes[id].nodeWeight*3}%`;
              item.appendChild(img);
            }

            else if (this.nodes[`${id}`].nodeWeight==0){
              var temp = item.getElementsByTagName("img")[0];
              item.removeChild(temp);

              this.nodes[id].nodeType = "wall";
              var img = document.createElement("img");
              var att = document.createAttribute("src");
              att.value = "imgs/wall.jpg";
              img.setAttributeNode(att);
              img.className = "img";
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
      if(this.nodes[id].nodeType==="unvisited" && this.nodes[id].nodeId !== "10-11" && this.nodes[id].nodeId !== "10-37"){
          if(weightButtonPressed){
            this.nodes[id].nodeWeight += 1;
            // item.innerText = this.nodes[id].nodeWeight;
            var img = document.createElement("img");
            var att = document.createAttribute("src");
            att.value = "imgs/sandStone.jpg";
            img.setAttributeNode(att);
            img.className = "stone";
            img.style.top = `${this.nodes[id].nodeWeight*3}%`;
            img.style.left = `${this.nodes[id].nodeWeight*3}%`;
            item.appendChild(img);
          }


          else if (this.nodes[`${id}`].nodeWeight==0){
          // walls.push(id);
          var temp = item.getElementsByTagName("img")[0];
          item.removeChild(temp);

          this.nodes[id].nodeType = "wall";
          var img = document.createElement("img");
          var att = document.createAttribute("src");
          att.value = "imgs/wall.jpg";
          img.setAttributeNode(att);
          img.className = "img";
          // item.style.backgroundColor = "#134750";
          item.appendChild(img);
        }
        else if (this.nodes[`${id}`].nodeWeight>0){
          this.nodes[id].nodeWeight -= 1;

          var temp = item.getElementsByClassName("stone");
          temp = temp[temp.length - 1];
          item.removeChild(temp);
        }
      }
      else if(this.nodes[id].nodeType==="wall"){
        var imgElement = item.getElementsByClassName("img")[0];
        item.removeChild(imgElement);
        this.nodes[id].nodeType = "unvisited";
        // console.log(`right section id:${id} ${this.nodes[id].nodeType}`);
        var img = document.createElement("img");
        var att = document.createAttribute("src");
        att.value = "imgs/unvisitedGrass.jpg";
        img.setAttributeNode(att);
        img.className = "img";
        // item.style.backgroundColor = "#134750";
        item.appendChild(img);
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
