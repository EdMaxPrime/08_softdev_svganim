var svg, deltaX, deltaY, id;

var setup = function () {
    svg = document.getElementById("max");
    document.getElementById("radius").addEventListener("click", growShrink);
    document.getElementById("bounce").addEventListener("click", bounce);
    document.getElementById("stop").addEventListener("click", function() {
        clearInterval(id);
    });
};

var makeCircle = function(x, y) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "10");
    circle.setAttribute("fill", "green");
    return circle;
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
	    var y = parseInt(svg.children[0].getAttribute("cy"));
        if(x <= 10) {
            x = 11;
            deltaX *= -1;
        }
        else if(x >= 490) {
            x = 489;
            deltaX *= -1;
        }
        if(y <= 10) {
            y = 11;
            deltaY *= -1;
        }
        else if(y >= 490) {
            y = 489;
            deltaY *= -1;
        }
        svg.children[0].setAttribute("cx", x + deltaX);
        svg.children[0].setAttribute("cy", y + deltaY);
    }, 1000 / 20);
    deltaX = 4;
    deltaY = 6;
}

setup();
