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
			span.innerText = textNum;
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
			span.style = "height:"+textNum+"px";
			// span.innerText = textNum;
			div.appendChild(span);
		}
	}				
}


function leftOut() {
	var div = document.getElementsByTagName("div").item(0);
	var first = div.firstElementChild;
	var text = first.lastChild.nodeValue;
	alert(text);

	var next = first.nextElementSibling;
	while(next) {
		first.innerText = next.innerText;
		first = next;
		next = next.nextElementSibling;		
	}
	first.innerText = "";
}

function rightOut() {
	var div = document.getElementsByTagName("div").item(0);
	var last = div.lastElementChild;
	var text = last.lastChild.nodeValue;
	alert(text);
	var prev = last.previousElementSibling;
	while(prev) {
		last.innerText = prev.innerText;
		last = prev;
		prev = last.previousElementSibling;
	}
	last.innerText = "";
}

function deleteEle() {
	this.innerText = "";
}

function addListener() {
	var leftInBtn = document.getElementById("leftin");
	var rightInBtn = document.getElementById("rightin");
	var leftOutBtn = document.getElementById("leftout");
	var rightOutBtn = document.getElementById("rightout");
	var eleBtns = document.getElementsByClassName("number");
	var len = eleBtns.length;
	leftInBtn.addEventListener("click", leftIn, false);
	rightInBtn.addEventListener("click", rightIn, false);
	leftOutBtn.addEventListener("click", leftOut, false);
	rightOutBtn.addEventListener("click", rightOut, false);
	for(var i=0; i<len; i++) {
		eleBtns[i].addEventListener("click", deleteEle, false);
	}
}

addLoadEvent(addListener);
