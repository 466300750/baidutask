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

function preOrderTraverse() {
	var root = document.querySelector("#one"),
		arr = [];

	preventBtn();

	(function recurse(node) {
		var children = node.children,
			i;
		arr.push(node);
		if(children.length > 0) {
			recurse(children[0]);		
			recurse(children[1]);
		}		
	})(root);
	display(arr);
}

function inOrderTraverse() {
	var root = document.querySelector("#one"),
		arr = [];

	preventBtn();

	(function recurse(node) {
		var children = node.children,
			i;
		if(children.length > 0) {
			recurse(children[0]);
		} 			
		arr.push(node);
		if(children.length > 0) {
			recurse(children[1]);
		} 	
	})(root);
	display(arr);
}

function postOrderTraverse() {
	var root = document.querySelector("#one"),
		arr = [];

	preventBtn();

	(function recurse(node) {
		var children = node.children,
			i;
		
		for(i=0; i<children.length; i++) {
			recurse(children[i]);
		}
		arr.push(node);
	})(root);
	display(arr);
}

function display(arr) {
	var len = arr.length,
		count = 0;

	timer = setInterval(function() {
		arr[Math.max(count - 1, 0)].style.backgroundColor = '#fff';
        arr[Math.min(count, len - 1)].style.backgroundColor = '#09f';
        count++;
        if(count > arr.length){
            clearInterval(timer);
            allowBtn();
            arr[len - 1].style.backgroundColor = '#fff';
        }
	}, 1000);
}

function stopTraverse() {
	var nodes = document.querySelectorAll(".node");

	clearInterval(timer);
	for(var i=0; i<nodes.length; i++) {
		nodes[i].style.backgroundColor = "white";
	}

	allowBtn();
}

function preventBtn() {
	var btns = document.querySelectorAll("button"),
		DLRBtn = btns[0],
		LDRBtn = btns[1],
		LRDBtn = btns[2];

	DLRBtn.disabled = "disabled";
	LDRBtn.disabled = "disabled";
	LRDBtn.disabled = "disabled";
}

function allowBtn() {
	var btns = document.querySelectorAll("button"),
		DLRBtn = btns[0],
		LDRBtn = btns[1],
		LRDBtn = btns[2];

	DLRBtn.disabled = "";
	LDRBtn.disabled = "";
	LRDBtn.disabled = "";
}

function addListener() {
	var btns = document.querySelectorAll("button"),
		DLRBtn = btns[0],
		LDRBtn = btns[1],
		LRDBtn = btns[2],
		stopBtn = btns[3];

	addHandler(DLRBtn, "click", preOrderTraverse);
	addHandler(LDRBtn, "click", inOrderTraverse);
	addHandler(LRDBtn, "click", postOrderTraverse);
	addHandler(stopBtn, "click", stopTraverse);
}

addLoadEvent(addListener);