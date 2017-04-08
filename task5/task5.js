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

function create() {
	var ul = document.querySelector("ul");
	for(var i=0; i<60; i++) {
		var newLi = document.createElement("li");
		newLi.style.height = Math.floor(Math.random()*(100-10)+10) + "px";
		ul.appendChild(newLi);
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
	var ul = document.querySelector("ul");
	if(typeof textNum === "number") {		
		if(ul.childNodes.length > 60) {
			alert("The length of the ul cannot be more than 60");
			return;
		} else {
			var newLi = document.createElement("li");
			newLi.style.height = textNum+"px";
			ul.insertBefore(newLi,ul.firstElementChild);
		}
	}			
}

function rightIn() {
	var textNum = handleInput();
	var ul = document.querySelector("ul");
	if(typeof textNum === "number") {		
		if(ul.childNodes.length > 60) {
			alert("The length of the ul cannot be more than 60");
			return;
		} else {
			var newLi = document.createElement("li");
			newLi.style.height = textNum+"px";
			ul.appendChild(newLi);
		}
	}				
}


function leftOut() {
	var input = document.querySelector("input"),
		ul = document.querySelector("ul"),
		lis = ul.children;
	if(lis[0]) {
		input.value = parseInt(lis[0].style.height);
        ul.removeChild(lis[0]);
        alert("删除的元素为：" + input.value);
    } else {
        alert("队列中没有元素，无法删除");
    }
    input.focus();
}

function rightOut() {
	var input = document.querySelector("input"),
		ul = document.querySelector("ul");
		lis = ul.children;
	if(lis[0]) {
		var lastChild = ul.lastElementChild;
		input.value = parseInt(lastChild.style.height);
        ul.removeChild(lastChild);
        alert("删除的元素为：" + input.value);
    } else {
        alert("队列中没有元素，无法删除");
    }
    input.focus();
}

function deleteEle(event) {
	var ul = document.querySelector("ul");
	if(event.target.nodeName.toLowerCase() === "li") {
		ul.removeChild(event.target);
	}

	//如果是在每个li上添加listener则可以通过下面的语句删除
	// this.parentNode.removeChild(this);  
}


function bubbleSort() {
	var numbers = document.querySelector("ul").children;
	var len = numbers.length;
	if(len<2) return;
	var arr = [];
	for(var k=0; k<len; k++) {
		arr.push(parseInt(numbers[k].style.height.slice(0, -2)));
	}
	for(var j=0; j<len; j++) {
		if(arr[j] > arr[j+1]) {
			var tmp = arr[j];
			arr[j] = arr[j+1];
			arr[j+1] = tmp;
		}
	}
	for(k=0; k<len; k++) {
		numbers[k].style.height = arr[k]+"px";
	}
}

function pai() {
	var resetBtn = document.getElementById("reset"),
		ul = document.querySelector("ul"),
		lis = ul.children;
		tmpLis = ul.innerHTML,
		i = 0, j = 0, timer;
	addHandler(resetBtn, "click", function(){
		clearInterval(timer);
		ul.innerHTML = tmpLis;
		allowBtn();
	});
	preventBtn();
	var timer = setInterval(function() {
		if(i < lis.length) {
			if(j < lis.length-i-1) {

				//为了让相比较的两个都改变颜色
				if (j < lis.length - i - 2) {
                    lis[j].className = "";
                    lis[j + 2].className = "current";
                }

				if(lis[j].offsetHeight > lis[j+1].offsetHeight) {
					var temp = lis[j].style.height;
                    lis[j].style.height = lis[j + 1].style.height;
                    lis[j + 1].style.height = temp;
				}
				j++;
			} else {
				//由于相邻两个都改变了颜色，因此需要重置
				if(j - 1 > 0) {
                   lis[j - 1].className = "";
                }

				i++;
				j = 0;
				lis[lis.length - i].className = "finish";
			}
		} else {
			clearInterval(timer);
			allowBtn();
		}
	}, "100");
}

function preventBtn() {
	var ul = document.querySelector("ul"),
		buttons = document.querySelectorAll("button"),
		leftInBtn = buttons[0],
		rightInBtn = buttons[1],
		leftOutBtn = buttons[2],
		rightOutBtn = buttons[3],
		createBtn = buttons[4],
		sortBtn = buttons[5];

	leftInBtn.disabled = "disabled";
	rightInBtn.disabled = "disabled";
	leftOutBtn.disabled = "disabled";
	rightOutBtn.disabled = "disabled";
	createBtn.disabled = "disabled";
	sortBtn.disabled = "disabled";
}

function allowBtn() {
	var ul = document.querySelector("ul"),
		buttons = document.querySelectorAll("button"),
		leftInBtn = buttons[0],
		rightInBtn = buttons[1],
		leftOutBtn = buttons[2],
		rightOutBtn = buttons[3],
		createBtn = buttons[4],
		sortBtn = buttons[5];

	leftInBtn.disabled = "";
	rightInBtn.disabled = "";
	leftOutBtn.disabled = "";
	rightOutBtn.disabled = "";
	createBtn.disabled = "";
	sortBtn.disabled = "";
}

function addListener() {
	var ul = document.querySelector("ul"),
		buttons = document.querySelectorAll("button"),
		leftInBtn = buttons[0],
		rightInBtn = buttons[1],
		leftOutBtn = buttons[2],
		rightOutBtn = buttons[3],
		createBtn = buttons[4],
		sortBtn = buttons[5];

	addHandler(ul, "click", deleteEle);
	addHandler(leftInBtn, "click", leftIn);
	addHandler(rightInBtn, "click", rightIn);
	addHandler(leftOutBtn, "click", leftOut);
	addHandler(rightOutBtn, "click", rightOut);
	addHandler(createBtn, "click", create);
	addHandler(sortBtn, "click", pai);
}

function addHandler(element,type,handler) {
    if(element.addEventListener){
        element.addEventListener(type,handler);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type] = handler;
    }
}

addLoadEvent(addListener);
