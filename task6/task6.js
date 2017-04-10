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
	var inputText = document.querySelector("textarea").value,
		arr = [],
		reg = /[^0-9a-zA-Z\u4e00-\u9fa5]/g;

	arr = inputText.split(reg);
	arr=arr.filter(function(e){return e;});
	return arr;	
}

function leftIn() {
	var arr = handleInput(),
		i = 0,
		ul = document.querySelector("ul");
		oldHtml = ul.innerHTML,
		newHtml = "";

	for(i=0; i<arr.length; i++) {
		newHtml += "<li>" + arr[i] + "</li>";
	}

	ul.innerHTML = newHtml + oldHtml;
}

function rightIn() {
	var arr = handleInput(),
		i = 0,
		ul = document.querySelector("ul");
		oldHtml = ul.innerHTML;

	for(i=0; i<arr.length; i++) {
		oldHtml += "<li>" + arr[i] + "</li>";
	}

	ul.innerHTML = oldHtml;
}

function leftOut() {
	var ul = document.querySelector("ul"),
		first = ul.firstElementChild,
 		text = first.lastChild.nodeValue;

	alert(text);
	ul.removeChild(first);	
}

function rightOut() {
	var ul = document.querySelector("ul"),
		last = ul.lastElementChild;
		text = last.lastChild.nodeValue;

	alert(text);
	ul.removeChild(last);
}

function deleteEle(event) {
	var ul = document.querySelector("ul"),
		event = event || window.event;

	if(event.target.nodeName.toLowerCase() === "li")  {
		div.removeChild(event.target);
	}
}

function searchInput() {
	var inputSearch = document.querySelector("input").value,
		lis = document.querySelector("ul").children,
		i = 0;

	for(i=0; i<lis.length; i++) {
		if(lis[i].lastChild.nodeValue.indexOf(inputSearch) != -1) {
			lis[i].className = "matched";
		}
	}
}

function addListener() {
	var ul = document.querySelector("ul"),
		btns = document.querySelectorAll("button"),
		leftInBtn = btns[0],
		rightInBtn = btns[1],
		leftOutBtn = btns[2],
		rightOutBtn = btns[3],
		searchBtn = btns[4];

	ul.addEventListener("click", deleteEle, false);
	leftInBtn.addEventListener("click", leftIn, false);
	rightInBtn.addEventListener("click", rightIn, false);
	leftOutBtn.addEventListener("click", leftOut, false);
	rightOutBtn.addEventListener("click", rightOut, false);	
	searchBtn.addEventListener("click", searchInput, false);
}

addLoadEvent(addListener);
