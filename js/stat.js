'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGTH = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_X = 40;
var GAP_Y = 90;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGTH = 150;
var COLUMN_GAP = 50;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGTH);
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGTH);
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

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';

  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 4 * GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var columnHeigth = COLUMN_HEIGTH * times[i] / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP_X + ((COLUMN_WIDTH + COLUMN_GAP) * i), CLOUD_Y + COLUMN_HEIGTH + GAP_Y);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_X + ((COLUMN_WIDTH + COLUMN_GAP) * i), (GAP_Y + (COLUMN_HEIGTH - columnHeigth)) - 2 * GAP);

    ctx.fillStyle = 'hsl(240,' + Math.floor(Math.random() * 100) + '%, 50%)';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + GAP_X + ((COLUMN_WIDTH + COLUMN_GAP) * i), GAP_Y + (COLUMN_HEIGTH - columnHeigth), COLUMN_WIDTH, columnHeigth);
  }
};
