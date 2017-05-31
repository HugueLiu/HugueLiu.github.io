var restart = document.getElementById("restart");
var bigbox = document.getElementById("bigbox");
var smallbox = document.getElementById("smallbox");

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

var me = true;
var over = false;
var chessBoard = [];
// 赢法数组：所有可能的赢法，三维数组
// 前两维代表棋盘，第三位代表第几种赢法
var wins = [];
// 赢法统计
var myWin = [];
var comWin = [];
// 赢法计数器
var count = 0;

var N = 15; 
var width = 450;
var height = 450;

var mySumScore = 0;
var comSumScore = 0;
// 初始化
start();

restart.onclick = start;
function start() {
	// console.log("start");
	me = true;
	over = false;
	context.fillStyle = "#fff";
	context.fillRect(0,0,width,height);

	// 储存每个位置的棋子
	for(var i = 0; i < N; i++){
		chessBoard[i] = [];
		for (var j = 0; j < N; j++) {
			chessBoard[i][j] = 0;
		}
	}

	for (var i = 0; i < N; i++) {
		wins[i] = [];
		for (var j = 0; j < N; j++) {
			wins[i][j] = [];
		}
	}
	count = 0;
	// 竖线
	for (var i = 0; i < N; i++) {
		for(var j = 0; j < N-4; j++){
			for(var k = 0; k < 5; k++){
				wins[i][j+k][count] = true;
				// // console.log(i + ":" + (j+k) + ":" + count);
			}
			count++;
		}
	}
	// 横线
	for (var i = 0; i < N-4; i++) {
		for(var j = 0; j < N; j++){
			for(var k = 0; k < 5; k++){
				wins[i+k][j][count] = true;
				// // console.log((i+k) + ":" + j + ":" + count);
			}
			count++;
		}
	}
	// 斜线
	for (var i = 0; i < N-4; i++) {
		for(var j = 0; j < N-4; j++){
			for(var k = 0; k < 5; k++){
				wins[i+k][j+k][count] = true;
				// // console.log((i+k) + ":" + (j+k) + ":" + count);
			}
			count++;
		}
	}
	// 反斜线
	for (var i = 0; i < N-4; i++) {
		for(var j = 14; j > 3; j--){
			for(var k = 0; k < 5; k++){
				wins[i+k][j-k][count] = true;
				// // console.log((i+k) + ":" + (j-k) + ":" + count);
			}
			count++;
		}
	}

	for (var i = 0; i < count; i++) {
		myWin[i] = 0;
		comWin[i] = 0;
	}
	drawChessBoard();
};
// 大棋盘
bigbox.onclick = function() {
	// console.log("bigbox");
	N = 20;
	width = 600;
	height = 600;
	chess.setAttribute("width",width + 'px');
	chess.setAttribute("height",height + 'px');
	start();	
};
// 小棋盘
smallbox.onclick = function() {
	// console.log("smallbox");
	N = 15;
	width = 450;
	height = 450;
	chess.setAttribute("width",width + 'px');
	chess.setAttribute("height",height + 'px');
	start();	
};
// 画棋盘
function drawChessBoard(){
	context.strokeStyle = "#BFBFBF";
	context.beginPath();
	context.closePath();
	for(var i = 0; i < N; i++){
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30,width-15);
		context.stroke();
		context.moveTo(15, 15 + i * 30);
		context.lineTo(height-15, 15 + i * 30);
		context.stroke();
	}
}

// 落子函数
function oneStep(i,j,me){
	// console.log("oneStep");	
	var x = 15 + 30 * i;
	var y = 15 + 30 * j;
	context.beginPath();
	context.arc(x,y,13,0,2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(x+2,y-2,13,x+2,y-2,0);
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill();

	return true;
}
// 点击落子
chess.onclick = function(e) {
	// console.log("chess");

	if(!me)return;
	var x = e.offsetX;	
	var y = e.offsetY;	
	i = Math.floor(x / 30);
	j = Math.floor(y / 30);
	if(chessBoard[i][j] == 0 && (!over)){
		oneStep(i,j,me);
		chessBoard[i][j] = 1;
		for(var k = 0; k < count; k++){
			if(wins[i][j][k]){
				myWin[k]++;
				comWin[k] = 6;
				if(myWin[k] == 5){
					over = true;
					alert("you win!");
				}
			}
		}
		if(!over){
			me = false;
			comAI();
		}
	}
};

function comAI(){
	// console.log("comAI");
	var mySorce = [];
	var comSorce = [];
	var max = 0;
	var u = 0, v = 0;

	for (var i = 0; i < N; i++) {
		mySorce[i] = [];
		comSorce[i] = [];
		for (var j = 0; j < N; j++) {
			mySorce[i][j] = 0;
			comSorce[i][j] = 0;
		}
	}
	for(var i = 0; i < N; i++){
		for(var j = 0; j < N; j++){
			if(chessBoard[i][j] == 0){
				for(k = 0; k < count; k++){
					if(wins[i][j][k]){
						if(myWin[k] == 0){
							mySorce[i][j] += 50;
						}else if(myWin[k] == 1){
							mySorce[i][j] += 200;
						}else if(myWin[k] == 2){
							mySorce[i][j] += 400;
						}else if(myWin[k] == 3){
							mySorce[i][j] += 2000;
						}else if(myWin[k] == 4){
							mySorce[i][j] += 10000;
						}
						if(comWin[k] == 0){
							comSorce[i][j] += 60;
						}else if(comWin[k] == 1){
							comSorce[i][j] += 220;
							console.log(comSorce[i][j]);
						}else if(comWin[k] == 2){
							comSorce[i][j] += 420;
							console.log(comSorce[i][j]);
						}else if(comWin[k] == 3){
							comSorce[i][j] += 2200;
							console.log(comSorce[i][j]);
						}else if(comWin[k] == 4){
							comSorce[i][j] += 20000;
							console.log(comSorce[i][j]);
						}
					}
				}
			}
		}
	}
	for(var i = 0; i < N; i++){
		for(var j = 0; j < N; j++){
			if(chessBoard[i][j]==0){
				// // console.log(mySorce[i][j]);
				if(mySorce[i][j] > max){
					max = mySorce[i][j];
					u = i;
					v = j;
				}else if(mySorce[i][j] == max){
					if(comSorce[i][j] > comSorce[u][v]){
						u = i;
						v = j;
					}
				}
				if(comSorce[i][j] > max){
					max = comSorce[i][j];
					u = i;
					v = j;
				}else if(comSorce[i][j] == max){
					if(mySorce[i][j] > mySorce[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}
	one
	for(var i = 0; i < N; i++){
		for(var j = 0; j < N; j++){
			mySumScore += mySorce[i][j];
			comSumScore += comSorce[i][j];
		}
	}
	console.log("mySorce:" + mySumScore);
	console.log("comSorce:" + comSumScore);
	console.log("计算机胜率为："+Math.floor(comSumScore/
		(mySumScore+comSumScore)*100) + "%");Step(u,v,false);

	// console.log(u+":"+v);
	me = true
	chessBoard[u][v] = 2;
	for(var k = 0; k < count; k++){
		if(wins[u][v][k]){
			comWin[k]++;
			myWin[k] = 6;
			if(comWin[k] == 5){
				over = true;
				alert("computer win!");
			}
		}
	}
}
