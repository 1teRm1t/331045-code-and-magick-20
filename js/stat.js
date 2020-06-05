'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_X = 40;
var GAP_Y = 90;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_GAP = 50;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var renderHistogram = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var playerColor = function (ctx, players) {
  ctx.fillStyle = 'hsl(240,' + Math.floor(Math.random() * 100) + '%, 50%)';
  if (players === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 4 * GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var columnHeight = COLUMN_HEIGHT * times[i] / maxTime;

    renderText(ctx, players[i], CLOUD_X + GAP_X + ((COLUMN_WIDTH + COLUMN_GAP) * i), CLOUD_Y + COLUMN_HEIGHT + GAP_Y);
    renderText(ctx, Math.round(times[i]), CLOUD_X + GAP_X + ((COLUMN_WIDTH + COLUMN_GAP) * i), (GAP_Y + (COLUMN_HEIGHT - columnHeight)) - 2 * GAP);

    playerColor(ctx, players[i]);
    renderHistogram(ctx, CLOUD_X + GAP_X + ((COLUMN_WIDTH + COLUMN_GAP) * i), GAP_Y + (COLUMN_HEIGHT - columnHeight), COLUMN_WIDTH, columnHeight);
  }
};
