let bigSize = 10;
let smallSize = 5;

let initialcx = 30; // First x co-ordinate of circle centre. 
let initialcy = 30; // First y co-ordinate of circle centre. 

let rowLength = 25; // Length of dot array row.
let currentRow = 0;
let circleNumber = 650; // Number of circles.

let xincrement = 25; // Amount by which the x position increases each dot.
let yincrement = 25; // Amount by which the y position increases with each row.

// Current esults div.
let results = document.querySelector("#current_results");


function loadData(source) {

	// Import consistuency data (source: https://odileeds.org/projects/hexmaps/constituencies/) 
	httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = populateData;
	httpRequest.open("GET", source, true); // false here means this is loaded synchronously.

	httpRequest.send();

	function populateData() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				var consData = JSON.parse(httpRequest.responseText);
				console.log(consData);
			} else {
				alert("There was a problem with the request.");
			}
		}
	}
}

function createCircles() {

	svg = document.querySelector("#mapbox");

	let currentcx = initialcx;
	let currentcy = initialcy;
	let i;
	for (i = 0; i < circleNumber; i++) {

		currentcx = currentcx + xincrement;

		if (i % rowLength == 0) {
			currentRow = currentRow + 1;
			currentcy = (yincrement * currentRow);
			currentcx = initialcx;
		}

		let svgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		svgCircle.setAttribute("cx", currentcx);
		svgCircle.setAttribute("cy", currentcy);
		svgCircle.setAttribute("r", smallSize);
		svgCircle.setAttribute("id", i);
		svgCircle.setAttribute("class", "invisible");
		svg.appendChild(svgCircle);
	}
}

createCircles();

const myJSON = loadData("test.hexjson");

// Get a static array of all the circles.
let circles = document.querySelectorAll("#mapbox circle"); //"#mapbox > circle:nth-child(1)"

// From: https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
const delayLoop = (fn, delay) => {
	return (x, i) => {
		setTimeout(() => {
			fn(x);
		}, i * delay);
	}
};

// Seat counts.
redSeats = 0;
orangeSeats = 0;
blueSeats = 0;

// Event listeners.

// Make circles appear one by one on click.
document.querySelector("#reset").addEventListener("mousedown", function (event) {
	circles.forEach(delayLoop(function (circle) { circle.setAttribute("class", "neutral") }, 1.2));
	redSeats = 0;
	orangeSeats = 0;
	blueSeats = 0;
	updateCount();
});

// Change colours of circles when user enters value in appropriate input box.

// Get references to the input button.
let inputButton = document.querySelector("#input");

// Get references to the input boxes.
let orangeInput = document.querySelector("#orange_input");
let redInput = document.querySelector("#red_input");
let blueInput = document.querySelector("#blue_input");

// Add event listener to the input button so that when clicked, it populates circles.
inputButton.addEventListener("click", function (event) {
	redSeats = parseInt(redInput.value);
	blueSeats = parseInt(blueInput.value);
	orangeSeats = parseInt(orangeInput.value);

	let currentRedSeats = redSeats;
	let currentBlueSeats = blueSeats;
	let currentOrangeSeats = orangeSeats;

	// Check inputs are numbers.
	if (isNaN(redSeats) | isNaN(blueSeats) | isNaN(orangeSeats)) {
		alert("Please enter numbers.");
	}

	// Check numbers add up to circleNumber.
	if ((redSeats + blueSeats + orangeSeats) > circleNumber) {
		alert("Seat numbers must sum to " + circleNumber + ", not " + (redSeats + blueSeats + orangeSeats));
	}

	for (i = 0; i < circles.length; i++) {
		if (currentRedSeats != 0) {
			circles.item(i).setAttribute("class", "red");
			currentRedSeats = currentRedSeats - 1;
			continue;
		}
		if (currentBlueSeats != 0) {
			circles.item(i).setAttribute("class", "blue");
			currentBlueSeats = currentBlueSeats - 1;
			continue;
		}
		if (currentOrangeSeats != 0) {
			circles.item(i).setAttribute("class", "orange");
			currentOrangeSeats = currentOrangeSeats - 1;
			continue;
		}
	}

	updateCount();
});


// Add event listeners to each circle so that circles change colour and size when they are touched.
circles.forEach((circle) => circle.addEventListener("mouseover", function (event) {

	circle.setAttribute("r", bigSize);

	updateCount();

	if (circle.getAttribute("class") === "neutral") {
		circle.setAttribute("class", "red");
		redSeats = redSeats + 1;
	} else if (circle.getAttribute("class") === "red") {
		circle.setAttribute("class", "orange");
		redSeats = redSeats - 1;
		orangeSeats = orangeSeats + 1;
	} else if (circle.getAttribute("class") === "orange") {
		circle.setAttribute("class", "blue");
		orangeSeats = orangeSeats - 1;
		blueSeats = blueSeats + 1;
	} else if (circle.getAttribute("class") === "blue") {
		circle.setAttribute("class", "neutral");
		blueSeats = blueSeats - 1;
	}

	updateCount();


}));

// Updates count of seat colours.
function updateCount() {
	results.innerHTML = "Red: " + redSeats + "<br> Orange:" + orangeSeats + "<br> Blue:" + blueSeats;
}

// Change size back to normal after touching circles.
circles.forEach((circle) => circle.addEventListener("mouseout", function (event) {
	circle.setAttribute("r", smallSize);
}));

