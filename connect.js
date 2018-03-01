var svg, deltaX, deltaY, id;

var setup = function () {
    svg = document.getElementById("max");
    document.getElementById("radius").addEventListener("click", growShrink);
    document.getElementById("bounce").addEventListener("click", bounce);
    document.getElementById("stop").addEventListener("click", function() {
        clearInterval(id);
    });
};

var connectTheDots = function(evt) {
    if(lastY >= 0) {
        svg.appendChild(makeLine(evt.offsetX, evt.offsetY));
    }
    if(circle == true) {svg.appendChild(makeCircle(evt.offsetX, evt.offsetY));}
    else {svg.appendChild(makeSquare(evt.offsetX - 10, evt.offsetY - 10));}
    lastX = evt.offsetX;
    lastY = evt.offsetY;
};

var makeCircle = function(x, y) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "10");
    circle.setAttribute("fill", "black");
    return circle;
};

var makeSquare = function(x, y) {
    var square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("x", x);
    square.setAttribute("y", y);
    square.setAttribute("width", "20");
    square.setAttribute("height", "20");
    square.setAttribute("fill", "black");
    return square;
};

var makeLine = function(x2, y2) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", lastX);
    line.setAttribute("y1", lastY);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "blue");
    return line;
};

var clearSVG = function() {
    while(svg.children.length > 0) {
        svg.children[0].remove();
    }
};

var growShrink = function() {
    clearSVG();
    svg.appendChild(makeCircle(250, 250));
    clearInterval(id);
    id = setInterval(function() {
	var r = parseInt(svg.children[0].getAttribute("r"));
	svg.children[0].setAttribute("r", r + deltaX);
	if(r > 250) {
	    deltaX = -1;
	    r = 249;
	} else if(r < 5) {
	    deltaX = 1;
	    r = 6;
	}
    }, 1000 / 20);
    deltaX = 1;
};

var bounce = function() {
    clearSVG();
    svg.appendChild(makeCircle(25, 30));
    clearInterval(id);
    id = setInterval(function() {
	var x = parseInt(svg.children[0].getAttribute("cx"));
    }, 1000 / 20);
}

setup();
