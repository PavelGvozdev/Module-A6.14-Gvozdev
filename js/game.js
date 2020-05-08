const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let divSelector;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый +
  
  if ($(divSelector).hasClass('target')) {
    $(divSelector).removeClass('target');
  }

  divSelector = randomDivId();
  
  // TODO: помечать target текущим номером +
  $(divSelector).addClass('target').text(hits + 1);

  // FIXME: тут надо определять при первом клике firstHitTime+
  if (hits === 0) {
  firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала +
  $('.game-field').css('display', 'none');

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? +
  $(divSelector).text('');

  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке +
  $('#button-start').click(round);
  //round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
