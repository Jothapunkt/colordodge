var mainColors = ["dodgerBlue","crimson","DarkOrchid"];

var player;
var enemies = [];
var projectiles = [];

var tickInterval = 20;
var tickSpeed = 1000/tickInterval;

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var gameIsOver = false;

var gameIsWon = false;

var score = 0;

var globalTolerance = 20;

var level = Number(localStorage.getItem("currentLevel"));
if (level == 0) {
	level = 1;
}