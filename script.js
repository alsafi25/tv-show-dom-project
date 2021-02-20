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
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
    // EpisodeSelector(allEpisodes)
}

function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    const header = document.getElementById('div-header');
    let span = document.createElement('span');

    header.appendChild(span);
    let select = document.createElement('select');
    header.appendChild(select);

    span.textContent = `Got ${episodeList.length} episode(s)`;
    let inputText = document.createElement('text');
    for (let i of episodeList) {
        var p = document.createElement('p');
        var div = document.createElement('div');
        div.classList.add("div-block")
        var img = document.createElement('img');
        img.src = i.image.medium;
        var summary;
        var h3 = document.createElement('h3');
        h3.textContent = `${i.name} -  S0${i.season}E0${i.number}`;
        img.textContent = `${i.image.medium}`;
        p.textContent = `${i.summary}`;
        select.add(new Option(h3.textContent));


        // append Element
        rootElem.appendChild(div);
        div.appendChild(h3);
        div.appendChild(img);
        div.appendChild(p);




        select.addEventListener('change', GetSelectedText);

        function GetSelectedText() {

            select.options[select.selectedIndex].text = h3.textContent;
        }






    }

}



function liveSearchFunction() {
    let input, filter, div, p, i, txtValue, h3;
    input = document.getElementById("myInput");

    filter = input.value.toUpperCase();
    const rootElem = document.getElementById("root");
    div = rootElem.getElementsByTagName("div");
    const header = document.getElementById('div-header');
    let span = document.createElement('span');
    // span.textContent = `Got ${e.length} episode(s)`;
    header.appendChild(span);
    // let select = document.createElement('select');
    // header.appendChild(select);
    for (i = 0; i < div.length; i++) {

        p = div[i].getElementsByTagName("p")[0];
        h3 = div[i].getElementsByTagName("h3")[0];

        txtValue = (h3.textContent || h3.innerText) + (p.textContent || p.innerText);;
        // span.textContent = `Got ${e} episode(s)`;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            div[i].style.display = "";

        } else {
            div[i].style.display = "none";
        }

    }

}



window.onload = setup;