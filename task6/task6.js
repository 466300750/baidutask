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

function textQuery() {
	var textArea = document.querySelector("textarea"),
		text = textArea.value,
		input = document.querySelector("input"),
		inputText = input.value,
		len = inputText.length,
		index = text.indexOf(inputText),
		newHTML	= "";

		// console.log(textArea);

		if(index != -1) {
			newHTML = "<span style='color:red'>"+text.substring(index, index+len)+"<\\span>";
			text = text.substring(0, index)+newHTML+text.substring(index+len);
			// var textNode = document.createTextNode(text);
			// textArea.appendChild(textNode);
			textArea.innerHTML = text;
		}

}

function addListener() {
	var query = document.querySelector("button");
	query.addEventListener("click", textQuery, false);
}

addLoadEvent(addListener);
