// Make the Labour SVG element draggable:
// let thing = document.svg.path.querySelector("#Na_h-Eileanan_an_Iar");

const allSVG = document.querySelector("#mapbox");

console.log(document.querySelector("mapbox"));

// console.log("Thing is " + thing);
// dragElement(document.querySelector("#mapbox #Na_h-Eileanan_an_Iar"));

// function dragElement(elmnt) {
//   console.log("dragElement called!");
//   console.log("The element is : " + elmnt);  
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//   elmnt.onmousedown = dragMouseDown;

//   function dragMouseDown(e) {
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }
