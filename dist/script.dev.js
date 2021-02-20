"use strict";

//You can edit ALL of the code here
// Level 100
// Minimal features#
// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
//     the episode 's name
// the season number
// the episode number
// the episode 's medium-sized image
// the episode 's summary text
// You should combine season number and episode number into an episode code:
//     Each part should be zero - padded to two digits.
// Example: S02E07 would be the code
// for the 7 th episode of the 2 nd season.S2E7 would be incorrect.
// Your page should state somewhere that the data has(originally) come from TVMaze.com, and link back to that site(or the specific episode on that site).See tvmaze.com / api# licensing.
function setup() {
  var allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  var rootElem = document.getElementById("root");
  var header = document.createElement('div');
  header.id = 'div-header';
  var span = document.createElement('span');
  span.textContent = "Got ".concat(episodeList.length, " episode(s)"); // rootElem.appendChild(span);
  // span.style.marginBottom = "20px";
  // span.style.marginTop = "2em";

  var inputText = document.createElement('text'); // inputText.type = "text";
  // inputText.textContent = "heloo";
  // rootElem.appendChild(inputText);
  // header.appendChild(inputText);
  // header.appendChild(span);
  // body.appendChild(header);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = episodeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      var p = document.createElement('p');
      var div = document.createElement('div');
      div.classList.add("div-block");
      var img = document.createElement('img');
      img.src = i.image.medium;
      var summary;
      var h3 = document.createElement('h3');
      h3.textContent = "".concat(i.name, " -  S0").concat(i.season, "E0").concat(i.number);
      img.textContent = "".concat(i.image.medium); //summary = (summary).replace('<P>', ' ');

      p.textContent = "".concat(i.summary); // append Element

      rootElem.appendChild(div);
      div.appendChild(h3);
      div.appendChild(img);
      div.appendChild(p); //console.log("helooo");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function liveSearchFunction() {
  var input, filter, div, p, i, txtValue, h3, span, e;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  var rootElem = document.getElementById("root");
  div = rootElem.getElementsByTagName("div");

  for (i = 0; i < div.length; i++) {
    e = 0;
    p = div[i].getElementsByTagName("p")[0];
    h3 = div[i].getElementsByTagName("h3")[0];
    txtValue = (h3.textContent || h3.innerText) + (p.textContent || p.innerText);

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}

window.onload = setup;