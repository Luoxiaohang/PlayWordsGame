var click;
var result;
var totalNum = 0;
var rightNum = 0;
var total;
var right;
var effect;

var nodes = [];
var createNodeInterval;
var keys = [];

window.onload = function() {
	click = document.getElementById("click");
	result = document.getElementById("result");
	total = document.getElementById("total");
	right = document.getElementById("right");
	effect = document.getElementById("effect");
};

for (var i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
	keys.push(String.fromCharCode(i));
}

function beginGame() {
	createNodeInterval = setInterval(createNewNode, 1000);
	result.style.display = "none";
}

function createNewNode() {
	var node = document.getElementById("word");
	var newNode = node.cloneNode(true);
	document.body.appendChild(newNode);
	var i = Math.floor(Math.random() * 26);
	newNode.innerHTML = keys[i];
	newNode.style.left = screen.width * Math.random() + "px";
	newNode.style.display = "";
	move(newNode);
	newNode.value = keys[i];
	nodes.push(newNode);
	totalNum++;
}

function stopGame() {
	clearInterval(createNodeInterval);
	total.innerHTML = totalNum;
	right.innerHTML = rightNum;
	result.style.display = "";
}

function restartGame() {

}

function move(node) {
	function moveNext() {
		var newTop = parseInt(node.style.top) + 30;
		if (newTop > 500) {
			stopNode(node.value);
		} else {
			node.style.top = newTop + "px";
		}
	}
	var interval = setInterval(moveNext, 500);
	node.interval = interval;

}

function checkInputKey() {
	var codeAsc = arguments[0].which;
	// code = arguments[0].keyCode; ‘⁄À—∫¸‰Ø¿¿∆˜≤ª  ”√
	var code = String.fromCharCode(codeAsc);
	click.innerHTML = click.innerText + code;
	effect.style.display = "";
	effect.innerHTML = code;
	stopNode(code, true);
}

function onKeyUp() {
	effect.style.display = "none";
}

if (document.attachEvent) {
	document.attachEvent("onkeypress", checkInputKey);
	document.attachEvent("onkeypress", checkInputKey);
	document.attachEvent("onkeyup", onKeyUp);
} else {
	document.addEventListener("keypress", checkInputKey, false)
	document.addEventListener("keyup", onKeyUp, false)
}

function stopNode() {
	var lastNodes = [];
	for (var int = 0; int < nodes.length; int++) {
		if (nodes[int].value == arguments[0]) {
			if (arguments[1]) {
				rightNum++;
			}
			nodes[int].parentNode.removeChild(nodes[int]);
			clearInterval(nodes[int].interval);
			delete nodes[int].interval;
		} else {
			lastNodes.push(nodes[int]);
		}

	}
	nodes = lastNodes;
}