// // Global variable declaration
// let allEpisodes;

// function setup() {
//     allEpisodes = getAllEpisodes();
//     makePageForEpisodes(allEpisodes);
//     createEpisodeSelect(allEpisodes);
// }

// //=================================================================>

// // Function display all shows and episodes
// function makePageForEpisodes(episodeList) {
//     const rootElem = document.getElementById("root");
//     rootElem.innerHTML = "";
//     const header = document.getElementById('div-header');
//     let span = document.createElement('span');
//     header.appendChild(span);
//     let inputText = document.createElement('text');
//     for (let episode of episodeList) {
//         var p = document.createElement('p');
//         var div = document.createElement('div');
//         div.classList.add("div-block")
//         var img = document.createElement('img');
//         img.src = episode.image.medium;
//         var summary;
//         var h3 = document.createElement('h3');
//         h3.textContent = `${episode.name} -  S0${episode.season}E0${episode.number}`;
//         img.textContent = `${episode.image.medium}`;
//         p.textContent = `${(episode.summary).replace( /(<([^>]+)>)/ig, '')}`;
//         // append Element
//         rootElem.appendChild(div);
//         div.appendChild(h3);
//         div.appendChild(img);
//         div.appendChild(p);
//     }
// }
// //==============================================================>
// // Function to create episode dropdown list 

// function createEpisodeSelect(episodeList) {
//     const rootElem = document.getElementById("root");
//     const header = document.getElementById('div-header');
//     let span = document.createElement('span');
//     header.appendChild(span);
//     let select = document.createElement('select');
//     header.appendChild(select);
//     select.add(new Option('Show All Episodes', '0'));
//     let inputText = document.createElement('text');
//     for (let episode of episodeList) {
//         select.add(new Option(episode.name, episode.name));
//         select.addEventListener('change', function(event) {
//             if (event.target.value === '0') {
//                 makePageForEpisodes(allEpisodes);
//                 // console.log(episodeList);
//             } else {
//                 const newList = allEpisodes.filter((episode) => {
//                     return episode.name === event.target.value;
//                 });
//                 makePageForEpisodes(newList);
//             }
//         });
//     }
// }

// //==================================================================>

// // Function to search shows and episodes
// function liveSearchFunction() {
//     let input, filter, div, p, i, txtValue, h3;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     const inputText = document.getElementById("myInput");
//     const rootElem = document.getElementById("root");
//     div = rootElem.getElementsByTagName("div");
//     filter = inputText.value.toUpperCase();
//     div = rootElem.querySelectorAll("div");
//     const header = document.getElementById('div-header');
//     let span = document.createElement('span');
//     header.appendChild(span);
//     for (i = 0; i < div.length; i++) {
//         let span = document.querySelector('#Search-span');
//         for (i = 0; i < div.length; i++) {
//             var myRows = div[i].querySelectorAll('.div-block');
//             p = div[i].getElementsByTagName("p")[0];
//             h3 = div[i].getElementsByTagName("h3")[0];
//             txtValue = (h3.textContent || h3.innerText) + (p.textContent || p.innerText);;
//             txtValue = (h3.textContent || h3.innerText) + (p.textContent || p.innerText);
//             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//                 div[i].style.display = "";
//                 div[i].style.display = "block";
//             } else {
//                 div[i].style.display = "none";
//             }
//         }
//         let list = Array.from(div);
//         const newList = list.filter((item) => item.style.display === "block");
//         span.innerText = `Displaying ${newList.length}/${i} episodes`;
//     }
// }
// window.onload = setup;



//TV SHOW WITH API



let allEpisodes;
let allShows;
let showIds;

function setup() {
    allEpisodes = getAPIEpisodes();
    allShows = getAllShows();
    showIds = getAllShows();
    getShowIds(showIds);
    makePageForEpisodes(allEpisodes);
    createEpisodeSelect(allEpisodes);
}
// This function should retrieve the JSON from the TVMaze API, using fetch.

function getAPIEpisodes() {

    fetch('https://api.tvmaze.com/shows')
        .then(function(response) {
            return response.json();
            console.log(response);
        })
        .then(episodes => {
            makePageForEpisodes(episodes);
            allEpisodes = episodes;
            return episodes;
            console.log(episodes.length);
        })
        .then(createEpisodeSelect)

    .catch(function(err) {
        console.log(err);
    });

}
//// Function to get shows by show Id

function getShowIds(getShowId) {
    const rootElem = document.getElementById("root");
    const header = document.getElementById('div-header');
    let span = document.createElement('span');
    header.appendChild(span);
    let selectShow = document.createElement('select');
    selectShow.id = "showId";
    header.appendChild(selectShow);
    selectShow.add(new Option('Show All Shows', '0'));

    let inputText = document.createElement('text');

    ////// show order 
    getShowId.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            } else if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        })
        //////////////////
    getShowId.forEach((show) => {
        console.log(`${show.id}`);

        selectShow.add(new Option(show.name, show.name));

        selectShow.addEventListener('change', function(event) {

            if (show.name === event.target.value) {
                fetch('https://api.tvmaze.com/shows/' + show.id + '/episodes')
                    .then(function(response) {
                        return response.json();

                    })
                    .then(episodes => {
                        makePageForEpisodes(episodes);
                        allEpisodes = episodes;
                        return episodes;

                    })
                    .then(createEpisodeSelect)
                    .catch(function(err) {
                        console.log(err);

                    });
            }

        })
    })
}
//==================================================>
///  Function get allShows
function createShowSelect(showList) {
    const rootElem = document.getElementById("root");
    const header = document.getElementById('div-header');
    let span = document.createElement('span');
    header.appendChild(span);
    let selectShow = document.createElement('select');
    selectShow.id = "showId";
    header.appendChild(selectShow);
    selectShow.add(new Option('Show All Shows', '0'));
    let inputText = document.createElement('text');
    console.log(showList.length);

    showList.forEach((show) => {

        selectShow.add(new Option(show.name, show.name));
    });
}

/////  Function display all episodes
function makePageForEpisodes(episodes) {
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = "";
    const header = document.getElementById('div-header');
    let span = document.createElement('span');
    header.appendChild(span);
    let inputText = document.createElement('text');
    episodes.forEach((episode) => {
        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        div.classList.add("div-block")
        var img = document.createElement('img');
        img.src = episode.image.medium;
        h3.textContent = `${episode.name} -  S0${episode.season}E0${episode.number}`;
        img.textContent = `${episode.image.medium}`;
        p.textContent = `${(episode.summary).replace( /(<([^>]+)>)/ig, '')}`;
        rootElem.appendChild(div);
        div.appendChild(h3);
        div.appendChild(img);
        div.appendChild(p);
    });

}

// Function to create episode dropdown list 

function createEpisodeSelect(episodeList) {
    const rootElem = document.getElementById("root");
    const header = document.getElementById('div-header');
    let span = document.createElement('span');
    header.appendChild(span);
    let select = document.createElement('select');
    header.appendChild(select);
    select.add(new Option('Show All Episodes', '0'));
    let inputText = document.createElement('text');

    episodeList.forEach((episode) => {
        select.add(new Option(episode.name, `${episode.name}`));
        select.addEventListener('change', function(event) {
            if (event.target.value === '0') {
                makePageForEpisodes(allEpisodes);

            } else {
                const newList = allEpisodes.filter((episode) => {
                    return episode.name === event.target.value;
                });
                makePageForEpisodes(newList);
            }
        });
    });
}


// Function to search shows and episodes
function liveSearchFunction() {
    let input, filter, div, p, i, txtValue, h3;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    const inputText = document.getElementById("myInput");
    const rootElem = document.getElementById("root");
    div = rootElem.getElementsByTagName("div");
    filter = inputText.value.toUpperCase();
    div = rootElem.querySelectorAll("div");
    const header = document.getElementById('div-header');
    let span = document.createElement('span');
    header.appendChild(span);
    for (i = 0; i < div.length; i++) {
        let span = document.querySelector('#Search-span');
        for (i = 0; i < div.length; i++) {
            var myRows = div[i].querySelectorAll('.div-block');
            p = div[i].getElementsByTagName("p")[0];
            h3 = div[i].getElementsByTagName("h3")[0];
            txtValue = (h3.textContent || h3.innerText) + (p.textContent || p.innerText);;
            txtValue = (h3.textContent || h3.innerText) + (p.textContent || p.innerText);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                div[i].style.display = "";
                div[i].style.display = "block";
            } else {
                div[i].style.display = "none";
            }
        }
        let list = Array.from(div);
        const newList = list.filter((item) => item.style.display === "block");
        span.innerText = `Displaying${newList.length}/${i} episodes`;
    }
}

window.onload = setup;