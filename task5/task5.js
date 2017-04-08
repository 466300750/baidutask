function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function handleInput() {
	var textNode = document.getElementById("aqi-input");
	var text = textNode.value;
	textNode.value = "";
	if(text === null) return;
	var textNum = parseInt(text);
	if(textNum <10 || textNum>100) {
		alert("The input number should from 10 to 100");
	} else {
		return textNum;			
	}
}

function leftIn() {
	var textNum = handleInput();
	var div = document.getElementsByTagName("div").item(0);
	if(typeof textNum === "number") {		
		if(div.childNodes.length > 60) {
			alert("The length of the queue cannot be more than 60");
			return;
		} else {
			var span = document.createElement("span");
			span.className = "number";
			span.style.height = textNum+"px";
			div.insertBefore(span,div.firstElementChild);
		}
	}			
}

function rightIn() {
	var textNum = handleInput();
	var div = document.getElementsByTagName("div").item(0);
	if(typeof textNum === "number") {		
		if(div.childNodes.length > 60) {
			alert("The length of the queue cannot be more than 60");
			return;
		} else {
			var span = document.createElement("span");
			span.className = "number";
			span.style.height = textNum+"px";
			div.appendChild(span);
		}
	}				
}


function leftOut() {
	var div = document.getElementsByTagName("div").item(0);
	var first = div.firstElementChild;
	var text = first.style.height.slice(0, -2);
	alert(text);
	div.removeChild(div.firstElementChild);
}

function rightOut() {
	var div = document.getElementsByTagName("div").item(0);
	var last = div.lastElementChild;
	var text = last.style.height.slice(0. -2);
	alert(text);
	div.removeChild(div.lastElementChild);
}

function deleteEle(event) {
	var div = document.getElementsByTagName("div").item(0);
	if(event.target.nodeName.toLowerCase() === "span") {
		div.removeChild(event.target);
	}
}

function addListener() {
	var div = document.getElementsByTagName("div").item(0);
	var leftInBtn = document.getElementById("leftin");
	var rightInBtn = document.getElementById("rightin");
	var leftOutBtn = document.getElementById("leftout");
	var rightOutBtn = document.getElementById("rightout");
	var eleBtns = document.getElementsByClassName("number");
	div.addEventListener("click", deleteEle, false);
	leftInBtn.addEventListener("click", leftIn, false);
	rightInBtn.addEventListener("click", rightIn, false);
	leftOutBtn.addEventListener("click", leftOut, false);
	rightOutBtn.addEventListener("click", rightOut, false);
}

addLoadEvent(addListener);
