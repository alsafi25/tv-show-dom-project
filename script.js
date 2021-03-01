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
}
// Function display all shows and episodes
function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    const header = document.getElementById('div-header');
    let span = document.createElement('span');
    header.appendChild(span);
    let select = document.createElement('select');
    header.appendChild(select);
    select.add(new Option('Show All', '0'));
    // span.textContent = `Got ${episodeList.length} episode(s)`;
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
        p.textContent = `${(i.summary).replace( /(<([^>]+)>)/ig, '')}`;
        select.add(new Option(h3.textContent));
        // append Element
        rootElem.appendChild(div);
        div.appendChild(h3);
        div.appendChild(img);
        div.appendChild(p);
    }
    select.addEventListener('change', function() {
        let input, div, p, i, txtValue, h3;
        h3 = document.getElementsByTagName('h3');
        const opt = document.getElementsByTagName('option');
        const selectedValue = select.options[select.selectedIndex].text;
        const value = this.selectedIndex;
        const rootElem = document.getElementById("root");
        div = rootElem.querySelectorAll("div");
        let list = Array.from(div);

        const newList = list.filter((item) => {
                return item.style.display === "";
            })
            //  ONLY show the selected episode.  
        newList.forEach(function(episode, index) {
            const currentTitle = episode.children[0]
            if (currentTitle.innerText !== selectedValue) {
                episode.style.display = 'none';
            } else if (currentTitle.index === value) {
                // episode.style.display = "block";
                makePageForEpisodes();
            }
        });
    });

    /// selected option  lost focus
}



// Function to search shows and episodes
function liveSearchFunction() {
    let input, div, p, i, txtValue, h3;
    const inputText = document.getElementById("myInput");
    const rootElem = document.getElementById("root");
    const filter = inputText.value.toUpperCase();
    div = rootElem.querySelectorAll("div");
    const header = document.getElementById('div-header');
    let span = document.querySelector('#Search-span')


    for (i = 0; i < div.length; i++) {
        var myRows = div[i].querySelectorAll('.div-block');
        p = div[i].getElementsByTagName("p")[0];
        h3 = div[i].getElementsByTagName("h3")[0];
        txtValue = (h3.textContent || h3.innerText) + (p.textContent || p.innerText);
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            div[i].style.display = "block";
        } else {
            div[i].style.display = "none";
        }
    }
    let list = Array.from(div);
    const newList = list.filter((item) => item.style.display === "block");
    // console.log(newList);
    span.innerText = `Displaying ${newList.length}/${i} episodes`;
}


window.onload = setup;