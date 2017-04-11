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

function searchInput() {
	var root = document.querySelector("#one"),
		inputText = document.querySelector("input").value,
		arr = [];

	console.log(inputText);
	preventBtn();

	(function recurse(node) {
		var children = node.children,
			i;
		
		for(i=0; i<children.length; i++) {
			recurse(children[i]);
		}
		arr.push(node);

	})(root);
	matchedDisplay(arr, inputText);
}

function matchedDisplay(arr, text) {
	var len = arr.length,
		count = 0,
		found = false;
	timer = setInterval(function() {
		arr[Math.max(count - 1, 0)].style.backgroundColor = '#fff';
		if(arr[count].innerText === text) {
			found = true;
			arr[count].style.backgroundColor = '#f09';
		} else {
			arr[count].style.backgroundColor = '#09f';
		}
        count++;
        if(count >= arr.length){
            clearInterval(timer);
            allowBtn();
            arr[len - 1].style.backgroundColor = '#fff';
            if(!found) {
            	alert("Dont find the target!");
            }
        }
	}, 1000);
}

function preventBtn() {
	var LRDBtn = document.querySelector("button");

	LRDBtn.disabled = "disabled";
}

function allowBtn() {
	var LRDBtn = document.querySelector("button");

	LRDBtn.disabled = "";
}

function selectNode(event) {
	if(event.target.nodeName.toLowerCase() === "div") {		
		event.target.className += " selected";
		// event.target.parentNode.removeChild(event.target);
	}
}

function deleteNode(event) {
	var nodes = document.querySelectorAll(".selected");
	for(var i=0; i<nodes.length; i++) {
		nodes[i].parentNode.removeChild(nodes[i]);
	}
}

function addNode(event) {
	var parent = document.querySelector(".selected")
		addText = document.querySelector(".add").value;
	if(parent !== undefined) {
		parent.innerHTML += "<div class='node'>"+addText+"</div>";
		parent.className = "node";
	}
}

function addListener() {
	var btns = document.querySelectorAll("button"),
		LRDBtn = btns[0],
		stopBtn = btns[1],
		searchBtn = btns[2],
		deleteBtn = btns[3],
		addBtn = btns[4]
		tree = document.querySelector("#tree");



	addHandler(LRDBtn, "click", postOrderTraverse);
	addHandler(stopBtn, "click", stopTraverse);
	addHandler(searchBtn, "click", searchInput);
	addHandler(deleteBtn, "click", deleteNode);
	addHandler(addBtn, "click", addNode);
	addHandler(tree, "click", selectNode);
}

addLoadEvent(addListener);