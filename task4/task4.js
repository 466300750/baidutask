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

function leftIn() {
	var textNode = document.getElementById("aqi-input");
	var text = textNode.value;
	if(text === null) return;
	var div = document.getElementsByTagName("div").item(0);
	var span = document.createElement("span");
	span.className = "number";
	span.innerText = text;
	span.addEventListener("click", deleteEle(event), false);
	div.insertBefore(span,div.firstElementChild);
}

function rightIn() {
	var textNode = document.getElementById("aqi-input");
	var text = textNode.value;
	if(text === null) return;
	var div = document.getElementsByTagName("div").item(0);
	var span = document.createElement("span");
	span.className = "number";
	span.innerText = text;
	span.addEventListener("click", deleteEle(event), false);
	div.appendChild(span);
}

function leftOut() {
	var div = document.getElementsByTagName("div").item(0);
	var first = div.firstElementChild;
	var text = first.lastChild.nodeValue;
	alert(text);
	div.removeChild(first);	
}

function rightOut() {
	var div = document.getElementsByTagName("div").item(0);
	var last = div.lastElementChild;
	var text = last.lastChild.nodeValue;
	alert(text);
	div.removeChild(last);
}

function deleteEle(event) {
	var div = document.getElementsByTagName("div").item(0);
	console.log(event.target);
	if(event.target.nodeName === "span")  {
		div.removeChild(event.target);
	}
}

function addListener() {
	var leftInBtn = document.getElementById("leftin");
	var rightInBtn = document.getElementById("rightin");
	var leftOutBtn = document.getElementById("leftout");
	var rightOutBtn = document.getElementById("rightout");
	leftInBtn.addEventListener("click", leftIn, false);
	rightInBtn.addEventListener("click", rightIn, false);
	leftOutBtn.addEventListener("click", leftOut, false);
	rightOutBtn.addEventListener("click", rightOut, false);	
}

addLoadEvent(addListener);
