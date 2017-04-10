function addLoadEvent(func) {
	var oldLoad = window.onload;
	if(typeof oldLoad != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldLoad();
			func();
		};
	}
}

function addHandler(ele, type, handler) {
	if(ele.addEventListener) {
		ele.addEventListener(type, handler, false);
	} else if(ele.attachEvent) {
		ele.attachEvent("on"+type, handler);
	} else {
		ele["on"+type] = handler;
	}
}

function traverse() {
	var root = document.querySelector(".one");
	root.style.backgroundColor = "blue";
	recurse(root);	
}

function recurse(node) {
	var children = node.children,
		i;
	
	for(i=0; i<children.length; i++) {

		setInterval(recurse(children[i]), 1000);

	}
	// if(node.previousSibling) {
	// 	node.previousSibling.style = "{backgroud-color : white}";
	// }
	node.style.backgroundColor = "blue";
	console.log(node.className);	
}

function addListener() {
	var traverseBtn = document.querySelector("button");

	addHandler(traverseBtn, "click", traverse);
}

addLoadEvent(addListener);