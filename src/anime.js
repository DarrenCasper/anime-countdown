// Get anime details first (experimental phase)

import { hideAnime1Content, showAnime1Content } from './anime1.js';

const animeInputName = document.querySelector(`.animeInputName`);
const searchBar = document.querySelector(`.search-bar`);
const animeSearch = document.querySelector(`.anime-search`);

searchBar.addEventListener(`keydown` , async event =>{
    if(event.key === `Enter`){
        const animeName = animeInputName.value.trim();
        if(animeName){
            try{
                hideAnime1Content();
                const animeInfo = await getAnimeName(animeName);
                displayAnimeInfo(animeInfo , animeName);
            }
            catch(error){
                console.error(error);
            }
        }
    }
});

async function getAnimeName(animeName){
    try{
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`);
        const animeData = await response.json();
        return animeData.data;
    }
    catch(error){
        console.error(error);
    }
}

function displayAnimeInfo(animeList , animeName) {
    const animeSearchContainer = document.querySelector(`.anime-search`);
    const animeContainer = document.querySelector('.all-anime-info');
    animeContainer.innerHTML = ''; 
    animeSearchContainer.innerHTML = ``;

    animeSearchContainer.innerHTML = `
        <p class="all-anime-header">"${animeName}" Search</p>
        <p class="all-anime-number"> We found ${animeList.length} Anime Containing "${animeName}" query sorted by relevance: </p>
    `;
    
    animeList.forEach(anime => {
        const { title, synopsis, images, episodes, score } = anime;
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card');
        animeDiv.innerHTML = `
            <img src="${images.jpg.image_url}" alt="${title}" class="anime-image">
            <h3 class="anime-title">${title}</h3>
            <p class="anime-synopsis">${synopsis || 'No synopsis available.'}</p>
            <p class="anime-episodes">Episodes: ${episodes || 'N/A'}</p>
            <p class="anime-score">Score: ${score || 'N/A'}</p>
        `;
        animeContainer.appendChild(animeDiv);
    });
}

animeInputName.addEventListener(`input`, () => {
    const animeCard = document.querySelectorAll(`.anime-card`);
    const animeSearchContainer = document.querySelector(`.anime-search`);
    const animeContainer = document.querySelector('.all-anime-info');
    if(animeInputName.value.trim() === ``){
        animeCard.forEach(card => card.classList.add(`hidden`));
        animeSearchContainer.innerHTML = ``;
        animeContainer.innerHTML = ``;
        showAnime1Content();
    }
    else{
        animeCard.forEach(card => card.classList.remove(`hidden`));
        hideAnime1Content();
    }
});